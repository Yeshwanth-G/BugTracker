import { Flex, Heading, HStack, Spacer, Text,Box, Divider, VStack, Avatar } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import moment from "moment"
import { URL } from "../../fetchData";
import { useColorModeValue } from "@chakra-ui/react";
export async function getusername(userid){
const res= await fetch(`${URL}/auth/user_name/${userid}`,{
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    },
})
const data=await res.json();
if(res.status==200)return data.name;
return userid;
}
export default function Convcard({data}){
    const [name,setname]=useState("");
    const boxbg=useColorModeValue('whatsapp.200','gray.900');
    useEffect(()=>{
        getusername(data.userid).then((data)=>setname(data))
    },[])
return(
    <VStack w={'100%'} flexDirection={'column'} >
    <HStack w={'100%'} >
        <Avatar src={`https://gravatar.com/avatar/${data.userid}?d=retro`} size='xs'/>
        <Heading size={'sm'}>{name}</Heading>
        <Spacer/>
        <Text>{moment(new Date(data.ctime)).format('lll')}</Text>
    </HStack>
    <Box w={'100%'} bg={boxbg} rounded={'md'} p={2}>
        <Text>{data.messege}</Text>
    </Box>
    <Divider mt={'5px'}/>
    </VStack>
)
}