import * as React from 'react'; 
import { Box, Card, CardHeader, CardMedia, CardContent, Avatar, Typography, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({title, description, imageURL, userName, isUser, id}) => {
  // console.log(title, isUser);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`)
  }
  
  const deleteRequest = async () => {
     const res = await axios.delete(`http://localhost:8000/api/blog/${id}`).catch(err => console.log(err));

     const data = res.data;
     return data;
  }

  const handleDelete = () => {
     deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs"));
    //  window.location.reload();
  }
  return (
    <Card sx={{
       width: "40%", 
       margin : 'auto', 
       mt:2, padding : 2, 
       boxShadow : "5px 5px 10px #ccc", 
       ":hover":{
          boxShadow : "10px 10px 20px #ccc",
       },
    }}>
      {isUser && (
        <Box display="flex">
           <IconButton onClick={handleEdit} sx={{marginLeft: 'auto'}}>
              <ModeEditIcon color='primary'/>
           </IconButton>
           <IconButton >
              <DeleteForeverIcon color='error' onClick={handleDelete}/>
           </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName}
          </Avatar>
        }
        title={userName}
        // subheader={new Date().toLocaleTimeString()}
        subheader={
          <Typography>{title}</Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
      />
      <CardContent>
        <hr />
        <br />
        <Typography variant="body2" color="text.secondary">
          <b>{userName}</b>  {description}
        </Typography>
      </CardContent>
    </Card>
  );
}


export default Blog;