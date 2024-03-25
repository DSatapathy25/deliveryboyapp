import React, { useState, useEffect } from 'react';
import "./Tasks.css"


function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);



  async function fetchTasks() {
    try {
      const token = localStorage.getItem('token'); 

      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasksData = await response.json();
      console.log(tasksData, "tasks Datass");
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  const acceptTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`/api/tasks/${taskId}/accept`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      if (response.ok) {
        
        setTasks(prevTasks => prevTasks.filter(task => task.task_id !== taskId));
      } else {
        console.error('Error accepting task:', response.statusText);
      }
    } catch (error) {
      console.error('Error accepting task:', error);
    }
  };

  return (
    <div className='todaycontainer'>
    <h1>Today's Tasks</h1>
    <div className='task-container'>
     
    {tasks.map((task) => (
      <div className="task-card" key={task.task_id}>
        <div className="task-details">
          <h2>Task ID: {task.task_id}</h2>
          <p><strong>Pickup Address:</strong> {task.pickup_address}</p>
          <p><strong>Delivery Address:</strong> {task.delivery_address}</p>
          <p><strong>Time Slot:</strong> {task.time_slot}</p>
        </div>
        <button className="accept-button" onClick={() => acceptTask(task.task_id)}>Accept</button>
      </div>
    ))}
  </div>
  </div>
  );
}

export default Dashboard;


