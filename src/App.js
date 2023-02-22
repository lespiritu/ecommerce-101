import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import './App.css';
import NavBar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import LogIn from './pages/logIn';
import { Container } from 'react-bootstrap';

import {UserProvider} from './context/userContext'
import Home from './pages/home';
import { useState } from 'react';

import Signup from './pages/signup';
import PageNotFound from './pages/pageNotFound';
import AdminDashBoard from './pages/admindashboard/adminDashBoard';
import AddProducts from './pages/admindashboard/addProduct';
import ViewAllProducts from './pages/admindashboard/viewProducts';
import EditProduct from './pages/admindashboard/editProduct';
import ViewProduct from './components/viewProduct';
import ViewOrdersList from './components/viewOrders/viewOrderList';


import OrderAdminList from './pages/admindashboard/orderAdminList';
import Footer from './pages/footer';
import CartView from './components/cartView/cartView';
function App() {
 
  const [user, setUser] = useState(null);

  
  
  return (
   <>
      <UserProvider value={{user, setUser}}>
        <NavBar/>
        <Container className='parent-caontainer'>
          <Routes>
              
              <Route path='login' element={<LogIn/>}/>

              <Route path='signup' element={<Signup/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='*' element = {<PageNotFound/>} />
              <Route path='/viewProduct/:productId' element={<ViewProduct/>}/>
              <Route path='/viewOrdersList' element={<ViewOrdersList/>}/>
              <Route path='/cartView' element={<CartView/>}/>

              <Route path='/adminDashBoard' element={<AdminDashBoard/>}>
                <Route path='addProduct' element={<AddProducts/>}/>
                <Route path='viewProducts' element={<ViewAllProducts/>}/>
                <Route path='viewProducts/editProduct/:productId' element={<EditProduct/>}/>
                <Route path='ordersAdminList' element={<OrderAdminList/>}/>
              </Route>

          </Routes>
          </Container>
          <Footer/>
        </UserProvider>

        <ToastContainer/>
   </>
  );
}

export default App;
