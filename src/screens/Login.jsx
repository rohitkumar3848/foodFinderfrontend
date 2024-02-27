import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  let [credential,setCredential]=useState({email:"",password:""})
  let navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://foodfinderbackend.onrender.com/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credential.email,
                password: credential.password,
            })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert('Enter Valid Credentials');
        }
        if (json.success) {
          localStorage.setItem("userEmail",credential.email);
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("authToken"));
          navigate('/');
      }
    }
    const onChange=(event)=>{
        setCredential({...credential,[event.target.name]:event.target.value})
    }
  return (
    <div>
    <div className=''>
        <Navbar></Navbar>
    </div>
    
    <div className='container mt-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credential.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-success">Login</button>
                <Link to='/signup' className='m-3 btn btn-danger'>I'am a new user</Link>
            </form>

        </div>
        </div>
          )
}
