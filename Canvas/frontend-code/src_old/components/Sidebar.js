
import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a><hr></hr>

      <a className="menu-item" href="/laravel">
        Laravel
      </a><hr></hr>

      <a className="menu-item" href="/angular">
        Angular
      </a><hr></hr>

      <a className="menu-item" href="/react">
        React
      </a><hr></hr>

      <a className="menu-item" href="/vue">
        Vue
      </a><hr></hr>

      <a className="menu-item" href="/node">
        Node
      </a><hr></hr>
    </Menu>
  );
};