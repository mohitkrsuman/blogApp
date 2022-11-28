import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {Box} from '@mui/material'



const items = [
   {
      name : "Random Name #1",
      description : "Probably the most random thing you have ever seen!"
   },
   {
      name : "Random Name #2",
      description : "Probably the most random thing you have ever seen!"
   },
   {
      name : "Random Name #3",
      description : "Probably the most random thing you have ever seen!"
   },
]

const Item = (props) => {
   return (
      <Box>
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>
      </Box>
   )
}

const Banner = () => {
  return (
    <div>
       <Carousel>
          {
            items.map((item, i) => <Item key={i} item={item} />)
          }
       </Carousel>
    </div>
  )
}

export default Banner