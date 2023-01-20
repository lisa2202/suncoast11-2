import { BoxProps } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Header } from "./Header";

interface WrapperProps extends BoxProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  useEffect(() => {
    const html = document.querySelector(`html`);

    html?.setAttribute(`class`, `wrapper`);

    return () => {
      html?.removeAttribute(`class`);
    };
  }, []);

  return (
    <>
      <Header />
      {children}
    </>
  );
};
