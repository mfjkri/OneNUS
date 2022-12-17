export const API_URL =
  // If app is not in development, use development API instead of localhost
  process.env.REACT_APP_API_MOCKING && process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : (process.env.REACT_APP_API_URL as string);

export const MAX_POST_TITLE_CHAR = parseInt(
  process.env.REACT_APP_MAX_POST_TITLE_CHAR || "100"
);
export const MAX_POST_TEXT_CHAR = parseInt(
  process.env.REACT_APP_MAX_POST_TEXT_CHAR || "5000"
);
export const POSTS_PER_PAGE = parseInt(
  process.env.REACT_APP_POSTS_PER_PAGE || "10"
);

export const MAX_COMMENT_TEXT_CHAR = parseInt(
  process.env.REACT_APP_MAX_COMMENT_TEXT_CHAR || "1000"
);
export const COMMENTS_PER_PAGE = parseInt(
  process.env.REACT_APP_COMMENTS_PER_PAGE || "10"
);
