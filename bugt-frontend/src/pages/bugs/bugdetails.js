import { Heading, Text, Box, Button, Input, Textarea,Avatar, ButtonGroup, VStack, HStack, Spacer, Flex, Divider, useColorModeValue, useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { statuscolor } from "./bugCard";
import { button_styles } from "../../components/button_styles";
import { useEffect, useState } from "react";
import { GetMesseges } from "../../fetchData";
import { usercontext } from "../../config/useContext";
import { useContext } from "react";
import { getusername } from "./convcard";
import { Postmsg } from "../../fetchData";
import Convcard from "./convcard";
export default function BugDetails() {
    const location = useLocation();
    console.log("state",location.state);
    const boxbg=useColorModeValue('whatsapp.200','gray.900')
    const btnbg=useColorModeValue('gray.900','whatsapp.200')
    const [msg, setmsg] = useState('');
    const [conv, setconv] = useState([]);
    const [raisedname,setraisedname]=useState("");
    const userContext=useContext(usercontext);
    const userid = userContext.user.id;
    const toast=useToast()
    const data = location.state.props;
    const fetch = async () => {
        let messeges = await GetMesseges(data.bugid);
        console.log(messeges);
        if (messeges.status == 200) {
            messeges = messeges.data;
            const temp = await messeges.map((x) => <Convcard data={x} key={x.cid}></Convcard>)
            setconv(temp);
        }
    }
    useEffect(() => {
        fetch();
       getusername(data.raisedbyid).then((data)=>setraisedname(data))
       console.log(raisedname);
    }, [])
    const addmsg=async ()=>{
        let res=await Postmsg(userid,data.bugid,msg);
        console.log(res);
        setmsg('');
        if(res.status!=200){
            toast({
                title:'server error',
                status:'error',
                isClosable:true,
            })
        }else
        fetch();
    }
    return (
        <VStack w={'100%'} p={5} alignSelf={'flex-start'} flex={1} alignItems={'flex-start'} overflowY={'scroll'} spacing={'2'} pos={'relative'}>
            <HStack w={'100%'} >
                <Flex align={'center'}>
                    <Heading paddingRight={2}>{data.bugtitle} </Heading>
                    <Box borderRadius={'50%'} h='10px' w='10px' bg={statuscolor(data.status)}></Box>
                </Flex>
                <Spacer />
                {
                    (data.status == 'NEWBUG' && data.adminid != userid) ? <Button  sx={button_styles}>Request</Button> : ((data.status != 'RESOLVED') ? <Button sx={button_styles}>Assign</Button> : null)
                }
                {
                    (data.adminid == userid && data.status != 'RESOLVED') ? <Button  sx={button_styles} >Mark as Resolved</Button> : null
                }
            </HStack>
            <Flex w={'50%'} bg={boxbg} p={2} rounded='md' flexDirection={'column'}>
                <Heading size={'sm'} py={2}>Description:</Heading>
                <Text>
                    {data.bugdesc}This bug is raised by {data.raisedbyid}.{(data.status == 'ASSIGNED') ? `This bug is currently assigned to ${data.assignedid}.` : `The current status of the bug is ${data.status.toLowerCase()}.`}
                </Text>
            </Flex>
            <VStack w={'50%'} align='center'>
                <Divider mt={'8px'} />
                {conv}
            </VStack>
            <Textarea w={'50%'} placeholder='Enter Messege...' value={msg} onChange={(e) => setmsg(e.target.value)} />
            <Button sx={button_styles} flexShrink={0} onClick={addmsg} disabled={data.adminid!=id&&data.assignedid!=id}>Send</Button>
        <HStack pos={'absolute'} right={'5%'} top={'10%'}>
        <Heading size={'sm'}>Raised by:</Heading>
        <Avatar src={`https://gravatar.com/avatar/${data.raisedbyid}?d=retro`} size='xs'/>
        <Heading size={'sm'} >{raisedname}</Heading>
    </HStack>
        </VStack>
    )
}