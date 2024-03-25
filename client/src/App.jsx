
import './App.css';
import { Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Navbar from './Components/Navbar/Navbar';
import AboutUs from './Components/AboutUs/AboutUs';
import Profile from './Components/Profile/Profile';
import AllTasks from './Components/Tasks/Tasks';
import MyTasks from './Components/AcceptedTasks/AcceptedTasks';
import LoginSignin from './Components/Login/LoginSignin';
import TaskList from './Components/FinalTasks';


function App() {
  return (
    <div >
      <Navbar/>
     
    
   <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<LoginSignup/>}></Route>
      <Route path='/login' element={<LoginSignin/>}></Route>
      <Route path='/aboutUs' element={<AboutUs/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/alltasks' element={<AllTasks/>}></Route>
      <Route path='/acceptedtasks' element={<MyTasks/>}></Route>
      <Route path='/logout' element={<Profile/>}></Route>
      <Route path='/all' element={<TaskList/>}></Route>
    
      </Routes>
   
    </div>
  );
}

export default App;
