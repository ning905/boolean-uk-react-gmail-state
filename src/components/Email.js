// <!-- if the email is read, also add the 'read' class. If unread,
// add the 'unread' class-->

import React from "react";

export const Email = (props) => {
  const { id, sender, title, read, starred, toggleRead, toggleStar } = props;

  return (
    <li className={read ? "email read" : "email unread"}>
      <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"
          checked={read ? true : false}
          onChange={() => toggleRead(id)}
        />
      </div>
      <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
          checked={starred ? true : false}
          onChange={() => toggleStar(id)}
        />
      </div>
      <div className="sender">{sender}</div>
      <div className="title">{title}</div>
    </li>
  );
};
