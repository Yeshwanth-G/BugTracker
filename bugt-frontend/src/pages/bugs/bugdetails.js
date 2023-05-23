import {
    Heading,
    Text, Box, Button, Textarea, Avatar,
    ModalContent,
    ModalHeader,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalCloseButton, VStack, HStack, Spacer, Flex, Divider, useColorModeValue, useDisclosure, useToast, Input
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { statuscolor } from "./components/bugCard";
import { button_styles } from "../../components/button_styles";
import { useEffect, useState } from "react";
import { GetAssignedUsers, GetMesseges,PutRequest } from "../../fetchData";
import { usercontext } from "../../config/useContext";
import { useContext } from "react";
import AssignForm from "./components/AssignForm";
import { getusername } from "./components/convcard";
import { UpdateStatus } from "../../fetchData";
import { Postmsg } from "../../fetchData";
import Convcard from "./components/convcard";
import UserCard from "./components/userCard";
import { useSelector } from "react-redux";

export default function BugDetails() {
    const location = useLocation();
    const boxbg = useColorModeValue('whatsapp.200', 'gray.900')
    const btnbg = useColorModeValue('gray.900', 'whatsapp.200')
    const [msg, setmsg] = useState('');
    const [conv, setconv] = useState([]);
    const [raisedname, setraisedname] = useState("");
    const data=location.state.props;
    const [cstatus,setstatus]=useState(data.status);
    const [assigned_users, setassignedusers] = useState([]);
    const userContext = useContext(usercontext);
    const {id:userid}=useSelector((state)=>state.user.user)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
   
    const fetch = async () => {
        let messeges = await GetMesseges( data.bugid);
        if (messeges.status == 200) {
            messeges = messeges.data;
            const temp = await messeges.map((x) => <Convcard data={x} key={x.cid}></Convcard>)
            setconv(temp);
        }
        let temp = await GetAssignedUsers(data.bugid);
        if (temp.status == 200) {
            setassignedusers(temp.data);
        }
    }
    const mclose = () => {
        fetch();
        onClose();
    }
    useEffect(() => {
        fetch();
        getusername(data.raisedbyid).then((data) => setraisedname(data))
    }, [])
    const addmsg = async () => {
        let res = await Postmsg(userid, data.bugid, msg);
        setmsg("");
        if (res.status != 200) {
            toast({
                title: 'server error',
                status: 'error',
                isClosable: true,
            })
        } else
            fetch();
    }

    const updatestatus=async (newstatus)=>{
       let res= await UpdateStatus(data.bugid,data.orgid,);
       if (res.status == 200) {
        toast({
            status: 'success',
            title: 'Marked as Resolved',
            isClosable: true,
        }
        )
    } else {
        toast({
            status: 'error',
            title: 'Failed to Mark as Resolve',
            isClosable: true,
        }
        )
    }
    setstatus(newstatus);
}
const request=async ()=>{
    let res= await PutRequest(data.orgid,data.bugid,userid);
       if (res.status == 200) {
        toast({
            status: 'success',
            title: 'Request Sent',
            isClosable: true,
        }
        )
    } else {
        toast({
            status: 'error',
            title: 'Failed to Send',
            isClosable: true,
        }
        )
    }
}

    const checkAssigned = (assignedArray, userid) => {
        if(cstatus!="ASSIGNED")return false;
        return (assignedArray.filter((x) => x.userid == userid).length) != 0
    }

    const modal = (
        <Modal isOpen={isOpen} onClose={mclose}>
            <ModalOverlay />
            <ModalContent borderColor={'gray'} borderWidth={2} w={400}>
                <ModalHeader textAlign={'center'}>Assign</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <AssignForm orgid={data.orgid} bugid={data.bugid} setstatus={setstatus}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
    return (
        <VStack w={'100%'} p={5} alignSelf={'flex-start'} flex={1} alignItems={'flex-start'} overflowY={'scroll'} spacing={'2'} pos={'relative'}>
            <HStack w={'100%'} >
                <Flex align={'center'}>
                    <Heading paddingRight={2}>{data.bugtitle} </Heading>
                    <Box borderRadius={'50%'} h='10px' w='10px' bg={statuscolor(cstatus)}></Box>
                </Flex>
                <Spacer />
{/*   NEWBUG
  ASSIGNED
  RESOLVED
  REJECTED */}
                {
                    cstatus == "REJECTED" && data.adminid ==userid && <Button sx={button_styles} onClick={()=>updatestatus("NEWBUG")}>Rollback</Button>
                }
                {
                    cstatus!="REJECTED" &&
                <>
                {
                    data.adminid==userid && cstatus=='NEWBUG' ? <Button sx={button_styles} onClick={()=>updatestatus("REJECTED")}>Reject</Button>:null
                }
                {
                    (data.adminid != userid && cstatus !='RESOLVED' &&  !checkAssigned(data.assigned, userid)) ? <Button sx={button_styles} onClick={request}>Request</Button> : ((cstatus != 'RESOLVED' && data.adminid==userid) ? <Button sx={button_styles} onClick={onOpen}>Assign</Button> : null)
                }
                { 
                    (data.adminid == userid && cstatus != 'RESOLVED' && cstatus!="REJECTED") ? <Button sx={button_styles} onClick={()=>updatestatus("RESOLVED")}>Mark as Resolved</Button> : null
                }
                </>
            }
            </HStack>
            <Flex w={'50%'} bg={boxbg} p={2} rounded='md' flexDirection={'column'}>
                <Heading size={'sm'} py={2}>Description:</Heading>
                <Text>
                    {data.bugdesc}
                </Text>
                <Text>The current status of the bug is '{cstatus.toLowerCase()}'.</Text>
            </Flex>
            <VStack w={'50%'} align='center'>
                <Divider mt={'8px'} />
                {conv}
            </VStack>
            <Textarea w={'50%'} placeholder='Enter Messege...' value={msg} onChange={(e) => setmsg(e.target.value)} />
            <Button sx={button_styles} flexShrink={0} onClick={addmsg} disabled={data.adminid != userid && !checkAssigned(data.assigned, userid)}>Send</Button>
            <VStack pos={'absolute'} right={'5%'} top={'10%'} p={2}>
                <HStack>
                    <Heading size={'sm'}>Raised by:</Heading>
                    <Avatar src={`https://gravatar.com/avatar/${data.raisedbyid}?d=retro`} size='xs' />
                    <Heading size={'sm'} >{raisedname}</Heading>
                </HStack>
                {assigned_users.length != 0 &&
                    <>
                        <Heading size={'sm'} alignSelf={'flex-start'}>Assigned to:</Heading>
                        {assigned_users.map((x) => (
                            <UserCard userid={x.userid} name={x.name} email={x.email}/>
                        ))
                        }
                    </>
                }
            </VStack>
            {modal}
        </VStack>
    )
}