
import '@mantine/core/styles.css';
import React, {useMemo, useState } from "react"
import { useToDoStores } from "../../data/stores/useToDoStores"
import InputAddTask from "../components/InputAddTask/InputAddTask"
import InputTask from "../components/InputTask/InputTask"
import FindTask from "../components/FindTask/FindTask"
import { ActionIcon, Paper, Title, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

export default function App() {

  const store = useToDoStores()
  const [filteredTask, setFelteredTasks] = useState(store.tasks)
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  useMemo(()=>{
    setFelteredTasks(store.tasks)
  },[store])

  const onFilteridTasks = ((text)=>{
    setFelteredTasks( store.tasks.filter((task) => task.title.indexOf(text) >= 0))
  })

  return (<>
      <Paper 
        shadow="md" 
        radius="md" 
        withBorder p="l"
        maw='80%'
        w='600px'
        m ='40px auto'
        px='xl'
        py='md'>
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme">
          {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
        <Title align='center' order={1}>To Do App </Title>
          <InputAddTask onAdd={(title)=> {title && store.createTask(title)}}/>
          <FindTask
          findTask={onFilteridTasks}
          />
          {!store.tasks.length && (
            <p className='toDoArticle'>There is no one task...</p>
          )}
          {filteredTask.map((task) =>(
            <InputTask
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              onDone={store.onDone}
              onEdited={store.updateTask}
              onRemove={ store.removeTask}/>
          ))}
    </Paper>
    </>)
    
}