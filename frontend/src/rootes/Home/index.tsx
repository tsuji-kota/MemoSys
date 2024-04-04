import "./Home.css"
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Center, Text, Input, Stack, Button, Grid,GridItem} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();


  const clickedLogin =()=>{
      navigate('/Issue')
  }
    return (
        <div className='home_box'>
          
            <Button  borderRadius="full" bg='gray'color='white' _hover={{ bg:'gray' ,color:'black'}}w='140px'  ml="auto" mr="auto" onClick={clickedLogin}>Issue</Button>

        </div>

    )
}

export default Home
