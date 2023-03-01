import { BsFillStarFill as IconStar } from 'react-icons/bs';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import './viewProduct.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import UserContext from '../context/userContext';
import { useContext } from 'react';

export default function ViewProduct() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const defaultImage =
    'https://res.cloudinary.com/dbed2fwkj/image/upload/v1676939796/samples/ecommerse101-sample/default_jxvmvn.png';

  const { productId } = useParams();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [images, setImages] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [primaryImage, setPrimaryImage] = useState(defaultImage);

  // local inputs
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/product/productIdActive/${productId}`
      )

      .then((response) => {
        // console.log(response.data);
        if (response.data.status === 'success') {
          setProductName(response.data.result.productName);
          setCategory(response.data.result.category);
          setPrice(response.data.result.price);
          setStocks(response.data.result.stocks);
          setProductDescription(response.data.result.productDescription);
          setImages(response.data.result.images);
          setPrimaryImage(response.data.result.images[0]);
          setRatings(response.data.result.ratings);
        } else {
          navigate('/*');
        }
      });
  }, [productId, navigate]);

  // This code is for changing the image
  function changePrimaryImage(image) {
    setPrimaryImage(image);
  }

  // This code is to order process
  function createOrder() {
    if (localStorage.getItem('token')) {
      if (quantity <= 0) {
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
            `${process.env.REACT_APP_API_URL}/order/createOrderProduct/${productId}`,
            {
              userId: user._id,
              userEmail: user.email,

              productId: productId,
              productName: productName,
              productDescription: productDescription,
              price: price,
              quantity: quantity,
              totalAmount: quantity * price,
              image: primaryImage,
            },

            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then((response) => {
            // console.log(response);
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

              setQuantity(1);
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

  /// ============== Add to Cart function ===============================
  function addToCartHandler() {
    if (localStorage.getItem('token')) {
      if (quantity <= 0) {
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
            `${process.env.REACT_APP_API_URL}/cart/addToCart/${productId}`,
            {
              userId: user._id,
              userEmail: user.email,

              productId: productId,
              productName: productName,
              productDescription: productDescription,
              price: price,
              quantity: quantity,
              totalAmount: quantity * price,
              image: primaryImage,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then((response) => {
            // console.log(response);
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
              toast.success(`${response.data.message}`, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              });

              setQuantity(1);
            }
          });
      }
    } else {
      toast.error(`Log in first to add product to cart!`, {
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
  /// ============== Add to Cart function End ===============================
  const renderRatings = ratings.map((item, index) => {
    return (
      <Row key={index} className="col-12 mx-auto mt-2 customer-rating">
        <div className="star-Rating">
          {[...Array(item.rating).keys()].map((index) => (
            <IconStar key={index} />
          ))}
        </div>
        <p>{item.userAccount}</p>
        <p>{item.feedBack}</p>
      </Row>
    );
  });

  const reverseRatings = renderRatings.reverse();
  return (
    <Container className="product-view">
      <Row className=" py-4 ">
        <Col className="p-2 mt-4 col-12 col-md-6  col-xl-5">
          <img
            className="w-100 border"
            src={primaryImage ?? defaultImage}
            alt=""
          />
          <Row className="mt-2">
            <Col className="thumbnailImages">
              <img
                onClick={() => changePrimaryImage(images[0])}
                className="w-100 border"
                src={images[0] ?? defaultImage}
                alt={productName}
              />
            </Col>
            <Col className="thumbnailImages">
              <img
                onClick={() => changePrimaryImage(images[1])}
                className="w-100 border"
                src={images[1] ?? defaultImage}
                alt={productName}
              />
            </Col>
            <Col className="thumbnailImages">
              <img
                onClick={() => changePrimaryImage(images[2])}
                className="w-100 border"
                src={images[2] ?? defaultImage}
                alt={productName}
              />
            </Col>
            <Col className="thumbnailImages">
              <img
                onClick={() => changePrimaryImage(images[3])}
                className="w-100 border"
                src={images[3] ?? defaultImage}
                alt={productName}
              />
            </Col>
          </Row>
        </Col>

        <Col className="p-2 mt-4 col-12 col-md-6 col-xl-7 ">
          <Row className="col-12 mx-auto">
            <h4>{productName}</h4>
            <p>{category}</p>
            <p>Price: ₱{price}</p>

            <p>Stocks: {stocks}</p>
          </Row>

          <Row className="col-12 mx-auto">
            <Form className="" variant="dark">
              <Row className="quantity-controler">
                <Col className="col-4">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                className="me-2"
                variant="dark"
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
              <Button onClick={createOrder} className="me-2" variant="dark">
                Buy Now
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
      <Row className="col-12 mx-auto">
        <h4>Product Description</h4>
        <p>{productDescription}</p>
      </Row>

      {ratings.length ? (
        <Row className="col-12 mx-auto ">
          <h4>Customer Ratings</h4>
          {ratings.length ? (
            reverseRatings
          ) : (
            <p>This product don't have ratings yet!</p>
          )}
        </Row>
      ) : null}
    </Container>
  );
}
