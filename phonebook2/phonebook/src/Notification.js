import React from "react";

const Notification = ({ notificationType, message }) => {
  if (notificationType === null) {
    return null;
  }
  if (notificationType === "success") {
    return <div className="success">{message}</div>;
  }
  if (notificationType === "error") {
    return <div className="error">{message}</div>;
  }
};

export default Notification;
