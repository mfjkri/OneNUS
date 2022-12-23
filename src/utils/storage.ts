const storagePrefix = "one_nus_";

// Any methods related to localStorage (right now used for JWT Token and theme preference)
const storage = {
  /* -------------------------------- JWT TOKEN ------------------------------- */
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },

  /* ---------------------------- Theme Preference ---------------------------- */
  getDarkMode: () => {
    const cachedThemePreference = JSON.parse(
      window.localStorage.getItem(`${storagePrefix}darkMode`) as string
    );

    if (!cachedThemePreference) {
      storage.setDarkMode(true);
      return true;
    } else {
      return cachedThemePreference === "true";
    }
  },
  setDarkMode: (mode: boolean) => {
    window.localStorage.setItem(
      `${storagePrefix}darkMode`,
      JSON.stringify(mode.toString())
    );
  },
};

export default storage;
