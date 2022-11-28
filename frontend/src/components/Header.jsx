import React from 'react';
import {AppBar, Typography, Toolbar, Box, Button, Tabs, Tab} from '@mui/material';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
  const dispatch = useDispatch();
  const [value, setvalue] = useState(); 
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <AppBar   
      position = "sticky" 
      sx={{
      background: "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%);"
    }}>
      <Toolbar>
         <Typography variant='h6'>BLOGIT</Typography>
         {isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
            <Tabs textColor='inherit' value={value} onChange={(e, val)=> setvalue(val)}>
                <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"/>
            </Tabs>
         </Box>}

         <Box display="flex" marginLeft="auto">
            {!isLoggedIn && 
              <>
              <Button 
               LinkComponent={Link} 
               to="/auth"
               variant= 'contained' 
               sx={{margin: 1, borderRadius: 6}} color="secondary">Login</Button>
               <Button 
               variant= 'contained'  
               sx={{margin: 1, borderRadius: 6}} color="secondary">SignUp</Button>
              </>
            }

            {isLoggedIn && (
              <Button 
              onClick={()=>dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/auth"
              variant= 'contained' 
              sx={{margin: 1, borderRadius: 6}} color="secondary">Logout</Button>
           )}
         </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header