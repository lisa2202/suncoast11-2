/* eslint-disable @next/next/no-img-element */
import React, { CSSProperties } from "react";

interface LoaderProps {
  style?: CSSProperties | undefined;
}

export const Loader: React.FC<LoaderProps> = ({ ...props }) => {
  return (
    <div
      className="center padding30"
      data-bind="slideVisible:loading"
      {...props}
    >
      <div className="center padding30">
        <img className="opaque" src="/images/Wait64.gif" alt="Loading" />
      </div>
      <br />
      <br />
      <h6 className="scuGreenText">Processing login...</h6>
    </div>
  );
};
