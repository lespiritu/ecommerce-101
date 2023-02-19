import './App.css';
import NavBar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/logIn';
import { Container } from 'react-bootstrap';

import {UserProvider} from './context/userContext'
import Home from './pages/home';
function App() {
  return (
   <><UserProvider>
        <NavBar/>
        <Container>
          <Routes>
              <Route path='/login' element={<LogIn/>}/>
              <Route path='/testing' element={<Home/>}/>
              <Route path='/' element={<h1>Home this is it</h1>}/>
          </Routes>
          </Container>
        </UserProvider>
   </>
  );
}

export default App;
