import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView,setCartView]=useState(false);
  let data=useCart();
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('authToken');
    navigate('/login');
  }
  return (
    <div className='Navbar'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic; /" to="/">FoodFinder</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="nav-item navbar-nav">
              <Link className="nav-link fs-5 active" aria-current="page" to="/">Home</Link>
              {(localStorage.getItem('authToken'))?
              <Link className="nav-link fs-5 active" aria-current="page" to="/myOrder">My Orders</Link>:""
              }
            </div>
            <div className='navbar-nav ms-auto mb-2'>
            
            {(!localStorage.getItem('authToken'))?
            <div className='d-flex '>
              <Link className="btn bg-white text-danger mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-danger mx-1" to="/signup">SignUp</Link>
            </div>
              :
              <div className='d-flex '>
              <div className="btn bg-white text-danger mx-2" onClick={()=>{setCartView(true)}} >My Cart {"  "}&nbsp;<Badge pill bg='danger'> {data.length} </Badge></div>
              {cartView?<Modal onClose={()=>{setCartView(false)}}><Cart/></Modal>:null}
              <div className="btn bg-white text-danger mx-2"  onClick={handleLogout} to='/'>Logout</div>
              </div>
              }
               
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
