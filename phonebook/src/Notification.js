import React from "react";

const Notification = ({ message, errorMessages }) => {
  if (message === null) {
    return null;
  } else {
    return <div className="notification">{message}</div>;
  }
};

export default Notification;
