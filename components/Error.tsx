import React from "react";

interface ErrorProps {
  errors: {
    [x: string]: any;
  };
}

export const Error: React.FC<ErrorProps> = ({ errors }) => {
  let errArr = [];

  for (const key in errors) {
    errArr.push(errors[key].message);
  }

  return (
    <>
      {errArr.map((error) => (
        <div key={error} className="red-text">
          <ul>
            <li>{error}</li>
          </ul>
        </div>
      ))}
    </>
  );
};
