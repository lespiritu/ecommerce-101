

import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState, useEffect, useContext} from 'react';
import axios from 'axios';

import UserContext from '../context/userContext';
import { Navigate, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Signup(){
    const navigate = useNavigate()
    // for modal only
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        navigate('/login')
    };
    const handleShow = () => {
        setShow(true);
      
    };
    // end of modal handlers


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [confirmPassword, setConfirmPassword] =useState('')
    
    const [btnDisabled, setBtnDisabled] = useState(true);

    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(email !=='' && password !=='' && fullName!== '' && address !== '' && mobileNo !== '' && confirmPassword !== ''){
            if(password === confirmPassword){
               
                setBtnDisabled(false)
            }
            else{
                setBtnDisabled(true)
            }
            
        }

        else{
            setBtnDisabled(true)
        }
    },[email, password, fullName, address, mobileNo, confirmPassword])

   
    function signup(event){
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/user/register`,
            {
                email: email,
                password: password,
                fullName: fullName,
                address: address,
                mobileNo: mobileNo
            }
        )
        .then(response =>{
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
                handleShow();
                
            }
        })
    }

    return(
        user ? <Navigate to = '*'/> :
        <>
         <div className="log-in">
            <h2>Welcome!</h2>
            <span>Sign up to continue</span>
            <Form onSubmit={event=> signup(event)} className="col-10 col-md-8 col-lg-6 mt-4"  variant="dark">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                         />
               
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicfullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Full Name" 
                        value={fullName}
                        onChange={event=> setFullName(event.target.value)}

                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Address" 
                        value={address}
                        onChange={event=> setAddress(event.target.value)}

                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicMobileNo">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Mobile Number" 
                        value={mobileNo}
                        onChange={event=> setMobileNo(event.target.value)}

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

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>

                    <Form.Control 
                        type="password" 
                        placeholder="Confirm your Password" 
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                        required
                    />

                </Form.Group>
                



                <Button disabled={btnDisabled} variant="dark"  type="submit">
                    Log-In
                </Button>
            </Form>
            
            <Modal show={show} >
                <Modal.Header >
                <Modal.Title>Successfully Registered!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Continue to log in page. Thank you!</Modal.Body>
                <Modal.Footer>
              
                <Button variant="dark" onClick={handleClose}>
                    Login
                </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer/>
        </div>
        </>
    )
}