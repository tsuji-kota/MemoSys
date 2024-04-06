import "./Login.css"
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Center, Text, Input, Stack, Button, Grid,GridItem} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

type LoginProps = {
  setState: (loginUserId: string , UserName: string)=> void; 
};

function Login({setState}:LoginProps) {
  const [input_user_id, setUserId] = useState("");
  const [input_password, setPassword] = useState("");
  const navigate = useNavigate();


  const clickedLogin =()=>{
      //ここにloginをチェックする処理を記載する
      //入力値がからの場合はエラーを表示する
      if(input_user_id === "" || input_password === ""){
        alert("User IDとPasswordを入力してください")
        return
      }else{
        axios({
          method: "post",
          withCredentials: true,
          url: "http://localhost:3000/login",
          data: {"user_id" : input_user_id, "password" : input_password}
         })
         .then((res)=>{
          console.log("ステータスコード:", res.status)
          console.log(res.data)

          setState(res.data.id,res.data.name)
          alert(res.data.name)
          if(res.data.name==="admin" && res.data.id===1){
            navigate('/admin')
            
          }else{
            navigate('/home',{state: {id: res.data.id, name: res.data.name}})
          }

          
         })
          .catch((error)=>{
            console.log("ステータスコード:", error.response.status)
            console.log(error.response.data)
            alert("ログインに失敗しました")
          })
      }
      
  }
    return (
        <div className='login_box'>
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
            <Input placeholder='User ID' size='md' bg=' white' value={input_user_id} onChange={(event) => setUserId(event.target.value)}/>
            <Input placeholder='Password' size='md' bg=' white' value={input_password} onChange={(event) => setPassword(event.target.value)}/>
            <Button  borderRadius="full" bg='gray'color='white' _hover={{ bg:'gray' ,color:'black'}}w='140px'  ml="auto" mr="auto" onClick={clickedLogin}>Login</Button>
          </Stack>



          </Center>
        </div>

    )
}

export default Login
