import React, { useState, useEffect } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import HabitList from './habitList';
import ScheduledHabit from './scheduledHabit';
import Message from './message';
import Footer from './footer';
import RoutineList from './routineList';

const UserHabits = props => {
  const userId = 2;
  function isSideBarOpen() {
    if (props.isOpen) {
      return <Sidebar sideRender={'inHabits'} closeSideBar={props.openSideBar} />;
    }
  }

  const [habits, setHabits] = useState([]);
  const [view, setView] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentHabit, setCurrentHabit] = useState(0);
  const [currentRoutine, setCurrentRoutine] = useState(0);
  const [routine, setRoutine] = React.useState(null);
  const [routineHabits, setRoutineHabits] = useState([]);

  function getUserHabits(userId) {
    fetch(`/api/habit/${userId}`)
      .then(result => result.json())
      .then(userHabits => {
        setHabits(userHabits);
      });
  }

  function deleteUserHabit(habitId) {
    fetch('/api/habit/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ habitId: habitId })
    })
      .then(response => {
        const habitsCopy = [...habits];
        const index = habitsCopy.findIndex(element => element.habitId === habitId);
        habitsCopy.splice(index, 1);
        setHabits(habitsCopy);

      });
  }

  function updateLastCompletion(habitId) {
    fetch('/api/user/habit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        habitId: habitId,
        userId: userId
      })
    })
      .then(response => response.json())
      .then(response => {
        const habitsCopy = [...habits];
        const index = habitsCopy.findIndex(element => element.habitId === habitId);
        habitsCopy[index].lastCompleted = response.lastCompleted;
        habitsCopy[index].timesCompleted = response.timesCompleted;
        habitsCopy[index].nextCompletion = response.nextCompletion;
        setHabits(habitsCopy);
        setCurrentMessage(response.congratsMessage);

      });
  }

  function motivationalMessage(habitId) {
    const index = habits.findIndex(element => element.habitId === habitId);
    setCurrentMessage(habits[index].motivationalMessage);
  }

  function findCurrentHabit(id) {
    setCurrentHabit(id);
  }

  function changeView(currentView) {
    setView(currentView);
  }

  function newHabit() {
    if (props.newHabit) {
      const habitsCopy = [...habits];
      habitsCopy.push(props.newHabit);
      setHabits(habitsCopy);
    }
  }

  function findCurrentRoutine(id) {
    setCurrentRoutine(id);
  }

  function getRoutineHabits() {
    fetch(`/api/routine/${currentRoutine}/user/${userId}`)
      .then(res => res.json())
      .then(res => {
        return setRoutineHabits(res);
      });
  }

  function chooseHabit(id) {

  }

  useEffect(() => {
    getUserHabits(userId);
    newHabit();
    fetch(`/api/routine/user/${userId}`)
      .then(res => res.json())
      .then(res => setRoutine(res));

  }, []);

  function checkView() {
    if (view === 'scheduledHabit') {
      return <ScheduledHabit id={currentHabit} motivationalMessage= {motivationalMessage} update={updateLastCompletion} changeView={changeView}/>;
    } else if (view === 'message') {
      return <Message changeView= {changeView} messageToSelf={currentMessage}/>;
    } else if (view === 'chooseRoutine') {
      return (
        <div className="bg-light h-100">
          <Header title={'Choose Routine'} headerView={'main'} openSideBar = {props.openSideBar} />
          {isSideBarOpen()}
          <RoutineList changeView={changeView} view='notUserRoutineMain'
            routine={routine} userId={props.userId} setView={setView}
            findCurrentRoutine={findCurrentRoutine} />;
        </div>
      );
    } else if (view === 'chooseHabit') {
      getRoutineHabits();
      return (
        <div className="bg-light h-100">
          <Header title={'chooseHabit'} headerView={'main'} openSideBar={props.openSideBar} />
          { isSideBarOpen() }
          <HabitList chooseHabitFunction={chooseHabit} chooseHabit={true} changeView={changeView} chooseHabitProp={chooseHabit} userId={userId} userHabits={routineHabits} />
        </div>
      );
    } else {
      return (
        <div className="bg-light h-100">
          <Header title={'User Habits'} headerView={'main'} choosehabit ={false} openSideBar={props.openSideBar} />
          {isSideBarOpen()}
          <HabitList currentId={findCurrentHabit} changeView={changeView} deleteHabit={deleteUserHabit} userId={userId} userHabits={habits} />
          <Footer screen="userHabits" changeView= {changeView}/>
        </div>);
    }

  }
  return (<> {checkView()} </>);
};

export default UserHabits;
