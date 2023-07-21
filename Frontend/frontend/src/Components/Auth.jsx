import { TextField, Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Store";
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState ({
    name:"", 
    email:"", 
    password:"",
  });

  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }));
};

const sendRequest = async (type = "login") => {
  try {
    const res = await axios.post(`http://localhost:8000/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    });

    const data = res.data;
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(inputs);

  if (isSignup) {
  sendRequest("signup")
  .then(()=>dispatch(authActions.login()))
  .then(()=>navigate("/blogs"))
  .then((data)=> console.log(data));
  } else {
    sendRequest()
    .then(()=>dispatch(authActions.login()))
    .then(()=>navigate("/blogs"))
    .then((data)=>console.log(data));
  }
};


return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
        maxWidth={400}
        display="flex"
        flexDirection={"column"}
          alignItems="center" 
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}>

          <Typography variant='h3' padding={3} textAlign="center">{isSignup ? "Signup" : "Login"}</Typography>
          {isSignup && ( <TextField name='name' onChange={handleChange} value={inputs.name} placeholder='Name' margin='normal'/>)}{""}

          <TextField name='email' onChange={handleChange}  type={'email'} value={inputs.email} placeholder='Email' margin='normal'/>

          <TextField name='password' onChange={handleChange}  type={'password'} value={inputs.password} placeholder='Password' margin='normal'/>

      <Button type='Submit' variant='contained' sx={{borderRadius: 3, marginTop: 3}} color='warning'>Submit</Button>
      <Button onClick={()=> setIsSignup(!isSignup)} sx={{ borderRadius: 3, marginTop: 3 }}>Change To {isSignup ? "Login" : "Signup"}</Button>
        </Box>
      </form>

    </div>
  )
};

export default Auth;
