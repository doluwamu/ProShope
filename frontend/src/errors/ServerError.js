import React from "react";

const ServerError = ({ error }) => {
  return (
    <div>
      {error &&
        error.length > 0 &&
        error.map((e) => {
          return (
            <div
              id="alert-danger"
              className="alert alert-danger my-3"
              key={e.title}
            >
              <span>{e.detail}</span>
            </div>
          );
        })}
    </div>
  );
};

export default ServerError;
