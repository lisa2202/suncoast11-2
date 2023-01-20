import "../styles/globals.css";
import "../styles/css.scss";
import "../styles/authentication.scss";
import type { AppProps } from "next/app";

import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import { createContext, useState } from "react";

export const DataContext = createContext({} as any);

function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState();
  return (
    <DataContext.Provider value={{ data, setData }}>
      <Component {...pageProps} />
    </DataContext.Provider>
  );
}

export default MyApp;
