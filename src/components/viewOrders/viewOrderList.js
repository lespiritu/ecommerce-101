import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import axios from "axios"
import { useEffect, useState } from "react"

import OrderCard from './orderCard'

export default function ViewOrdersList(){
    const [orders, setOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const [orderUpdated, setOrderUpdated] = useState(false)


    // code for get all active orders ----------------------------
    useEffect(()=>{
        axios.get(`https://e-commerse-espiritu.onrender.com/order/onGoingOrders`,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response =>{
            // console.log(response);
            setOrders(response.data.data)
        })
    },[orderUpdated])
 // code for get all active orders end --------------------------



    // code for get all completed orders ----------------------------------------------
    useEffect(()=>{
        axios.get('https://e-commerse-espiritu.onrender.com/order/showCompletedOrders',
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }  
            }
        )
        .then(response =>{
            // console.log(response);
            setCompletedOrders(response.data.data)
        })
    },[])
    // code for get all completed orders end ---------------------------------------------




     // function for recieving order ----------------------------------
     function recivedOrder(id){
        fetch(`https://e-commerse-espiritu.onrender.com/order/recievedOrder/${id}`,
            {
                method:"PUT",
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
               
            }
        )
        .then(data=> data.json())
        .then(response=>{
            // console.log(response);

            if(response.status === "success"){
                toast.success(`Order Completed! Thank you!`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });

                    setOrderUpdated(previous=> !previous)
            }
            else{
                toast.error(`Error ${response.message}!`, {
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
        )
    }
// function for recieving order end ----------------------------------


// function to rate products and order -------------------------------

// TO BE CONTINUE HERE
    // function rateProductOrder(id){
    //     fetch(`https://e-commerse-espiritu.onrender.com/order/orderComplete/addProductRating/${id}`,
    //     {
    //         method:"PUT",
    //         headers:{
    //             'Content-Type' : 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         },
    //         body:JSON.stringify(
    //             {
    //                 rating:3,
    //                 feedBack:''
    //             }
    //         )
           
    //     }
    //     )
    // }

    

    const allOrders = orders.map( (item, index) => <OrderCard key={index} {...item} recivedOrder={recivedOrder}/>)
    const allCompletedOrders = completedOrders.map( (item, index)=> <OrderCard key={index} {...item}/>)
    
    return(
        <div style={{marginTop:"50px", marginBottom:"100px"}}>
            
            <Tabs defaultActiveKey="activeOrders"  transition={false}  id="noanim-tab-example"   className="mb-3">

                <Tab eventKey="activeOrders" title="Active Orders">
                    <div style={{ marginBottom:"100px"}}>
                        <h2 className="text-secondary" style={{padding:"0 10px"}}>Active Orders</h2>
                        {allOrders}
                    
                    </div>
                </Tab>
                <Tab eventKey="completedOrders" title="Completed Orders">
                    <div style={{ marginBottom:"100px"}}>
                        <h2 className="text-secondary" style={{padding:"0 10px"}}>Completed Orders</h2> 
                         {allCompletedOrders}
                    </div>
                </Tab>
            </Tabs>
            
            <ToastContainer/>
        </div>
    )
}