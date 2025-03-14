import React from 'react';

const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;