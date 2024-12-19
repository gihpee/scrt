import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({'id': 1, 'description': 'dis sdfisdf sid fisd hfi', 'award': 500});
  const [answer, setAnswer] = useState('');
  const [hint1, setHint1] = useState('tt t t t');
  const [hint2, setHint2] = useState('');
  const [hint3, setHint3] = useState('');

  /*useEffect(() => {
    // Имитируем загрузку задачи с бэкенда
    const fetchTask = async () => {
      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [id]);

  if (!task) return <p>Загрузка...</p>;*/

  /*<button onClick={() => navigate(-1)}>Назад</button>*/

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setAnswer(value)
  };

  return (
    <div className='column'>

      <div className="task-details">
        <div className='task-details__info'>
          <p>{task.description}</p>
          <span>reward {task.award}</span>
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
        <div className='hint'>a</div>
        <div className='hint'>aasf</div>
        <div className='hint'>asd</div>
      </div>
    </div>
  );
};

export default TaskDetail;
