import React, { useState, useEffect } from 'react';
import './Friends.css';

const Friends = () => {
  const { id } = window.Telegram.WebApp.initDataUnsafe.user;
  const [users, setUsers] = useState([]);

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
  
          setUsers(result.friends);
  
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
        {users?.length >= 100 ? <div className='emoji'>🥵</div> : users?.length >= 10 ? <div className='emoji'>😱</div> : <div className='emoji'>🥶</div>}
        <h1>{users?.length} friends</h1>
        {users?.length >= 100 ? <span style={{color: 'rgba(142, 142, 147, 1)'}}>a friend in court is better than a penny in purse</span> 
        : users?.length >= 10 ? <span style={{color: 'rgba(142, 142, 147, 1)'}}>because he heard it was going to be a high-level social event!</span> 
        : <span style={{color: 'rgba(142, 142, 147, 1)'}}>why does he never need GPS? His friends are everywhere!</span>}
      </div>

      <div className='invite-btns'>
        <div className='invite-btn' style={{flex: '1'}}>invite a friend</div>
        <div className='invite-btn'>􀉂</div>
      </div>

      <div className='list-box' style={{maxHeight: 'calc(100vh - 400px)'}}>
        {users?.map((user) => (
            <div className="list-item">
                <img src={`https://scrtest.ru${user.referral.photo_url}`}></img>
                <div className='item-info'>
                    <p>{user.referral.nickname}</p>
                    <span>{user.referral.puzzles} puzzles</span>
                </div>
            </div>
        ))}
      </div>

    </div>
  );
};

export default Friends;
