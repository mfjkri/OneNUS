export const API_URL =
  process.env.REACT_APP_API_MOCKING && process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : (process.env.REACT_APP_API_URL as string);
export const JWT_SECRET = "123456" as string;
export const ARTIFICIAL_DELAY = 0 as number;
