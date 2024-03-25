


import React, { useState, useEffect } from 'react';
import "./FinalTasks.css"

const FinalTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
   
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No token available");
        }
        const response = await fetch('/api/tasks/all', {});
        const data = await response.json();
        setTasks(data); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="task-container">
      <div className="task-list">
        <h2>Accepted Tasks</h2>
        <ul>
          {tasks.filter(task => task.status === 'accepted').map(task => (
            <li key={task._id} className="task-item accepted">
              <span className="task-name">{task.name}</span>
              <span className="task-status">Accepted</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="task-list">
        <h2>Completed Tasks</h2>
        <ul>
          {tasks.filter(task => task.status === 'completed').map(task => (
            <li key={task._id} className="task-item completed">
              <span className="task-name">{task.name}</span>
              <span className="task-status">Completed</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="task-list">
        <h2>Canceled Tasks</h2>
        <ul>
          {tasks.filter(task => task.status === 'canceled').map(task => (
            <li key={task._id} className="task-item canceled">
              <span className="task-name">{task.name}</span>
              <span className="task-status">Canceled</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinalTask;
