import React from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  fetch,
  renderItem,
  rowHeight,
  columnWidth,
  queryKey,
  initialPageParam,
  fetchByName,
  save,
} from "./helpers";
import { Modal } from "../../components/Modal";
import { CocktailDetails } from "../../components/CocktailDetails";
import { CocktailFactory, FormValues } from "../CocktailFactory";
import "./index.css";
import { uniqueId } from "../../utils/UniqueId";
import {
  Toast,
  useActivateToast,
  ActivateToastProps,
} from "../../components/Toast";
import { Input } from "../../components/FormInput";
import * as Cocktail from "../../types/Cocktail";
import { Loading } from "../../components/Loading";

const successToastProps: ActivateToastProps = {
  type: "success",
  message: "New Cocktail created!",
  id: `successToastId-${uniqueId()}`,
};

export const CocktailsGallery = () => {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState<number>(-1);
  const [toastProps, activateToast] = useActivateToast();
  const [filterValue, setFilterValue] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState<
    ReadonlyArray<Cocktail.Cocktail & { readonly onClick: () => void }>
  >([]);

  const queryQlient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetch,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam,
    });

  const onSelectItem = React.useCallback(
    (index: number) => () => {
      setSelectedItemIndex(index);
    },
    []
  );

  const mapItem = React.useCallback(
    (item: Cocktail.Cocktail, i: number) => ({
      ...item,
      onClick: onSelectItem(i),
    }),
    []
  );

  const items = React.useMemo(
    () => (data ? data.pages.flatMap(({ items }) => items).map(mapItem) : []),
    [data]
  );

  const itemsToDisplay = React.useMemo(
    () => (filterValue === "" ? items : filteredItems),
    [items, filteredItems]
  );

  const isItemLoaded = React.useCallback(
    (index: number) => !hasNextPage || index < itemsToDisplay.length,
    [hasNextPage, itemsToDisplay]
  );

  const loadMoreItems = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage, hasNextPage]);

  const submitHandler = React.useCallback(
    ({ image, ...newItem }: FormValues) => {
      save(queryQlient)({
        ...newItem,
        image: "",
        id: uniqueId(),
      });
      activateToast(successToastProps);
    },
    []
  );

  const onCloseModal = React.useCallback(() => setSelectedItemIndex(-1), []);

  const onChangeFilter = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(e.target.value);
      if (e.target.value !== "") {
        fetchByName(e.target.value.toLowerCase())
          .then((data) => data.map(mapItem))
          .then(setFilteredItems);
      } else {
        setFilteredItems([]);
      }
    },
    []
  );

  return (
    <div className="cocktail-gallery-container">
      <Modal isOpen={selectedItemIndex >= 0} onClose={onCloseModal}>
        <CocktailDetails {...itemsToDisplay[selectedItemIndex]} />
      </Modal>
      <div className="cocktails-grid">
        <Input value={filterValue} name="search" onChange={onChangeFilter} />
        {isLoading && <Loading />}
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={
            hasNextPage ? itemsToDisplay.length + 1 : itemsToDisplay.length
          }
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <AutoSizer>
              {({
                width,
                height,
              }: {
                readonly width: number;
                readonly height: number;
              }) => {
                const columnCount = Math.floor(width / columnWidth);
                const rowCount = Math.ceil(itemsToDisplay.length / columnCount);

                return (
                  <Grid
                    ref={ref}
                    onItemsRendered={({
                      visibleRowStartIndex,
                      visibleRowStopIndex,
                      overscanRowStopIndex,
                      overscanRowStartIndex,
                      visibleColumnStartIndex,
                      visibleColumnStopIndex,
                      overscanColumnStopIndex,
                      overscanColumnStartIndex,
                    }) =>
                      onItemsRendered({
                        overscanStartIndex:
                          overscanRowStartIndex * columnCount +
                          overscanColumnStartIndex,
                        overscanStopIndex:
                          overscanRowStopIndex * columnCount +
                          overscanColumnStopIndex,
                        visibleStartIndex:
                          visibleRowStartIndex * columnCount +
                          visibleColumnStartIndex,
                        visibleStopIndex:
                          visibleRowStopIndex * columnCount +
                          visibleColumnStopIndex,
                      })
                    }
                    columnCount={columnCount}
                    columnWidth={columnWidth}
                    rowCount={rowCount}
                    rowHeight={rowHeight}
                    width={width}
                    height={height}
                  >
                    {renderItem(columnCount, isItemLoaded, itemsToDisplay)}
                  </Grid>
                );
              }}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
      <CocktailFactory onSubmit={submitHandler} />
      {toastProps?.id === successToastProps.id && (
        <Toast key={toastProps.id} {...toastProps} visible />
      )}
    </div>
  );
};
