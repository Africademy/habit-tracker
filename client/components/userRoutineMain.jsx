import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import RoutineList from './routineList';
import Footer from './footer';
import BlankCard from './blankCard';

const UserRoutineMain = props => {
  const [routine, setRoutine] = React.useState(null);
  const [blank, setBlank] = React.useState(false);

  function isSideBarOpen() {
    if (props.isOpen) {
      return <Sidebar signOut={props.signOut} sideRender={'inRoutines'} closeSideBar={props.openSideBar} />;
    }
  }

  React.useEffect(
    () => {
      fetch(`/api/routine/user/${props.userId}`)
        .then(res => res.json())
        .then(res => setRoutine(res));
    }, []
  );

  const createBlank = () => {
    return blank && <BlankCard setBlank={setBlank}
      user={props.userId} routine={routine} setRoutine={setRoutine} blank='routine' />;
  };

  return (
    <div className="h-100 pb-5">
      <Header title={'User Routines'} headerView={'main'} openSideBar={props.openSideBar} />
      {isSideBarOpen()}
      <RoutineList view='userRoutineMain' routine={routine} userId={props.userId} setView={props.setView}
        setRoutine={setRoutine} />
      {createBlank()}
      <Footer screen='userRoutine' setBlank={setBlank} />
    </div>
  );
};

export default UserRoutineMain;