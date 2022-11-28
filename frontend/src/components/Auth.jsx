import { Box, TextField, Typography, Button } from '@mui/material'
import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  { authActions }  from '../store';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setinputs] = useState({
    name : "",
    email : "",
    password : ""
  });


  const handleChange = (e) =>{
    setinputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }));
  };
 
  const sendRequest = async (type="login") =>{
    const res =  await axios.post(`http://localhost:8000/api/user/${type}`, {
      name : inputs.name,
      email : inputs.email,
      password : inputs.password
    }).catch(err => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);
    sendRequest();
    if(isSignup){
      sendRequest("signup")
      .then((data)=> localStorage.setItem("userId", data.user._id))
      .then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs"))
      .then(data=>console.log(data));
    }else{
      sendRequest()
      .then((data)=> localStorage.setItem("userId", data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data=>console.log(data));
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
         display="flex" 
         flexDirection={'column'} 
         alignItems='center' 
         justifyContent={'center'}
         boxShadow="10px 10px 20px #ccc"
         padding={3}
         margin='auto'
         marginTop={5}
         borderRadius={5}
         maxWidth={400}
        >
          <Typography variant='h4' padding='3' textAlign='center'>{isSignup ? "Signup" : "Login"}</Typography>

          {isSignup && 
          <TextField name='name' onChange={handleChange} value={inputs.name} margin='normal' placeholder='Name' />}

          <TextField name='email' onChange={handleChange} value={inputs.email} margin='normal' placeholder='Email' />

          <TextField type="password" name='password' onChange={handleChange} value={inputs.password} margin='normal' placeholder='Password' />

          <Button type='submit' variant='contained' sx={{borderRadius:3, marginTop: 3}} color="warning">Submit</Button>

          <Button onClick={()=> setIsSignup(!isSignup)} sx={{borderRadius:3, marginTop: 2}}>Change to {isSignup ? "Login" : "Signup" }</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth