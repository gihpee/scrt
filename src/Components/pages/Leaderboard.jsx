import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const { id } = window.Telegram.WebApp.initDataUnsafe.user;
  const [users, setUsers] = useState([]);
  const [quantity, setQuantity] = useState(null);
  const [place, setPlace] = useState(null);


  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://scrtest.ru/api/get-rating/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${window.Telegram.WebApp.initData}`
              },
            });
  
            const result = await response.json();
            setUsers(result.users);
            setQuantity(result.total);
            setPlace(result.place);
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, [id]);

  if (!users) {
    return <div className="loading"></div>;
  }

  return (
    <div className='column'>

      <div className='main-top-container'>
        <div className='emoji'>🏆</div>
        <h1>leaderboard</h1>
        <span>􀳾 {quantity}</span>
        <span>􀤺 {place}</span>
      </div>

      <div className='list-box'>
        {users?.map((user) => (
            <div key={user.id} className="list-item">
                <img src={`https://scrtest.ru${user.photo_url}`}></img>
                <div className='item-info'>
                    <p>{user.nickname}</p>
                    <span>{user.puzzles} puzzles</span>
                </div>
            </div>
        ))}
      </div>

    </div>
  );
};

export default Leaderboard;
