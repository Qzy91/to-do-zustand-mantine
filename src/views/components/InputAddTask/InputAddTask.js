import { useCallback, useState } from "react"
import { Button, Flex, TextInput} from '@mantine/core';

const InputAddTask = (({onAdd})=>{
    const [inputValue, setInputValue] = useState('')
    const addTask = useCallback(()=>{
        onAdd(inputValue)
        setInputValue('')
    }, [inputValue])
    return(
    <Flex
        mih={50}
        gap="md"
        justify="center"
        align="flex-start"
        direction="row"
        wrap="nowrap"
        p='10px 20px'>
    <TextInput 
        w='100%'
        maxLength={30}
        value={inputValue}
        onChange={(e)=>{setInputValue(e.target.value)}}
        onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
                addTask();
            }}}/>
    <Button
        onClick={addTask}
        >Add</Button>
    </Flex>
    )
})

export default InputAddTask