import clsx from "clsx";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDisclosure } from "hooks/useDisclosure";

import { AppProvider } from "providers/app";
import { AppRoutes } from "routes";

function App() {
  const { isOpen, toggle } = useDisclosure(true);

  const ThemeToggleProbs = {
    onClick: toggle,
  };
  const ThemeClassName =
    "w-6 h-6 rounded-full fixed bottom-0 right-0 mr-2 mb-2 text-secondary hover hover:cursor-pointer hover:opacity-50";

  return (
    <div className={isOpen ? "dark" : ""}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>

      {/* Color theme toggling */}
      {isOpen ? (
        <MoonIcon
          aria-hidden="true"
          className={clsx(ThemeClassName, "text-slate-500")}
          {...ThemeToggleProbs}
        />
      ) : (
        <SunIcon
          aria-hidden="true"
          className={clsx(ThemeClassName, "text-yellow-500")}
          {...ThemeToggleProbs}
        />
      )}
    </div>
  );
}

export default App;
