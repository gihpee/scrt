import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([{'id': 1, 'description': 'dis sdfisdf sid fisd hfi', 'award': 500}, {'id': 2, 'description': 'dis sdfisdf sid fisd hfi', 'award': 500}, {'id': 3, 'description': 'dis sdfisdf sid fisd hfi', 'award': 500}, {'id': 3, 'description': 'dis sdfisdf sid fisd hfi', 'award': 500}]);

  /*useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    };

    fetchData();
  }, []);*/

  return (
    <div className='column'>

      <div className='top-container'>
        <div className='settings-btn'>
          connect wallet
        </div>
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
        <h1>􀊽 100</h1>
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
