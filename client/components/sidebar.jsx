/*
* Only exist with the hamburger bar header
*/

import React from 'react';
import SidebarItem from './sidebaritem';
import { Link } from 'react-router-dom';
const Sidebar = props => {

  const sideBarItems = () => {
    if (props.sideRender === 'inHabits') {
      return (
        <>
          <Link to="/">
            <SidebarItem pic="far fa-user" text="Log Out" />
          </Link>
          <Link to="/userRoutine">
            <SidebarItem onClick={props.closeSideBar} pic="fas fa-bars" text="Routines" />
          </Link>
          <SidebarItem onClick={props.closeSideBar} pic="fas fa-times" text="Close" />
        </>
      );
    } else if (props.sideRender === 'inRoutines') {
      return (
        <>
          <Link to="/">
            <SidebarItem onClick={props.closeSideBar} pic="far fa-user" text="Log Out" />
          </Link>
          <Link to="/userHabits">
            <SidebarItem onClick={props.closeSideBar} pic="fas fa-bars" text="Habits" />
          </Link>
          <SidebarItem onClick={props.closeSideBar} pic="fas fa-times" text="Close" />
        </>
      );
    } else {
      const nextRequest = (
        <>
          <Link to="/">
            <SidebarItem pic="far fa-user" text="Log Out" />
          </Link>
          <Link to="/userRoutine">
            <SidebarItem pic="fas fa-bars" text="Routines" />
          </Link>
          <SidebarItem pic="fas fa-exclamation-circle" text="Pending Routine" />
          <SidebarItem onClick={props.closeSideBar} pic="fas fa-times" text="Close" />
        </>
      );
      return nextRequest;
    }
  };

  return (
    <div className="shadow-div container ">
      <div className="open-side offset-5 purple">
        {sideBarItems()}
      </div>
    </div>
  );
};

export default Sidebar;
