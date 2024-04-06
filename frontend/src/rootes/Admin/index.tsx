import "./Admin.css"
import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { Tag , HStack, Stack, Text, Button,Select} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable ,DropResult} from "react-beautiful-dnd";
interface IdProps {
    loginUserId: string;
  }
interface Item {
    user_id: string;
    id: string;
    charge: string;
    issued_month: string;
    plan: string;
    progress: string;
}
interface Userlist{
    id: string;
    user_id: string;
}



    function Admin() {
        const location = useLocation();
        const navigate = useNavigate();
        const id = sessionStorage.getItem('isLogin_id');
        const name = sessionStorage.getItem('isLogin_name');
        
        const [userlist, setUserlist] = useState<Userlist[]>([]);
        const [testList, setTestList] = useState<Item[]>([]);
        const [testList2, setTestList2] = useState<Item[]>([]);
        const [testList3, setTestList3] = useState<Item[]>([]);
        const [plan, setPlan] = useState<string>("");
        const [selectuser, setSelectuser] = useState<string>("");
        const [month, setMonth] = useState<string>("");
        const onUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectuser(e.target.value);
        }
        const onMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setMonth(e.target.value);
        }
        const onPlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setPlan(e.target.value);
        }

        useEffect(() => {
            const data = async() => {
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

            await axios.post('http://localhost:3000/getusers', formData)
            .then((res) => {
            console.log(res.data)
            console.log("update時のステータスコード:", res.status)
            setUserlist(res.data)
            
            })
            .catch((error)=>{
                console.log("ステータスコード:", error.response.status)
                console.log(error.response.data)
                alert("updateに失敗しました")
              })
                
        
                
                
            }
            data();
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
          
            // // ステートを更新するための一時リストを作成
            // let newTestList: Item[] = Array.from(testList);
            // let newTestList2: Item[] = Array.from(testList2);
            // let newTestList3: Item[] = Array.from(testList3);
                      
            // // ソースリストからアイテムを削除
            // if (source.droppableId === "unsubmit") {
            //   newTestList.splice(source.index, 1);
            // } else if (source.droppableId === "submit") {
            //   newTestList2.splice(source.index, 1);
            // } else {
            //   newTestList3.splice(source.index, 1);
            // }
          
            // // デスティネーションリストにアイテムを挿入
            // if (destination.droppableId === "unsubmit") {
            //   newTestList.splice(destination.index, 0, draggedItem);
            // } else if (destination.droppableId === "submit") {
            //   newTestList2.splice(destination.index, 0, draggedItem);
            // } else {
            //   newTestList3.splice(destination.index, 0, draggedItem);
            // }
          
            // // ステートを更新
            // setTestList(newTestList);
            // setTestList2(newTestList2);
            // setTestList3(newTestList3);
            // //変更したbillのidとprogressを送信
            
            // update_data(draggedItem.progress ,draggedItem.id );
          };
          
          const showData = async(user_id :string, month :string, plan :string) => {
            const formData = new FormData()
            formData.append("user_id", user_id)
            formData.append("month", month)
            formData.append("plan", plan)

              await axios.post('http://localhost:3000/admin', formData)
                .then((res) =>{
                 if (!res.data || res.data.length === 0) {
                  console.log('データが存在しません');
                  // ユーザーにメッセージを表示する処理
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
        const ClilkedShow =()=>{
            showData(selectuser, month, plan)
        }

  return (
    <div className="home">
        <HStack spacing={10} pt='80px' mb='20px' pl='200px'>

            <Button  borderRadius="full" bg='#454545'color='white' _hover={{ bg:'#454545' ,color:'gray'}} w='140px'   onClick={ClilkedShow} fontSize='20px'>Show</Button>
            <Select placeholder='select_user' w='340px' backgroundColor={"white"} onChange={onUserChange}>
                {userlist.map(({ id, user_id}, index) => {
                    return (
                        <option value={id}>{user_id}</option>
                        );
                    })
                }
                    <option value='tsuji.kota@mikilab.doshisha.ac.jp'>tsuji.kota@mikilab.doshisha.ac.jp</option>
                    <option value='all'>all</option>

            </Select>

                <Select placeholder='plan' onChange={onPlanChange} w='100px' backgroundColor={"white"}>
                    <option value='all'>all</option>
                    <option value='pro'>pro</option>
                    <option value='pro+'>pro+</option>
                    <option value='nomal'>nomal</option>
                </Select>
                <Select placeholder='year' w='100px' backgroundColor={"white"}>
                    <option value='2024'>2024</option>
                    <option value='2025'>2025</option>
                    <option value='2026'>2026</option>
                    <option value='2027'>2027</option>
                    <option value='2028'>2028</option>
                    <option value='2029'>2029</option>
                
                    
          
                </Select>

                <Select placeholder='month' onChange={onMonthChange} w='100px' backgroundColor={"white"}>
                    <option value='all'>all</option>
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
            
        
        </HStack>
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
                {testList.map(({ id, charge, issued_month, plan,progress,user_id}, index) => {
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
                            <Text fontSize='20px'><a href='http://abehiroshi.la.coocan.jp/' target="_blank">{charge}円</a></Text>
                                <HStack spacing='4px'>
                                    <Tag size='sm' borderRadius='full' color='green'>
                                        {user_id}
                                    </Tag>
                                    <Tag size='sm' borderRadius='full' color='gray'>
                                        {issued_month}月
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        {plan}
                                    </Tag>
                                    
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        2024年
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
              {testList2.map(({ id, charge, issued_month, plan,progress,user_id}, index) => {
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
                            <Text fontSize='20px'><a href='http://abehiroshi.la.coocan.jp/' target="_blank">{charge}円</a></Text>
                                <HStack spacing='4px'>
                                    <Tag size='sm' borderRadius='full' color='green'>
                                        {user_id}
                                    </Tag>
                                    <Tag size='sm' borderRadius='full' color='gray'>
                                        {issued_month}月
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        {plan}
                                    </Tag>
                                    
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        2024年
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
              {testList3.map(({ id, charge, issued_month, plan,progress,user_id}, index) => {
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
                            <Text fontSize='20px'><a href='http://abehiroshi.la.coocan.jp/' target="_blank">{charge}円</a></Text>
                                <HStack spacing='4px'>
                                    <Tag size='sm' borderRadius='full' color='green'>
                                        {user_id}
                                    </Tag>
                                    <Tag size='sm' borderRadius='full' color='gray'>
                                        {issued_month}月
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        {plan}
                                    </Tag>
                                    
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        2024年
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
        </div>
      </DragDropContext>
    </div>
    </div>
  );
}

export default Admin;