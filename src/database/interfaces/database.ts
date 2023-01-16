export interface DatabaseManager<T> {
  create: (data: T) => Promise<T>;
  deleteById: (id: number | string) => Promise<boolean>;
  getById: (id: number | string) => Promise<T>;
  getAll: () => Promise<T[]>;
}
