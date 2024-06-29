/**
 * Enum for HTTP status codes
 * @readonly
 * @enum {number}
 */
export enum HTTP_STATUS {
  OK = 200,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  FETCH_ERROR = 409,
  EXPIRE_TOKEN = 410,
  LIMIT_REACHED = 429,
  PRECONDITION_REQUIRED = 428,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * Interface for request properties
 * @interface
 * @property {string} method - The HTTP method
 * @property {string} [baseUrl] - The base URL for the request
 * @property {object} [body] - The body of the request
 * @property {boolean} [withFiles] - Whether the request includes files
 * @property {object} [params] - The parameters for the request
 * @property {object} [headers] - The headers for the request
 */
export interface RequestProps {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  baseUrl?: string | null;
  body?: object;
  withFiles?: boolean;
  params?: Record<string, string> | null;
  headers?: Record<string, string> | null;
}