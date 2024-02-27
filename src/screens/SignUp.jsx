import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function SignUp() {
    let [credential,setCredential]=useState({name:"",email:"",password:"",location:""})
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credential.name,
                email: credential.email,
                password: credential.password,
                location: credential.location
            })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // If signup is successful, redirect to home page
            navigate('/login');
        } else { 
            alert('Enter Valid Credentials');
        }
    }
    
    const onChange=(event)=>{
        setCredential({...credential,[event.target.name]:event.target.value})
    }
    return (
    <div>
    <div className=''>
        <Navbar/>
    </div>
        <div className='container mt-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credential.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credential.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Address</label>
                    <input type="text" className="form-control" id="location" name='location' value={credential.location}  onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
            </form>

        </div>
        </div>
    )
}
