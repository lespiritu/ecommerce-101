import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import CartCard from './cartCard';

export default function CartView() {
  const [cart, setCart] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cart/viewCart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setCart(response.data.result);
      });
  }, [isUpdated]);

  function deleteCartHandler(id) {
    console.log(id);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/cart/deleteProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (response.data.status === 'success') {
          setIsUpdated((previous) => !previous);
          toast.success(` ${response.data.message}`, {
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

  // This code is to order process
  function createOrder(event, quantityLocal, props) {
    event.preventDefault();

    const quantity = quantityLocal;

    if (localStorage.getItem('token')) {
      if (quantityLocal <= 0) {
        toast.error(`Error! Please input valid quantity`, {
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
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/order/createOrder/${props._id}`,
            {
              userId: props.userId,
              userEmail: props.userEmail,

              productId: props.productId,
              productName: props.productName,
              productDescription: props.productDescription,
              price: props.price,
              quantity: quantity,
              totalAmount: quantity * props.price,
              image: props.image,
            },

            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then((response) => {
            if (response.data.status === 'failed') {
              toast.error(`Error! ${response.data.message}`, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              });
            } else if (response.data.status === 'success') {
              toast.success(
                `Order has been created! Thank you for your order!`,
                {
                  position: 'top-center',
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored',
                }
              );
              setIsUpdated((previous) => !previous);
            }
          });
      }
    } else {
      toast.error(`Log in first to create an order!`, {
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
  }

  const allCart = cart.map((item, index) => (
    <CartCard
      key={index}
      {...item}
      deleteCartHandler={deleteCartHandler}
      createOrder={createOrder}
    />
  ));

  return (
    <>
      <h4 className="pt-5 ps-2 text-secondary">
        {cart.length ? 'Your Cart' : "You don't have products on your cart"}
      </h4>

      {allCart}
    </>
  );
}
