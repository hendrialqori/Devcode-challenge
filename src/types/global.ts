export type SuccessRepsonse<T> = {
  total: number;
  limit: number;
  skip: number;
  data: T
}