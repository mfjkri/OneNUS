import { useEffect } from "react";
import clsx from "clsx";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDisclosure } from "hooks/useDisclosure";

import { AppProvider } from "providers/app";
import { AppRoutes } from "routes";
import storage from "utils/storage";

function App() {
  const { isOpen: darkMode, toggle } = useDisclosure(storage.getDarkMode());

  useEffect(() => {
    storage.setDarkMode(darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const ThemeToggleProps = {
    onClick: toggle,
  };
  const ThemeClassName =
    "w-6 h-6 rounded-full fixed bottom-0 right-0 mr-2 mb-2 text-secondary hover hover:cursor-pointer hover:opacity-50";

  return (
    <div>
      <AppProvider>
        <AppRoutes />
      </AppProvider>

      {/* Color theme toggling */}
      {darkMode ? (
        <MoonIcon
          aria-hidden="true"
          className={clsx(ThemeClassName, "text-slate-500")}
          {...ThemeToggleProps}
        />
      ) : (
        <SunIcon
          aria-hidden="true"
          className={clsx(ThemeClassName, "text-yellow-500")}
          {...ThemeToggleProps}
        />
      )}
    </div>
  );
}

export default App;
