export const uniqueId = (): string =>
  `id-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
