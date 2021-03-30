import React from "react";
import "./overlay.scss";

const Overlay = ({
  children,
}: {
  children?: string | JSX.Element | Array<JSX.Element>;
}) => {
  return (
    <React.Fragment>
      {children && (
        <div className="overlay">
          <div>
            {children}
            <input type="button" value="OK" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Overlay;
