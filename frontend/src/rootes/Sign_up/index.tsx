import "./Sign_up.css"
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Center, Text, Input, Stack, Button, Grid,GridItem} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


function Sign_up() {
    const [input_user_id, setUserId]  = useState<string>("");
    const [input_password, setPassword] = useState<string>("");
    const clickedSignup =()=>{
        //ここにSign upをする処理を記載する
        if(input_user_id === "" || input_password === ""){
            alert("User IDとPasswordを入力してください")
          }else{
            axios({
              method: "post",
              url: "http://localhost:3000/signup",
              data: {"user_id" : input_user_id, "password" : input_password}
             })
             .then((res)=>{
              console.log("ステータスコード:", res.status)
              console.log(res.data)
              alert("アカウントが作成されました")
             })
              .catch((error)=>{
                alert("アカウントの作成に失敗しました")
              })
          }
    }

    return (
        <div className='signup_home_box'>
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
                        <Input placeholder='User ID' size='md' bg=' white'value={input_user_id} onChange={(event) => setUserId(event.target.value)}/>
                        <Text fontSize='15px' textAlign="left"  marginTop='20px'>
                            Password
                        </Text> 
                        <Input placeholder='Password' size='md' bg=' white' value={input_password} onChange={(event) => setPassword(event.target.value)}/>
                        <Button  borderRadius="full" bg='gray'color='white' _hover={{ bg:'gray' ,color:'black'}}  w='140px' mt={20}  ml="auto" mr="auto" onClick={clickedSignup}>Sign up</Button>
                    </Stack>
                </Box>
            </Box> 
            </Center>
        </div>

    )
}

export default Sign_up
