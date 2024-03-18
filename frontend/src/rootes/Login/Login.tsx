import "./Login.css"
import React, { useState } from 'react';
import { Box, Center, Text, Input, Stack, Button, Grid,GridItem} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const clickedLogin =()=>{
      //ここにloginをチェックする処理を記載する
      navigate('/home')
  }
    return (
        <div className='home_box'>
          <Center  h='500px' color='white'>
            <div className="title">
              <Stack spacing={20}>
                  <Grid templateColumns='repeat(10, 1fr)' gap={4} h='160px'>
                    <GridItem colStart={2} colSpan={7} h='10'  >                
                      <Text fontSize='140px' color='white'>
                      Memosys
                      </Text>
                    </GridItem>
                  </Grid> 
                <Grid templateColumns='repeat(10, 1fr)' gap={4} h='30px'>
                  <GridItem colStart={6} colSpan={4} h='10'  >                
                    <Text fontSize='25px' color='white'>
                      Money Management system for ISDL
                    </Text>
                </GridItem>
                </Grid>         
              </Stack>
            </div>
          </Center>
          <Center  h='150px'>
          <Stack spacing={4}>
            <Input placeholder='User ID' size='md' bg=' white'/>
            <Input placeholder='Password' size='md' bg=' white'/>
            <Button  borderRadius="full" bg='gray'color='white' _hover={{ bg:'gray' ,color:'black'}}w='140px'  ml="auto" mr="auto" onClick={clickedLogin}>Login</Button>
          </Stack>



          </Center>
        </div>

    )
}

export default Header
