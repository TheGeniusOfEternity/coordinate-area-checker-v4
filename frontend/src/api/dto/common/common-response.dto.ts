export interface CommonResponseDto<T> {
  status: number;
  data: T;
}