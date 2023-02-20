
import './App.css';
import NavBar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import LogIn from './pages/logIn';
import { Container } from 'react-bootstrap';

import {UserProvider} from './context/userContext'
import Home from './pages/home';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Signup from './pages/signup';
import PageNotFound from './pages/pageNotFound';
import AdminDashBoard from './pages/admindashboard/adminDashBoard';
import AddProducts from './pages/admindashboard/addProduct';

function App() {
 
  const [user, setUser] = useState(null);

  useEffect( ()=>{
 
    axios.get(`https://e-commerse-espiritu.onrender.com/user/details`,
              {
                  headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
              }
          )

        .then(response => {
        
            if(localStorage.getItem('token') === null){
              setUser(response.data)
            }
            else{
              setUser(null)
            }
            
        })


},[])

  
  return (
   <>
      <UserProvider value={{user, setUser}}>
        <NavBar/>
        <Container>
          <Routes>
              
              <Route path='login' element={<LogIn/>}/>

              <Route path='signup' element={<Signup/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='*' element = {<PageNotFound/>} />

              <Route path='/adminDashBoard' element={<AdminDashBoard/>}>
                <Route path='addProduct' element={<AddProducts/>}/>
              </Route>

          </Routes>
          </Container>
        </UserProvider>
   </>
  );
}

export default App;
