/* eslint-disable @next/next/no-img-element */
import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <div className="control-group">
      <button
        id="btnSubmit"
        type="button"
        className="btn btn-primary btn-login-right"
        {...props}
      >
        {loading ? (
          <img src="/images/loader.gif" alt="Loading" />
        ) : (
          <span>{children}</span>
        )}
      </button>
    </div>
  );
};
