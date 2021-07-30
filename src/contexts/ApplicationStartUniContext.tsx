import { createContext, ReactNode, useContext, useState } from 'react';

type ApplicationStartUniContextData = {
  isLoading: boolean;
  loading: () => void;
}

export const ApplicationStartUniContext = createContext({} as ApplicationStartUniContextData);

type ApplicationStartUniContextProvider = {
  children: ReactNode;
}

export function ApplicationStartUniContextProvider({ children }: ApplicationStartUniContextProvider) {
  const [isLoading, setIsLoading] = useState(true);

  function loading() {
    setIsLoading(!isLoading);
  }

  return (
    <ApplicationStartUniContext.Provider value={{
      isLoading, 
      loading,
      }}>
      {children}
    </ApplicationStartUniContext.Provider>
  )
}

export const useApplicationStartUni = () => {
  return useContext(ApplicationStartUniContext);
}
