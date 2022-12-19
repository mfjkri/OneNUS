import { AppProvider } from "providers/app";
import { AppRoutes } from "routes";

function App() {
  return (
    <div>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </div>
  );
}

export default App;
