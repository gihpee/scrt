import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainButton from '@twa-dev/mainbutton';
import './TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [answer, setAnswer] = useState('');
  const [hint1, setHint1] = useState('');
  const [hint2, setHint2] = useState('');
  const [hint3, setHint3] = useState('');

  useEffect(() => {
      const fetchData = async () => {
        try {
          let tid = id;
          const response = await fetch(`https://scrtest.ru/api/get-full-task/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `tma ${window.Telegram.WebApp.initData}`
            },
            body: JSON.stringify({tid}),
          });

          const result = await response.json();
          setTask(result.task);
          setHint1(result.hint1);
          setHint2(result.hint2);
          setHint3(result.hint3);
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
  }, [id]);

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setAnswer(value)
  };

  const handleUseHint = (hintNum) => async () => {
    try {
      let tid = id;
      const response = await fetch(`https://scrtest.ru/api/get-hint/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `tma ${window.Telegram.WebApp.initData}`
          },
          body: JSON.stringify({ tid, hintNum }),
      });

      const data = await response.json();

      if (hintNum === 1) {
        setHint1(data.hint)
      } else if (hintNum === 2) {
        setHint2(data.hint)
      } else if (hintNum === 3) {
        setHint3(data.hint)
      }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  const handleAnswer = async () => {
    try {
      let tid = id;
      const response = await fetch(`https://scrtest.ru/api/send-answer/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `tma ${window.Telegram.WebApp.initData}`
          },
          body: JSON.stringify({ tid, answer }),
      });

      const data = await response.json();

      if (data.ok) {
        navigate('/')
      } else {
        setAnswer('')
        alert('wrong')
      }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  return (
    <div className='column'>

      <div className="task-details">
        <div className='task-details__info'>
          <p>{task?.description}</p>
          <span>reward {task?.award}</span>
        </div>
        <div className="field">
          <input
            type='text'
            placeholder={`your answer`}
            name={`Answer`}
            value={answer}
            onChange={(e) => handleAnswerChange(e)}
          />
        </div>
      </div>

      <div className='hints'>
        <div className='hint' onClick={handleUseHint(1)}>{hint1 ? hint1 : -task?.hint1_price}</div>
        <div className='hint' onClick={handleUseHint(2)}>{hint2 ? hint2 : -task?.hint2_price}</div>
        <div className='hint' onClick={handleUseHint(3)}>{hint3 ? hint3 : -task?.hint3_price}</div>
      </div>

      {answer && <MainButton text="send answer" onClick={() => handleAnswer()} />}
    </div>
  );
};

export default TaskDetail;
