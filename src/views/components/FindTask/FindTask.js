import { useEffect, useState } from 'react'
import { Flex, TextInput } from '@mantine/core'

const FindTask = (({findTask}) =>{
    const [findValue, setFindValue] = useState('')
    useEffect(()=>{
        findTask(findValue)
    },[findValue])
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
                    maxLength={30}
                    w='100%' 
                    type='text'
                    placeholder='Find in title'
                    value={findValue}
                    onChange={(e)=>{setFindValue(e.target.value)}}/>
        </Flex>
    )
})

export default FindTask