import React from "react";

const RecordCount = ({ record, status = 0 }) => {
  const active = status === 0 ? 0 : status.active;
  const inactive = status === 0 ? 0 : status.inactive;

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

export default RecordCount;
