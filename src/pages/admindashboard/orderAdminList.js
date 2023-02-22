import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

import axios from "axios";
import { useEffect, useState } from "react";
import OrdersAdminCard from "./ordersAdminCard";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function OrderAdminList(){

    const [allOrders, setAllOrders] = useState([]);


    const [orderId, setOrderId] = useState('');

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/order/showOrdersAdmin/all`,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response=>{
            // console.log(response);

            if(response.data.status === "success"){
                setAllOrders(response.data.data)
            }
            
        })
    },[])


    //
    function allOrdersHandler(){
            axios.get(`${process.env.REACT_APP_API_URL}/order/showOrdersAdmin/all`,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            .then(response=>{
                // console.log(response);

                if(response.data.status === "success"){
                    setAllOrders(response.data.data)
                }
                else{
                    toast.error(`Erro! ${response.data.message}`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                }
            })
    }

///-------------- All on going orders ------------------
        function allOnGoingOrdersHandler(){
            axios.get(`${process.env.REACT_APP_API_URL}/order/showOrdersAdmin/onGoing`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            .then(response=>{
                // console.log(response);

                if(response.data.status === "success"){
                    setAllOrders(response.data.data)
                }
                else{
                    toast.error(`Erro! ${response.data.message}`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                }
            })
        }


///// ------------ All complete orders -------------------
        function allCompleteOrdersHandler(){
            axios.get(`${process.env.REACT_APP_API_URL}/order/showOrdersAdmin/completed`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            .then(response=>{
                // console.log(response);

                if(response.data.status === "success"){
                    setAllOrders(response.data.data)
                }
                else{
                    toast.error(`Erro! ${response.data.message}`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                }
                
            })
        }


/////-- search by Order ID


function searchOrderId(event){
    event.preventDefault();
    if(orderId !== ''){
        
            axios.get(`${process.env.REACT_APP_API_URL}/order/showOrdersAdmin/singleOrder/${orderId}`,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response=>{
                // console.log(response);

                if(response.data.status === "success"){

                    setAllOrders([response.data.data])
                
                }
                else{
                    toast.error(`Invalid Product ID!`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                }
            })
    }
    else{
        toast.error(`Please input Product ID!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
}









    const renderAllOrders = allOrders.map((item, index) => <OrdersAdminCard key={index} {...item}/>)
    return(
        <div className="viewAllProduct">
                <Form className="queryControl">
                    <Form.Control
                    type="search"
                    className="inputSearch"
                    placeholder="Input Order ID here"
                    aria-label="Search"
            
                    value={orderId}
                    onChange={event => setOrderId(event.target.value)}
                
                    />
                    <Button className="button" onClick={event=>searchOrderId(event)} variant="secondary">Search</Button>
                    <Button className="button" onClick={allOrdersHandler} variant="secondary">View all</Button>
                    <Button className="button" onClick={allOnGoingOrdersHandler}  variant="secondary">Active</Button>
                    <Button className="button" onClick={allCompleteOrdersHandler}  variant="secondary">Completed</Button>

                 </Form>
         {renderAllOrders}

         <ToastContainer/>
        </div>
    )
}