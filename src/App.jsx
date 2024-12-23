import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom"
import './App.css'
import Tasks from './Components/pages/Tasks';
import Registration from './Components/pages/Registration';
import TaskDetail from './Components/pages/TaskDetail';
import NavBar from './Components/NavBar';
import Leaderboard from './Components/pages/Leaderboard';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Friends from './Components/pages/Friends';
import Missions from './Components/pages/Missions';

function App() {
  const location = useLocation();
  let tg = window.Telegram;
  tg.WebApp.expand();
  tg.WebApp.enableClosingConfirmation()

  return (
    <TonConnectUIProvider manifestUrl="https://scrt.netlify.app/tonconnect-manifest.json">
      <div className='App'>
        <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
          <Routes>
            <Route index element={<Tasks />}/>
            <Route path="registration" element={<Registration />}/>
            <Route path="task/:id" element={<TaskDetail />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="friends" element={<Friends />} />
            <Route path="missions" element={<Missions />} />
          </Routes>
          {location.pathname !== "/registration" && <NavBar />}
      </div>
    </TonConnectUIProvider>
  );
}

export default App;





