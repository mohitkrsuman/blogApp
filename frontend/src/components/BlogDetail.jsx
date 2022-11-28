import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Box } from '@mui/system';
import { InputLabel, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const labelStyles = {mb:1, mt:2, fontSize: '24px', fontWeight:"bold"};

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);

  const [inputs, setinputs] = useState({
    
  });

  const handleChange = (e) => {
    setinputs((prevState)=> ({
      ...prevState,
      [e.target.name] : e.target.value
    }));
  }

  const fetchDetails = async ( ) => {
    const res = await axios.get(`http://localhost:8000/api/blog/${id}`).catch(err => console.log(err));

    const data = await res.data;
    return data;
  }

   useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog)
      setinputs({title:data.blog.title, description: data.blog.description})
    });
   }, [id]);

  const sendRequest = async () => {
    const res = axios.put(`http://localhost:8000/api/blog/update/${id}`,{
      title : inputs.title,
      description : inputs.description
    }).catch(err => console.log(err));

    const data = await res.data;
    return data;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(() => navigate("/myBlogs/"));
  }
  // console.log(blog);
  return (
    <div>
    {inputs &&
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
          >Edit Your Blog </Typography>
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
          
          <Button
            type='submit'
            sx={{mt:2, borderRadius:4, variant:"contained", color:"white", backgroundColor:"blue", ":hover":{backgroundColor:"#00008b"}}}
          >Edit</Button>
        </Box>
      </form>}
    </div>
  )
}

export default BlogDetail