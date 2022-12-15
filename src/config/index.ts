export const API_URL =
  // If app is not in development, use development API instead of localhost
  process.env.REACT_APP_API_MOCKING && process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : (process.env.REACT_APP_API_URL as string);
