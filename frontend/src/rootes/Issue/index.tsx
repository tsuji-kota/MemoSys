import "./Issue.css"
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Center, Text, Select, Stack, Button, Grid,GridItem} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
interface IdProps {
    loginUserId: string;
  }
  

function Issue(IdProps : IdProps) {
    const navigate = useNavigate();
    const [plan, setPlan] = useState<string>("");
    const [charge, setCharge] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [progress, setProgress] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
        setFile(files[0]);
    }}
    const onMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(e.target.value);
    }
    const onChargeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCharge(e.target.value);
    }
    const onPlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPlan(e.target.value);
    }

 

    const onClickIssue =  async () =>{
        if(!file){
            return;
        }
        //Progressで進捗状況を管理
        setProgress("unSubmit");
        const formData = new FormData()
        formData.append("file", file)
        formData.append("plan", plan)
        formData.append("charge", charge)
        formData.append("month", month)
        formData.append("progress", progress)
        formData.append("id", IdProps.loginUserId)

        await axios.post('http://localhost:3000/issue', formData)
        .then((res) => {
        console.log(res.data)
        console.log("ステータスコード:", res.status)
        alert("Issueに成功しました")
        navigate('/home')
        })
        .catch((error)=>{
            console.log("ステータスコード:", error.response.status)
            console.log(error.response.data)
            alert("Issueに失敗しました")
          })
          
        }
    
  


    //returnにボタン配置する
    return (
        <div className='issue_box'>
            <Center>
                <Box mt='130px' h='600px' w='1240px' color='black' bg='white' borderRadius="10px" border='solid' borderWidth={2} >
                    <Stack>
                        <Box ml='75px'>
                            <div className="survey_box">
                            <Text fontSize='20px' textAlign="left"  marginTop='30px'>
                            プランを選択してください
                            </Text>
                            <Select placeholder='plan' onChange={onPlanChange} w='320px'>
                                <option value='pro'>pro</option>
                                <option value='pro+'>pro+</option>
                                <option value='nomal'>nomal</option>
                            </Select>
                       
                            <Text fontSize='20px' textAlign="left"  marginTop='30px'>
                            料金を選択してください
                            </Text>
                            <Select placeholder='charge' onChange={onChargeChange} w='320px'>
                                <option value='783'>783円</option>
                                <option value='1179'>1179円</option>
                                <option value='5767'>4840円</option>
                                <option value='5767'>5767円</option>

                            </Select>

                            <Text fontSize='20px' textAlign="left"  marginTop='30px'>
                            リソースを使用した月を選択してください
                            </Text>
                            <Select placeholder='month' onChange={onMonthChange} w='320px'>
                                <option value='1'>1月</option>
                                <option value='2'>2月</option>
                                <option value='3'>3月</option>
                                <option value='4'>4月</option>
                                <option value='5'>5月</option>
                                <option value='6'>6月</option>
                                <option value='7'>7月</option>
                                <option value='8'>8月</option>
                                <option value='9'>9月</option>
                                <option value='10'>10月</option>
                                <option value='11'>11月</option>
                                <option value='12'>12月</option>

                            </Select>
                            <Text fontSize='20px' textAlign="left"  marginTop='30px'>
                            Clabo明細ののスクショをアップロードしてください
                            </Text>

                            </div>
                            <Text fontSize='13px' textAlign="left">
                            ※対応可能な形式: img, jpg, pdf 
                            </Text>
                            <Box textAlign="left" mt='10px'>
                            <input type='file' onChange={onFileChange} />
                        </Box>
                            <Button  borderRadius="full" bg='gray'color='white' _hover={{ bg:'gray' ,color:'black'}} w='140px' mt={20}  ml="auto" mr="auto" onClick={onClickIssue}>Issue</Button>
                        </Box>
                    </Stack>
                </Box> 
            </Center>
        </div>

    )
}

export default Issue
