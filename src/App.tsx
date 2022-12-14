import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useDisclosure } from "hooks/useDisclosure";
import { AppProvider } from "providers/app";
import { AppRoutes } from "routes";

function App() {
  const { isOpen, toggle } = useDisclosure(true);

  const ThemeToggleProbs = {
    onClick: toggle,
  };
  const ThemeClassName =
    "w-6 h-6 rounded-full fixed bottom-0 right-0 mr-2 mb-2 text-secondary hover hover:cursor-pointer";

  return (
    <div className={isOpen ? "dark" : ""}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
      {isOpen ? (
        <MoonIcon
          className={clsx(ThemeClassName, "hover:text-slate-500")}
          {...ThemeToggleProbs}
        />
      ) : (
        <SunIcon
          className={clsx(ThemeClassName, "hover:text-yellow-500")}
          {...ThemeToggleProbs}
        />
      )}
    </div>
  );
}

export default App;
