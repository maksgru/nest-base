export interface IExceptionResponse {
  readonly status: number;
  readonly timestamp: string;
  readonly message: string;
  readonly traceId: string;
}
