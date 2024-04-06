import "./Home.css"
import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { Tag , HStack, Stack, Text, Button,Box, Center} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable ,DropResult} from "react-beautiful-dnd";
interface IdProps {
    loginUserId: string;
  }
interface Item {
    id: string;
    charge: string;
    issued_month: string;
    image_name: string;
    plan: string;
    progress: string;
}



function Home(IdProps :IdProps) {
        const location = useLocation();
        const navigate = useNavigate();
        const id = sessionStorage.getItem('isLogin_id');
        const name = sessionStorage.getItem('isLogin_name');
        
        const [testList, setTestList] = useState<Item[]>([]);
        const [testList2, setTestList2] = useState<Item[]>([]);
        const [testList3, setTestList3] = useState<Item[]>([]);

        const get_data = async() => {
            const formData = new FormData()
            // formData.append("id", IdProps.loginUserId)
             const user_id = sessionStorage.getItem('isLogin_id');
             const user_name = sessionStorage.getItem('isLogin_name');
             const isLogin = sessionStorage.getItem('isLogin');
             console.log("セッション",user_id)
             console.log("セッション",user_name)
             console.log("セッション",isLogin)
             if (user_id == null) {
              navigate('/')
              alert("ログインしてください")
            }else{
              formData.append("id", user_id)
            }
            
    
            await axios.post('http://localhost:3000/getdata', formData)
            .then((res) =>{
             if (!res.data || res.data.length === 0) {
              console.log('データが存在しません');
              // ユーザーにメッセージを表示する処理
            setTestList([]);
            setTestList2([]);
            setTestList3([]);
            } else {
            console.log(res.data)
            console.log("ステータスコード:", res.status)
            const test1 = res.data.filter((item: { progress: string; }) => item.progress === "unSubmit")
            const test2 = res.data.filter((item: { progress: string; }) => item.progress === "Submited")
            const test3 = res.data.filter((item: { progress: string; }) => item.progress === "Confirmed")
            setTestList(test1)
            setTestList2(test2)
            setTestList3(test3)
            console.log(test1)
            console.log(test2)
            console.log(test3)
            }})
              
            .catch((error)=>{
                console.log("ステータスコード:", error.response.status)
                console.log(error.response.data)
                alert("getdataに失敗しました")
              })
        }
        useEffect(() => {
          get_data();
          }, []);

        const onDragEndTest = (result : DropResult) => {
            // console.log(result);
            const { source, destination } = result;
          
            // ドロップ先がない場合は処理を終了
            if (!destination) {
              return;
            }
          
            // ソースとデスティネーションが同じで、位置も変わっていない場合は処理を終了
            if (
              destination.droppableId === source.droppableId &&
              destination.index === source.index
            ) {
              return;
            }
          
            // ドラッグされたアイテムを特定
            let draggedItem: Item;

            if (source.droppableId === "unsubmit") {
              draggedItem = testList[source.index];
              draggedItem.progress = "Submited"

            } else if (source.droppableId === "submit") {
              draggedItem = testList2[source.index]; 
              draggedItem.progress = "Confirmed"
            } else {
              draggedItem = testList3[source.index];
              draggedItem.progress = "unSubmit"
            }
            console.log(draggedItem) 
          
            // ステートを更新するための一時リストを作成
            let newTestList: Item[] = Array.from(testList);
            let newTestList2: Item[] = Array.from(testList2);
            let newTestList3: Item[] = Array.from(testList3);
                      
            // ソースリストからアイテムを削除
            if (source.droppableId === "unsubmit") {
              newTestList.splice(source.index, 1);
            } else if (source.droppableId === "submit") {
              newTestList2.splice(source.index, 1);
            } else {
              newTestList3.splice(source.index, 1);
            }
          
            // デスティネーションリストにアイテムを挿入
            if (destination.droppableId === "unsubmit") {
              newTestList.splice(destination.index, 0, draggedItem);
            } else if (destination.droppableId === "submit") {
              newTestList2.splice(destination.index, 0, draggedItem);
            } else {
              newTestList3.splice(destination.index, 0, draggedItem);
            }
          
            // ステートを更新
            setTestList(newTestList);
            setTestList2(newTestList2);
            setTestList3(newTestList3);
            //変更したbillのidとprogressを送信
            
            
            update_data(draggedItem.progress ,draggedItem.id );
          };
          
          const update_data = async(up_progress :string ,up_id :string) => {
            const formData = new FormData()
            // formData.append("id", IdProps.loginUserId)
            formData.append("up_progress",up_progress)
            formData.append("up_id",up_id)
            if (id == null) {
              navigate('/')
              alert("ログインしてください")
            }else{
              formData.append("user_id", id)
            }
            
    
            await axios.post('http://localhost:3000/update', formData)
            .then((res) => {
            console.log(res.data)
            console.log("update時のステータスコード:", res.status)
            
            })
            .catch((error)=>{
                console.log("ステータスコード:", error.response.status)
                console.log(error.response.data)
                alert("updateに失敗しました")
              })
        }
        const ClilkedIssue =()=>{
            navigate('/issue',{state: {id: id, name: name}})
        }

        const delete_data = async(delete_id :string) => {
          const formData = new FormData()
          formData.append("delete_id",delete_id)
  
          await axios.post('http://localhost:3000/delete', formData)
          .then((res) => {
          console.log(res.data)
          console.log("delete時のステータスコード:", res.status)
          get_data();



          })
          .catch((error)=>{
              console.log("ステータスコード:", error.response.status)
              console.log(error.response.data)
              alert("deleteに失敗しました")
            })
          }
        const deleteIsuue =(id:string)=>{
          console.log(id)
          delete_data(id);
          //消しても更新されてなかったら解除
          

        }




  return (
    <div className="home">
        <div className="issue_btn">
        <Button  borderRadius="full" bg='#454545'color='white' _hover={{ bg:'#454545' ,color:'gray'}} w='140px'  ml="auto" mr="auto" onClick={ClilkedIssue} fontSize='20px'>Issue</Button>
        </div>
    <div className="home_box">
      <DragDropContext onDragEnd={onDragEndTest}>
        <div >
            <Text fontSize='27.5' >⚫︎Unsubmit</Text>
            <Droppable droppableId="unsubmit">
            {(provided) => (
                <div
                className="testListArea"
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                {testList.map(({ id, charge, issued_month, plan,image_name}, index) => {
                    return (
                    <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                        <div
                            className="testItem"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div>
                            <Stack>
                            <Text fontSize='20px'><a href={image_name} target="_blank">{charge}円</a></Text>
                                <HStack spacing='4px'>
                                    <Tag size='sm' borderRadius='full' color='gray'>
                                        {issued_month}月
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        {plan}
                                    </Tag>
                                    
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        2024年
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='red' >
                                      
                                      <button onClick={() => deleteIsuue(id)}>×</button>
                                    </Tag>
                                </HStack>
                            </Stack>
                    
                            </div>
                        </div>
                        )}
                    </Draggable>
                    );
                })}
                {provided.placeholder}
                </div>
            )}
            </Droppable>
            <Center >
              <Stack spacing={0} width={"200px"} className="money_box">
                <Box  h='40px' backgroundColor={"#545454"} color={"white"} borderRadius={"2px"}>
                  <Text fontSize='20px'>Total price</Text>
                </Box>

              <Box  backgroundColor={"white"} h='40px' color={"#545454"} borderRadius={"2px"}>
                <Text fontSize='20px'> {testList.reduce((sum, item) => sum + parseInt(item.charge), 0)}円</Text>
              </Box>
            
              </Stack>
            </Center>
        </div>

        <div>
        <Text fontSize='27.5' >⚫︎Submited</Text>
        <Droppable droppableId="submit">
          {(provided) => (
            <div
              className="testListArea"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {testList2.map(({ id, charge, issued_month, plan,image_name}, index) => {
                    return (
                    <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                        <div
                            className="testItem"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div>
                            <Stack>
                            <Text fontSize='20px'><a href={image_name} target="_blank">{charge}円</a></Text>
                                <HStack spacing='4px'>
                                    <Tag size='sm' borderRadius='full' color='gray'>
                                        {issued_month}月
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        {plan}
                                    </Tag>
                                    
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        2024年
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='red' onClick={() => deleteIsuue(id)}>
                                        ×
                                    </Tag>
                                </HStack>
                            </Stack>
                    
                            </div>
                        </div>
                        )}
                    </Draggable>
                    );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
            <Center >
              <Stack spacing={0} width={"200px"} className="money_box">
                <Box  h='40px' backgroundColor={"#545454"} color={"white"} borderRadius={"2px"}>
                  <Text fontSize='20px'>Total price</Text>
                </Box>

              <Box  backgroundColor={"white"} h='40px' color={"#545454"} borderRadius={"2px"}>
                <Text fontSize='20px'> {testList2.reduce((sum, item) => sum + parseInt(item.charge), 0)}円</Text>
              </Box>
            
              </Stack>
            </Center>
        </div>
        <div>
        <Text fontSize='27.5' >⚫︎Confirmed</Text>
        <Droppable droppableId="complete">
          {(provided) => (
            <div
              className="testListArea"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {testList3.map(({ id, charge, issued_month, plan,image_name}, index) => {
                    return (
                    <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                        <div
                            className="testItem"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div>
                            <Stack>
                            <Text fontSize='20px'><a href={image_name} target="_blank">{charge}円</a></Text>
                                <HStack spacing='4px'>
                                    <Tag size='sm' borderRadius='full' color='gray'>
                                        {issued_month}月
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        {plan}
                                    </Tag>
                                    
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        2024年
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='red' onClick={() => deleteIsuue(id)}>
                                        ×
                                    </Tag>
                                </HStack>
                            </Stack>
                    
                            </div>
                        </div>
                        )}
                    </Draggable>
                    );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
            <Center >
              <Stack spacing={0} width={"200px"} className="money_box">
                <Box  h='40px' backgroundColor={"#545454"} color={"white"} borderRadius={"2px"}>
                  <Text fontSize='20px'>Total price</Text>
                </Box>

              <Box  backgroundColor={"white"} h='40px' color={"#545454"} borderRadius={"2px"}>
                <Text fontSize='20px'> {testList3.reduce((sum, item) => sum + parseInt(item.charge), 0)}円</Text>
              </Box>
            
              </Stack>
            </Center>
        </div>
      </DragDropContext>
    </div>
    </div>
  );
}

export default Home;