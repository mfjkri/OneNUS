import { useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import { useDisclosure } from "hooks/useDisclosure";
import storage from "utils/storage";

export const ThemeToggle = () => {
  const { isOpen: darkMode, toggle } = useDisclosure(storage.getDarkMode());

  useEffect(() => {
    storage.setDarkMode(darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      {darkMode ? (
        <MoonIcon
          aria-hidden="true"
          className="w-6 h-6 rounded-full fixed bottom-0 right-0 mr-2 mb-2 hover hover:cursor-pointer hover:opacity-60 text-gray-500"
          onClick={toggle}
        />
      ) : (
        <SunIcon
          aria-hidden="true"
          className="w-6 h-6 rounded-full fixed bottom-0 right-0 mr-2 mb-2 hover hover:cursor-pointer hover:opacity-60 text-yellow-500"
          onClick={toggle}
        />
      )}
    </>
  );
};
