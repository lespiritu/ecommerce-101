import { useState, useEffect, useContext} from "react"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './logIn.css'

import UserContext from "../context/userContext";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";
export default function LogIn(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);

    const { setUserData} = useContext(UserContext)
   

    function logIn(event){

       
       axios.post('https://e-commerse-espiritu.onrender.com/user/login',{
        email:email,
        password:password
       })
     
        .then(response => {

            if(response.data.status === "failed"){
                toast.error(`Error! ${response.data.message}`, {
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
            else{
                localStorage.setItem('userToken', response.data.auth)
                setEmail('');
                setPassword('');

        
                setUserData(response.data);
            
                
            

                navigate('/testing')
             
                
            }
        })

        event.preventDefault();
        // alert('Successfully log-in');
        // localStorage.setItem("email", email);
        // setUser(localStorage.getItem("email"))
        
       

    }

    useEffect(()=>{
        if(email !=='' && password !==''){
            setBtnDisabled(false)
        }else{
            setBtnDisabled(true)
        }
    },[email, password])

  
    return(
        <div className="log-in">
            <h2>Welcome!</h2>
            <span>Login to continue</span>
            <Form onSubmit={(event)=> logIn(event)} className="col-10 col-md-8 col-lg-6 mt-4"  variant="dark">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                         />
               
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={event=> setPassword(event.target.value)}

                        />
                </Form.Group>


                <Button disabled={btnDisabled} variant="dark"  type="submit">
                    Log-In
                </Button>
            </Form>

            <ToastContainer/>
  
        </div>
    )
}