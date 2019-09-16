
import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/home">
        Home
      </a><hr></hr>

      <a className="menu-item" href="/home">
        Courses
      </a><hr></hr>

      <a className="menu-item" href="/profile">
        Profile
      </a><hr></hr>

      <a className="menu-item" href="/conversations">
        Inbox
      </a><hr></hr>

      <a className="menu-item" href="/logout">
        Logout
      </a><hr></hr>

    </Menu>
  );
};