import Form from 'react-bootstrap/Form';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

import OrderCard from './orderCard';

export default function ViewOrdersList() {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const [orderUpdated, setOrderUpdated] = useState(false);

  const [ratedDone, setRatedDone] = useState(false);

  // code for get all active orders ----------------------------
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/order/onGoingOrders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setOrders(response.data.data);
      });
  }, [orderUpdated]);
  // code for get all active orders end --------------------------

  // code for get all completed orders ----------------------------------------------
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/order/showCompletedOrders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setCompletedOrders(response.data.data);
      });
  }, [ratedDone, orderUpdated, orders]);
  // code for get all completed orders end ---------------------------------------------

  // function for recieving order ----------------------------------
  function recivedOrder(id) {
    fetch(`${process.env.REACT_APP_API_URL}/order/recievedOrder/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        // console.log(response);

        if (response.status === 'success') {
          setOrderUpdated((previous) => !previous);
          toast.success(`Order Completed! Thank you!`, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } else {
          toast.error(`Error ${response.message}!`, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
      });
  }
  // function for recieving order end ----------------------------------

  // function to rate products and order -------------------------------

  // TO BE CONTINUE HERE

  // for modal handler
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setRating(5);
    setFeedback('');
  };
  const handleShow = () => setShow(true);

  const [getId, setGetId] = useState('');
  const [rating, setRating] = useState(5);
  const [feeback, setFeedback] = useState('');

  function toRateHandler(event) {
    event.preventDefault();
    handleClose();

    fetch(
      `${process.env.REACT_APP_API_URL}/order/orderComplete/addProductRating/${getId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          rating: rating,
          feedBack: feeback,
        }),
      }
    )
      .then((data) => data.json())
      .then((response) => {
        if (response.status === 'success') {
          setRatedDone((previous) => !previous);

          toast.success(`Error ${response.message}!`, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
        if (response.status === 'failed') {
          toast.error(`Error ${response.message}!`, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
      });
  }

  // this code is for just get the id of product from order card component
  function rateProductOrder(id) {
    handleShow();
    setGetId(id);
  }

  const allOrders = orders.map((item, index) => (
    <OrderCard key={index} {...item} recivedOrder={recivedOrder} />
  ));

  const reverseOrders = allOrders.reverse();
  // const newob = [{name:'first', age:30}, {name:'2nd', age:3}, {name:'third', age:28}]
  // const new111 = newob.sort((a,b) => (b.age - a.age))
  // console.log(new111);

  // const sortedAllCompleteOrders = completedOrders.sort((a,b) => (new Date(b.OrderDate).getTime() - new Date(a.OrderDate).getTime()))
  // console.log(sortedAllCompleteOrders);

  const allCompletedOrders = completedOrders.map((item, index) => (
    <OrderCard key={index} {...item} rateProductOrder={rateProductOrder} />
  ));

  const reverseCompleteOrders = allCompletedOrders.reverse();

  return (
    <div style={{ marginTop: '50px', marginBottom: '100px' }}>
      <Tabs transition={false} id="noanim-tab-example" className="mb-3">
        <Tab eventKey="activeOrders" title="Active Orders">
          <div style={{ marginBottom: '100px' }}>
            <h2 className="text-secondary" style={{ padding: '0 10px' }}>
              Active Orders
            </h2>
            {reverseOrders}
          </div>
        </Tab>
        <Tab eventKey="completedOrders" title="Completed Orders">
          <div style={{ marginBottom: '100px' }}>
            <h2 className="text-secondary" style={{ padding: '0 10px' }}>
              Completed Orders
            </h2>
            {reverseCompleteOrders}
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Rating and Feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(event) => toRateHandler(event)}
                className="col-12"
                variant="dark"
              >
                <Form.Group className="mb-3" controlId="formBasicPrice">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    max={5}
                    min={1}
                    type="number"
                    placeholder="Rate from 1 to 5"
                    required
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Comment your feedback here"
                    required
                    value={feeback}
                    onChange={(event) => setFeedback(event.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="secondary">
                  Submit Rating
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </Tab>
      </Tabs>
    </div>
  );
}
