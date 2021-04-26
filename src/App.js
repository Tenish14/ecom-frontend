import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import "./App.css"
import TopNav from "./Navbar"
import Login from "./components/forms/Login"
import Register from "./components/forms/Register"
import jwt_decode from "jwt-decode"
import { SERVER_URL } from "./config.json"
import Item from "./components/Item"
import Slider from "./components/Slider"
import AddItems from "./components/forms/AddItems"
import Cart from "./components/forms/Cart"
import Order from "./components/forms/Order"
import { Button } from "react-bootstrap"
import Swal from "sweetalert2"
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

function App() {
  const [userData, setUserData] = useState({})
  const [token, setToken] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [items, setItems] = useState([])
  const [myCarts, setMyCarts] = useState([])
  const [cart, setCart] = useState([])
  const [myOrder, setMyOrder] = useState([])
  const [order, setOrder] = useState([])

  const getItems = () => {
    fetch(`${SERVER_URL}items`)
      .then(res => res.json())
      .then(data => setItems(data))
  }


  const getCarts = () => {
    fetch(`${SERVER_URL}carts`)
      .then(res => res.json())
      .then(data => setMyCarts(data))
  }

  const getMyCarts = () => {
    fetch(`${SERVER_URL}carts`, {
      method: 'GET',
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(data => {
        setCart(data)
        setMyCarts(data.items)
      })
  }

  const getMyOrder = () => {
    fetch(`${SERVER_URL}orders`, {
      method: 'GET',
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(data => {
        setOrder(data)
        setMyOrder(data.items)
      })
  }

  const checkOuthandler = () => {
    Swal.fire({
      title: "Are you sure you want to checkout?",
      text: "You won't be able to revert your purchase!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to checkout!"
    })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`${SERVER_URL}orders`, {
            method: 'POST',
            headers: {
              "x-auth-token": localStorage.getItem("token")
            }
          })
            .then(res => res.json())
            .then(data => {
              toast(data.msg)
            })
          getCarts()
          getMyOrder()
        }
      })
  }

  const deleteCartHandler = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete all of your cart?",
      text: "You won't be able to revert it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sure!"
    })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`${SERVER_URL}carts/empty/` + id, {
            method: 'DELETE',
            headers: {
              "x-auth-token": localStorage.getItem("token")
            }
          })
            .then(res => res.json())
            .then(data => {
              toast(data.msg)
              getCarts()
            })
        }
      })
  }

  useEffect(() => {
    getItems()
    getMyCarts()
    getMyOrder()
    getCarts()
  }, [])

  const showItem = items?.map(item => <Item key={item._id} data={item} getItems={getItems} getMyCarts={getMyCarts} />)

  const handleLogin = (user) => {
    let decoded = jwt_decode(user.token)
    setToken(user.token)
    setUserData(decoded)
    localStorage.setItem('userData', JSON.stringify(decoded))
    localStorage.setItem('token', user.token)
    setIsLogin(true)
  }

  const handleLogout = () => {
    setToken()
    setUserData({})
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
  }

  return (
    <Router>
      <div className="App">
        <TopNav userData={userData} isLogin={isLogin} handleLogout={handleLogout} />

        <Switch>
          <Route path="/Login">
            <Login handleLogin={handleLogin} token={token} />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/addItems">
            <AddItems getItems={getItems} />
          </Route>
          <Route path="/myorder">
            {
              myOrder?.length ?
                <>
                  <h3 className="text-center">My Orders</h3>
                  <h4 className=" container-fluid text-center col-md-6">Orders Date:{order.purchase_date}</h4>
                  {myOrder.map(order => <Order key={order._id} data={order} />)}
                </> :
                <h3 className="text-center">You have {myOrder?.length} Orders</h3>
            }
          </Route>
          <Route path="/Cart">
            {
              myCarts?.length ?
                <>
                  <h3 className="text-center">My Carts</h3>
                  {myCarts.map(cart => <Cart key={cart._id} data={cart} getMyCarts={getMyCarts} />)}
                  <div className="container">
                    <h3 className="text-end" >Total Amount: RM{cart.total}</h3>
                    <Button variant="outline-success" onClick={() => checkOuthandler()} className="mx-2">Checkout</Button>
                    <Button variant="outline-danger" onClick={() => deleteCartHandler(cart._id)}>Empty Cart</Button>
                  </div>
                </>
                :
                <h2 className="text-center">Your Carts is empty.</h2>
            }
          </Route>
          <Route path="/">
            <Slider />
            <h2 className="text-center">PRODUCTS</h2>
              {
                items?.length?
                <>
                <div className="row container-fluid">
                  {showItem}
                </div>
                </>:
                <h2 className="text-center">No Product avaliable</h2>
              }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
