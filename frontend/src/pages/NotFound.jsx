import React from "react";
import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>{error.status}</h1>
      <h3>Page {error.statusText}</h3>
      <p>
        But if you don't change your direction, and if you keep looking, you may
        end up where you are heading.
      </p>
      <Link to="/">
        <button>Take Me to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
