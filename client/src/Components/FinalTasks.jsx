// import React, { useState, useEffect } from 'react';
// import './FinalTasks.css';

// function TaskList() {
//   const [canceledTasks, setCanceledTasks] = useState([]);
//   const [completedTasks, setCompletedTasks] = useState([]);
//   const [acceptedTasks, setAcceptedTasks] = useState([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);
 
//   const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if(!token){
//             throw new Error( "No token available" );
//         }
//       // Fetch canceled tasks
//       const canceledResponse = await fetch('/api/tasks/canceled-tasks',{
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`,
//     }
//       });
//       if (canceledResponse.ok) {
//         const canceledTasksData = await canceledResponse.json();
//         setCanceledTasks(canceledTasksData);
//       }

//       // Fetch completed tasks
//       const completedResponse = await fetch('/api/tasks/completed-tasks',{
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`,
//     }
// });
//       if (completedResponse.ok) {
//         const completedTasksData = await completedResponse.json();
//         setCompletedTasks(completedTasksData);
//       }

//       // Fetch accepted tasks
//       const acceptedResponse = await fetch('/api/accepted-tasks',{
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`,
//     }
// });
//       if (acceptedResponse.ok) {
//         const acceptedTasksData = await acceptedResponse.json();
//         setAcceptedTasks(acceptedTasksData);
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   return (
//     <div className="task-list">
//       <h2>Canceled Tasks</h2>
//       <ul>
//         {canceledTasks.map(task => (
//           <li key={task.task_id}>
//             Task ID: {task.task_id}, Status: {task.status}
//           </li>
//         ))}
//       </ul>

//       <h2>Completed Tasks</h2>
//       <ul>
//         {completedTasks.map(task => (
//           <li key={task.task_id}>
//             Task ID: {task.task_id}, Status: {task.status}
//           </li>
//         ))}
//       </ul>

//       <h2>Accepted Tasks</h2>
//       <ul>
//         {acceptedTasks.map(task => (
//           <li key={task.task_id}>
//             Task ID: {task.task_id}, Status: {task.status}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TaskList;


import React, { useState, useEffect } from 'react';
import "./FinalTasks.css"

const FinalTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend API
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No token available");
        }
        const response = await fetch('/api/tasks/all', {});
        const data = await response.json();
        setTasks(data); // Assuming the response contains all tasks
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
