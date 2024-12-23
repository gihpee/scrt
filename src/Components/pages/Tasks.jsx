import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTonAddress } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import './Tasks.css';

const Tasks = () => {
  const { id } = window.Telegram.WebApp.initDataUnsafe.user;
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  setOptions({ language: 'ru' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://scrtest.ru/api/user-data/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `tma ${window.Telegram.WebApp.initData}`
          },
        });
        const result = await response.json();

        if (response.status === 201) {
          navigate('/registration');
        } else {
          setTasks(result.tasks);
          setUserData(result.user);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (!userData) {
    return <div className="loading"></div>;
  }

  return (
    <div className='column'>

      <div className='top-container'>
        <button className='settings-btn' onClick={() => tonConnectUI.openModal()}>
          {userFriendlyAddress ? userFriendlyAddress : 'connect wallet'}
        </button>
        <div className='top2-container'>
          <div className='settings-btn'>
            􀬅 our community
          </div>
          <div className='settings-btn'>
            􀣌 settings
          </div>
        </div>
      </div>

      <div className='user-info'>
        <span>level 1</span>
        <h1>􀊽 {userData?.balance}</h1>
      </div>
      
      <div className="task-list">
        {tasks.map((task) => (
          <Link to={`/task/${task.id}`} key={task.id} className="task-card">
            <div className="task-card-title">{task.award}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
