import "./Home.css"
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Box, Center, Text, Input, Stack, Button, Grid,GridItem} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TestList } from "./test";
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
  const onDragEndTest = (result :any) => {
    const items = [...testList];
    const deleteItem = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, deleteItem[0]);

    setTestList(items);
  };

  return (
    <div className="home_box">
      <h1>ドラッグアンドドロップ</h1>
      <DragDropContext onDragEnd={onDragEndTest}>
        <Droppable droppableId="droppableId">
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
                          {id}:{name}
                          
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
      </DragDropContext>
    </div>
  );
}

export default Home;