import { QueryClient, QueryClientProvider } from "react-query";
import { ApplicationStartUniContextProvider } from "../contexts/ApplicationStartUniContext";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";
import GlobalStyles from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
      <ApplicationStartUniContextProvider>
        <AuthProvider>
            <GlobalStyles />
            <Component {...pageProps} />
        </AuthProvider>
      </ApplicationStartUniContextProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}

export default MyApp
