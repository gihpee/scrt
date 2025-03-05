import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTonAddress } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import './Tasks.css';

const Tasks = () => {
  const { id } = window.Telegram.WebApp.initDataUnsafe.user;
  //const { id } = 478969308;
  const [tasks, setTasks] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
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

  const handleWithdraw = async () => {
    setIsSettingsOpen(false);
    
    if (!userFriendlyAddress) {
      setPopupMessage("Please connect your wallet first");
      return;
    }
    
    if (userData.balance === 0) {
      setPopupMessage("Balance must be greater than 0");
      return;
    }
    
    try {
      const response = await fetch(`https://scrtest.ru/api/withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `tma ${window.Telegram.WebApp.initData}`
        },
        body: JSON.stringify({ address: userFriendlyAddress })
      });
      
      if (response.status === 200) {
        setPopupMessage("Funds successfully withdrawn");
        setUserData(prev => ({ ...prev, balance: 0 }));
      } else {
        setPopupMessage("An error occurred");
      }
    } catch (error) {
      setPopupMessage("An error occurred");
    }
  };

  if (!userData) {
    return <div className="loading"></div>;
  }

  return (
    <div className='column' style={{height: '100vh'}}>

      <div className='top-container'>
        <button className='settings-btn' onClick={() => tonConnectUI.openModal()}>
          {userFriendlyAddress ? userFriendlyAddress : 'connect wallet'}
        </button>
        <div className='top2-container'>
          <div className='settings-btn'>
            􀬅 our community
          </div>
          <div className='settings-btn' onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
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
            <div className="task-card-title">{task.award / 1000}k</div>
          </Link>
        ))}
      </div>

        <div className={`settings-popup ${isSettingsOpen ? 'open' : ''}`}>
          <div className="settings-content">
            <div className='popup-name'>settings</div>
            <button className="close-btn" onClick={() => setIsSettingsOpen(false)}>×</button>
            <div className="settings-option" style={{marginTop: '40px'}} onClick={handleWithdraw}>􀁷 Withdraw</div>
            <div className="settings-option">􁆽 Earned history</div>
          </div>
        </div>

        {popupMessage && (
        <div className="popup-overlay">
          <div className="popup-message">
            <p>{popupMessage}</p>
            <button className="popup-btn" onClick={() => setPopupMessage(null)}>ОК</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Tasks;
