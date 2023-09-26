import React from "react";

const Footer = ({ record, active, inactive }) => {
  return (
    <footer className="py-1 flex justify-between">
      <div className="flex gap-2">
        <ul className="flex gap-2 text-xs  relative after:content-['|'] top-0 right-0 opacity-70">
          <li>Record:</li>
          <li>{record}</li>
        </ul>

        <ul className="flex gap-2 text-xs  relative after:content-['|'] top-0 right-0 opacity-70">
          <li>Active:</li>
          <li>{active}</li>
        </ul>

        <ul className="flex gap-2 text-xs opacity-70">
          <li>Inactive:</li>
          <li>{inactive}</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
