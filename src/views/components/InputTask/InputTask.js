import { useEffect, useRef, useState } from 'react'
import { Checkbox, Flex, Title, TextInput, ActionIcon, Paper } from '@mantine/core'
import { IconSquareRoundedCheck, IconEdit, IconTrash   } from '@tabler/icons-react';
import { Link} from 'react-router-dom';

const InputTask = (({id, title, status, onDone, onEdited, onRemove}) => {
    
    const [checked, setChecked] = useState(status)
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title)
    const editTitleInputRef = useRef();
    
    useEffect(()=>{
        onDone(id , checked)
    },[checked])

    useEffect(() => {
        if (editMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [editMode]);

    return(
        <Paper>
        <Flex 
            mih={50}
            my='sm'
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="nowrap"
            p='10px 20px'>
            <Flex
                mih='60px'
                w='100%'
                gap="md"
                justify="center"
                align="center"
                direction="row"
                wrap="nowrap"
                p='10px 20px'>
                <Checkbox
                    onChange={((evt) => {
                        setChecked(evt.target.checked)
                        })}
                    checked={status}/>
                {editMode ? 
                <TextInput
                    maxLength={30}
                    w='100%'
                    ref={editTitleInputRef}
                    value={value}
                    onChange={(evt) => {
                    setValue(evt.target.value);}}
                    onKeyDown={(evt) => {
                        if(evt.key === 'Enter') {
                            onEdited(id, value);
                            setEditMode(false);
                        }}}/> 
                    :
                    <Title w='100%' order={5}>
                        <Link
                            to={`/task/${id}`}
                        >{title}</Link>
                    </Title>}
            </Flex>
                { editMode ? (
                    <ActionIcon variant="subtle" 
                    aria-label='Save'
                    color='green'
                    onClick={() => {
                        onEdited(id, value)
                        setEditMode(false)
                    }}><IconSquareRoundedCheck /></ActionIcon>
                ) : (
                <ActionIcon variant="subtle" 
                aria-label='Edit'
                onClick={() =>{
                    setEditMode(true)} 
                }><IconEdit /></ActionIcon>)}
                <ActionIcon variant="subtle" 
                aria-label='Save'
                color='red'
                onClick={() =>{
                    if(window.confirm("Are you sure?")) {
                        onRemove(id)
                }}}><IconTrash /></ActionIcon>
        </Flex>
        </Paper>
    )
})

export default InputTask