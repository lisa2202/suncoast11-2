import React from "react";

interface ContainerProps {
  title?: string;
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, title }) => {
  return (
    <div className={`container`}>
      <hgroup className={`title`}>
        <h1>{title || `\u00A0`}</h1>
      </hgroup>
      <div className={`content`}>
        <div className={`row-fluid`}>{children}</div>
      </div>
    </div>
  );
};
