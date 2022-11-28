import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const labelStyles = {mb:1, mt:2, fontSize: '24px', fontWeight:"bold"};

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    title : "",
    description : "",
    image : ""
  });

  const handleChange = (e) => {
    setinputs((prevState)=> ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  }

  const sendRequest = async () =>{
     const res = await axios
     .post("http://localhost:8000/api/blog/add",{
        title : inputs.title,
        description : inputs.description,
        image : inputs.image,
        user : localStorage.getItem("userId")
     }).catch(err => console.log(err));

     const data = await res.data;
     return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(() => navigate("/blogs"));

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
           border={3} 
           borderColor="blue" 
           borderRadius={3}
           boxShadow="10px 10px 20px #ccc"
           padding={5}
           margin="auto"
           display="flex"
           flexDirection="column"
           width="70%"
           marginTop={7} 
        >
          <Typography 
            marginBottom={4} 
            fontSize={35} 
            textAlign="center"
            fontWeight="bold"
            textColor="blue"
          >Post Your Blog </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField 
            name="title"
            onChange={handleChange}
            value={inputs.title} 
            margin='auto' 
            variant="outlined"/>

          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description} 
            margin='auto' 
            variant="outlined"/>

          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image} 
            margin='auto' 
            variant="outlined"/>
          
          <Button 
            type='submit'
            sx={{mt:2, borderRadius:4, variant:"contained", color:"white", backgroundColor:"blue", ":hover":{backgroundColor:"#00008b"}}}
          >Post</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog