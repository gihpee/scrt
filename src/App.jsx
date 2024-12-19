import React from 'react';
import {Route, Routes} from "react-router-dom"
import './App.css'
import Tasks from './Components/pages/Tasks';
import Registration from './Components/pages/Registration';
import TaskDetail from './Components/pages/TaskDetail';
import NavBar from './Components/NavBar';

function App() {
  /*let tg = window.Telegram;
  tg.WebApp.expand();
  tg.WebApp.enableClosingConfirmation()*/

  return (
    <div className='App'>
      <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
        <Routes>
          <Route index element={<Tasks />}/>
          <Route path={'registration'} element={<Registration />}/>
          <Route path="task/:id" element={<TaskDetail />} />
        </Routes>
        <NavBar />
    </div>
  );
}

export default App;





