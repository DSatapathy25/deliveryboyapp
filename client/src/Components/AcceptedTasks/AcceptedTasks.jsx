// import React, { useState, useEffect } from 'react';
// import Rating from '../Rating/Rating';
// import './AcceptedTasks.css'

// function AcceptedTasks() {
//   const [acceptedTasks, setAcceptedTasks] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [selectedTask, setSelectedTask] = useState(null);

//   useEffect(() => {
//     fetchAcceptedTasks();
//   }, []);

//   async function fetchAcceptedTasks() {
//     try {
//       const token = localStorage.getItem('token'); // Retrieve token from localStorage

//       if (!token) {
//         throw new Error('No token found');
//       }
//       const response = await fetch('/api/accepted-tasks',{
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (response.ok) {
//         const tasksData = await response.json();
//         setAcceptedTasks(tasksData);
//       } else {
//         console.error('Error fetching accepted tasks:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching accepted tasks:', error);
//     }
//   };




//   const handleCompleteTask = async (taskId) => {
//     try {

//       const token = localStorage.getItem('token');

//       const response = await fetch(`/api/tasks/${taskId}/complete`, {
//         method: 'PUT',
//         headers:{
//           Authorization: `Bearer ${token}`,
//         }
//       });
//       if (response.ok) {
//         // Fetch updated accepted tasks
//         fetchAcceptedTasks();
//         // Open rating popup with the completed task and rating
//         openRatingPopup(acceptedTasks.find(task => task.task_id === taskId));
//       } else {
//         console.error('Error completing task:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error completing task:', error);
//     }
//   };



//    // Define openRatingPopup function
//  const openRatingPopup = (task, rating) => {
//   setSelectedTask(task);
//   setRating(rating); // Set the rating in the state
// };

// // Define closeRatingPopup function
// const closeRatingPopup = () => {
//   setSelectedTask(null);
//   // Reset rating when closing the popup
//   setRating(0);
// };

// // Inside handleRateTask function
// const handleRateTask = async () => {
//   try {
//     if (!selectedTask) return alert("No selected task!");

//     const token = localStorage.getItem('token');

//     const response = await fetch(`/api/tasks/${selectedTask.task_id}/complete/rate`, {
//       method: 'POST', // Use POST method for rating task
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ rating }) // Send the rating in the request body
//     });
//     if (response.ok) {
//       // Task rated successfully, close the popup and fetch updated accepted tasks
//       closeRatingPopup();
//       fetchAcceptedTasks();
//     } else {
//       console.error('Error rating task:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error rating task:', error);
//   }
// };





//   const handleCancelTask = async (taskId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/tasks/${taskId}/cancel`, {
//         method: 'PUT',
//         headers:{
//           Authorization: `Bearer ${token}`,
//         }
//       });
//       if (response.ok) {
//         // Task canceled successfully, fetch updated accepted tasks
//         fetchAcceptedTasks();
//       } else {
//         console.error('Error canceling task:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error canceling task:', error);
//     }
//   };

//   return (
//     <div className="main-container" >
//     <h1>Accepted Tasks</h1>
//     <div className='task-container'>
//     <ul className="accepted-tasks-list ">
//       {acceptedTasks.map(task => (
//         <li key={task.task_id} className="task-card ">
//           <div className="task-card-container">
//             <div className="task-details">
//               <strong className="task-id">Task ID:</strong> {task.task_id}<br />
//               <strong>Pickup Address:</strong> {task.pickup_address}<br />
//               <strong>Delivery Address:</strong> {task.delivery_address}<br />
//               <strong>Time Slot:</strong> {task.time_slot}<br />
//               <strong>Status:</strong> {task.status}<br />
//             </div>
//             <div className="task-actions">
//               <button className="complete-btn " onClick={() => handleCompleteTask(task.task_id)}>Complete</button>
//               <button className="cancel-btn " onClick={() => handleCancelTask(task.task_id)}>Cancel</button>
//               {task.status === 'completed' && (
//                 <button className="rate-btn " onClick={() => openRatingPopup(task)}>Rate Task</button>
//               )}
//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
  
   
//     {selectedTask && (
//       <div className="rating-popup">
//         <div className="rating-popup-content card">
//           <span className="close" onClick={closeRatingPopup}>&times;</span><br />
//           <h2 className="popup-title">Rate Task</h2>
//           <p className="popup-description">Order delivered successfully</p>
//           <Rating rating={rating} setRating={setRating} />
//           <button className="rate-confirm-btn" onClick={() =>handleRateTask(selectedTask.task_id)}>Rate</button>
//         </div>
//       </div>
//     )}
//     </div>
//   </div>
  
  
  
  
//   );
// }

// export default AcceptedTasks;





import React, { useState, useEffect } from 'react';
import Rating from '../Rating/Rating';
import './AcceptedTasks.css';

function AcceptedTasks() {
  const [acceptedTasks, setAcceptedTasks] = useState([]);
  const [rating, setRating] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchAcceptedTasks();
  }, []);

  async function fetchAcceptedTasks() {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('/api/accepted-tasks', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const tasksData = await response.json();
        setAcceptedTasks(tasksData);
      } else {
        console.error('Error fetching accepted tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching accepted tasks:', error);
    }
  }

  const handleCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/tasks/${taskId}/complete`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchAcceptedTasks();
        openRatingPopup(acceptedTasks.find((task) => task.task_id === taskId));
      } else {
        console.error('Error completing task:', response.statusText);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const openRatingPopup = (task) => {
    setSelectedTask(task);
    setRating(task.rating);
  };

  const handleRateTask = async () => {
    try {
      if (!selectedTask) return alert('No selected task!');

      const token = localStorage.getItem('token');
console.log(selectedTask, rating);
      const response = await fetch(`/api/tasks/${selectedTask.task_id}/complete/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating }),
      });
      ;
      if (response.ok) {
        const updatedTask = { ...selectedTask, rating }; // Update the rating in the selected task object
        setAcceptedTasks(acceptedTasks.map(task => (task.task_id === selectedTask.task_id ? updatedTask : task))); // Update the rating in the state
        closeRatingPopup(); // Close the rating popup
        closeRatingPopup();
        fetchAcceptedTasks();
      } else {
        console.error('Error rating task:2', response.statusText);
      }
    } catch (error) {
      console.error('Error rating task:', error);
    }
  };

  const closeRatingPopup = () => {
    setSelectedTask(null);
    setRating(0);
  };

  const handleCancelTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/tasks/${taskId}/cancel`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchAcceptedTasks();
      } else {
        console.error('Error canceling task:', response.statusText);
      }
    } catch (error) {
      console.error('Error canceling task:', error);
    }
  };

  return (
    <div className="main-container">
      <h1>Accepted Tasks</h1>
      <div className="task-container">
        <ul className="accepted-tasks-list">
          {acceptedTasks.map((task) => (
            <li key={task.task_id} className="task-card">
              <div className="task-card-container">
                <div className="task-details">
                  <strong className="task-id">Task ID:</strong> {task.task_id}
                  <br />
                  <strong>Pickup Address:</strong> {task.pickup_address}
                  <br />
                  <strong>Delivery Address:</strong> {task.delivery_address}
                  <br />
                  <strong>Time Slot:</strong> {task.time_slot}
                  <br />
                  <strong>Status:</strong> {task.status}
                  <br />
                </div>
                <div className="task-actions">
                  <button className="complete-btn" onClick={() => handleCompleteTask(task.task_id)}>
                    Complete
                  </button>
                  <button className="cancel-btn" onClick={() => handleCancelTask(task.task_id)}>
                    Cancel
                  </button>
                  {task.status === 'completed' && (
                    <button className="rate-btn" onClick={() => openRatingPopup(task)}>
                      Rate Task
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedTask && (
        <div className="rating-popup">
          <div className="rating-popup-content card">
            <span className="close" onClick={closeRatingPopup}>&times;</span><br />
            <h2 className="popup-title">Rate Task</h2>
            <p className="popup-description">Order delivered successfully</p>
            <Rating rating={rating} setRating={setRating} />
            <button className="rate-confirm-btn" onClick={handleRateTask}>Rate</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AcceptedTasks;
