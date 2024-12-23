import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Missions.css';

const Missions = () => {
  const { id } = window.Telegram.WebApp.initDataUnsafe.user;
  const [limitTasks, setLimitTasks] = useState([]);
  const [inGameTasks, setInGameTasks] = useState([{'id': 1, 'description': 'dif sid fisd hfi', 'icon': 'https://i.pinimg.com/736x/50/92/d0/5092d0630da3a2b354f1683960b2b91d.jpg', 'award': 500}, {'id': 2, 'description': 'dis sdfisdf sid fisd hfi', 'icon': 'https://i.pinimg.com/736x/50/92/d0/5092d0630da3a2b354f1683960b2b91d.jpg', 'award': 500}, {'id': 3, 'description': 'dis sdfisdf sid fisd hfi', 'icon': 'https://i.pinimg.com/736x/50/92/d0/5092d0630da3a2b354f1683960b2b91d.jpg', 'award': 500}]);
  const [switchValue, setSwitchValue] = useState('limited')
  const navigate = useNavigate();

  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://scrtest.ru/api/get-missions/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${window.Telegram.WebApp.initData}`
              },
            });
            const result = await response.json();
    
            setLimitTasks(result)
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, [id]);

  const handleCheckTask = (missionId) => async () => {
      try {
        const response = await fetch(`https://scrtest.ru/api/check-mission/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ missionId }),
        });
  
        const data = await response.json();
  
        if (data.ok) {
          navigate(0);
        } else {
          alert('not done')
        }
  
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }

  if (!limitTasks) {
    return <div className="loading"></div>;
  }

  return (
    <div className='column'>

      <div className='main-top-container'>
        <div className='emoji'>🥶</div>
        <h1>{limitTasks?.length + inGameTasks?.length} tasks</h1>
      </div>

      <div className="switcher">
        <button
          className={`switcher-button ${switchValue === "limited" ? "active" : ""}`}
          onClick={() => setSwitchValue("limited")}
        >
          Ограниченные
        </button>
        <button
          className={`switcher-button ${switchValue === "in-game" ? "active" : ""}`}
          onClick={() => setSwitchValue("in-game")}
        >
          In-game
        </button>
      </div>

      <div className='list-box'>
        {switchValue === 'limited' && limitTasks?.map((task) => (
            <a href={task.channel.url} key={task.id} className="list-item" style={{width: 'auto'}}>
                <img src={`https://scrtest.ru${task.img}`}></img>
                <div className='item-info'>
                    <p>{task.title}</p>
                    <span>+ {task.reward}</span>
                </div>
                <button className='check-btn' onClick={() => handleCheckTask(task.id)}>check</button>
            </a>
        ))}

        {switchValue === 'in-game' && inGameTasks.map((task) => (
            <div key={task.id} className="list-item" style={{width: 'auto'}}>
                <img src={task.icon}></img>
                <div className='item-info'>
                    <p>{task.description}</p>
                    <span>+ {task.award}</span>
                </div>
                <button className='check-btn'>check</button>
            </div>
        ))}
      </div>

    </div>
  );
};

export default Missions;
