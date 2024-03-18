import "./Sign_up.css"
import React from 'react';
import { Box, Center, Text, Input, Stack, Button, Grid,GridItem} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const clickedSignup =()=>{
        //ここにSign upをする処理を記載する
        navigate('/home')
    }

    return (
        <div className='home_box'>
            <Box h='200px' >
            <Grid templateColumns='repeat(5, 1fr)' templateRows='repeat(10, 1fr)' gap={4} h='160px'>
                <GridItem colStart={2} rowStart={10} colSpan={3} h='10'  > 
                    <div className='title'>
                        <Text  color='white' fontSize='30px' >
                            Welcome to Memosys!
                        </Text>  
                    </div>               
                </GridItem>
            </Grid> 
            </Box>
            <Center>
            <Box h='430px' w='770px' color='black' bg='white' borderRadius="10px" border='solid' borderWidth={2} >
                <Box w='270px' margin='auto'>
                    <Stack spacing={3}>
                        
                        <Text fontSize='15px' textAlign="left"  marginTop='30px'>
                            USER ID（e-mail）
                        </Text> 
                        <Input placeholder='User ID' size='md' bg=' white'/>
                        <Text fontSize='15px' textAlign="left"  marginTop='20px'>
                            Password
                        </Text> 
                        <Input placeholder='Password' size='md' bg=' white'/>
                        <Button  borderRadius="full" bg='gray'color='white' _hover={{ bg:'gray' ,color:'black'}}  w='140px' mt={20}  ml="auto" mr="auto" onClick={clickedSignup}>Sign up</Button>
                    </Stack>
                </Box>
            </Box> 
            </Center>
        </div>

    )
}

export default Header
