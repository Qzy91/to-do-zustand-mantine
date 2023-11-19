import { ActionIcon, Button, Flex, Loader, Paper, Text, TextInput, Textarea, useMantineColorScheme } from '@mantine/core';
import { IconArrowBackUpDouble, IconMoonStars, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToDoStores } from '../../data/stores/useToDoStores';
import { fixTime } from '../../data/utils';

const TaskPage = (()=>{
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark'
    const navigate = useNavigate()
    const {id} = useParams()
    const goBack = ()=> navigate(-1)
    const store = useToDoStores()
    const [task, setTask] = useState()
    useEffect(()=>{
        return store.tasks.map((oneTask)=>{
        if (oneTask.id === id) {
            setTask(oneTask)
        }
        })
    },[])

    const formChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setTask({...task, [name]: value})
      }

    return(
        !task ? 
        <Flex justify="center"
            align="center">
            <Loader m='30px'/>
        </Flex> :
        <Paper
            shadow="md" 
            radius="md" 
            withBorder p="l"
            maw='80%'
            w='600px'
            m ='40px auto'
            px='xl'
            py='md'>
            <Flex mih={50}
                gap="xl"
                justify="space-between"
                align="center">
                <Link onClick={goBack}><ActionIcon  variant="outline"><IconArrowBackUpDouble/></ActionIcon></Link>
                {task.status ? <Text fw={700} c='green' order={3}>Task completed</Text> : <Text fw={700} c='red' order={3}>Task still in work</Text>}
                <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme">
                {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
                </ActionIcon>
            </Flex>
            <Text fw={700} fz="sm">Created at: {fixTime(task.createdAt)}</Text>
            <TextInput
                name='title'
                maxLength={30}
                value={task.title}
                onChange={formChange}
                placeholder="Task title"
                label="Task title"/>
            <Textarea
                name='description'
                maxLength={300}
                value={task.description}
                onChange={formChange}
                placeholder="Task description"
                label="Task description"/>
            <Flex mt='md'
                gap="md">
            <Button 
                color="green"
                onClick={() => {
                    store.updateTask(id, task.title, task.description)
                    navigate(-1)}}>
                Save and exit
            </Button>
            <Button
                onClick={() => {
                    store.onDone(id, true)
                    navigate(-1)}}>
                Done
            </Button>
            <Button
                onClick={() => {
                    if(window.confirm("Are you sure?")) {
                    store.removeTask(id)
                    navigate(-1)}}}
                color="red">
                Delete
            </Button>
            </Flex>
        </Paper>
    )
})

export default TaskPage
