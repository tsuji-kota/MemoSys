import "./Home.css"
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Tag , HStack, Stack, Text, Button} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable ,DropResult} from "react-beautiful-dnd";
import { TestList } from "./test";
import { TestList2 } from "./test2";
import { TestList3 } from "./test3";
interface IdProps {
    loginUserId: string;
  }





    function Home(IdProps :IdProps) {
        const navigate = useNavigate();
        const [plan, setPlan] = useState<string>("");
        const [charge, setCharge] = useState<string>("");
        const [month, setMonth] = useState<string>("");
        const [progress, setProgress] = useState<string>("");
        const [file, setFile] = useState<File | null>(null);
        const [testList, setTestList] = useState(TestList);
        const [testList2, setTestList2] = useState(TestList2);
        const [testList3, setTestList3] = useState(TestList3);

        const onDragEndTest = (result : DropResult) => {
            console.log(result);
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
            let draggedItem;
            if (source.droppableId === "unsubmit") {
              draggedItem = testList[source.index];
            } else if (source.droppableId === "submit") {
              draggedItem = testList2[source.index];
            } else {
              draggedItem = testList3[source.index];
            }
          
            // ステートを更新するための一時リストを作成
            let newTestList = Array.from(testList);
            let newTestList2 = Array.from(testList2);
            let newTestList3 = Array.from(testList3);
          
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
          };
          
            const ClilkedIssue =()=>{
                navigate('/issue')
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
                {testList.map(({ id, name }, index) => {
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
                            <Text fontSize='20px'><a href='http://abehiroshi.la.coocan.jp/' target="_blank">{name}円</a></Text>
                                <HStack spacing='4px'>
                                    <Tag size='sm' borderRadius='full' color='gray'>
                                        5月
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        Pro+
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
              {testList2.map(({ id, name }, index) => {
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
                            <Text fontSize='20px'><a href='http://abehiroshi.la.coocan.jp/' target="_blank">{name}円</a></Text>
                                <HStack spacing='4px'>
                                    <Tag size='sm' borderRadius='full' color='gray'>
                                        5月
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        Pro+
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
              {testList3.map(({ id, name }, index) => {
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
                            <Text fontSize='20px'><a href='http://abehiroshi.la.coocan.jp/' target="_blank">{name}円</a></Text>
                                <HStack spacing='4px'>
                                    <Tag size='sm' borderRadius='full' color='gray'>
                                        5月
                                    </Tag>
                                    <Tag size='sm'borderRadius='full'  color='gray'>
                                        Pro+
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

export default Home;