import { HelmetProvider } from "react-helmet-async";
import ScrollRestore from "./components/ScrollRestore";
import { Provider } from "react-redux";
import { store } from "./stores/stores";
import ApplicationRouter from "./routes/ApplicatonRouter";
import { AuthProvider } from "./context/AuthContext";
import Toaster from "./components/toast/toast";
import { AddressProvider } from "./context/AddressContext";

function App() {
  return (
    <>
    <AddressProvider>
      <AuthProvider>
        <Provider store={store}>
          <Toaster/>
          <ScrollRestore />
          <HelmetProvider>
            <ApplicationRouter />
          </HelmetProvider>
        </Provider>
      </AuthProvider>
      </AddressProvider>

    </>
  );
}

export default App;
