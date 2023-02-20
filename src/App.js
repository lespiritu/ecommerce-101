import './App.css';
import NavBar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/logIn';
import { Container } from 'react-bootstrap';

import {UserProvider} from './context/userContext'
import Home from './pages/home';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
        
            if(localStorage.getItem('token') !== null){
              setUser(response.data)
            }
            else{
              setUser(null)
            }
            
        })


},[])

  
  return (
   <><UserProvider value={{user, setUser}}>
        <NavBar/>
        <Container>
          <Routes>
              <Route path='*' element = {<h1>page not found</h1>} />
              <Route path='/login' element={<LogIn/>}/>

              <Route path='/testing' element={<Home/>}/>
              <Route path='/' element={<Home/>}/>
              
          </Routes>
          </Container>
        </UserProvider>
   </>
  );
}

export default App;
