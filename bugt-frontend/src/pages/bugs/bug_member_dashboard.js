import { Button, 
    Heading, 
    Box, 
    Spinner,
    VStack,
    Spacer,
    ModalContent, 
    ModalHeader, 
    Modal, 
    ModalBody, 
    ModalOverlay, 
    ModalCloseButton, 
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    useDisclosure,
        HStack } from "@chakra-ui/react";
import Createbug from "./components/createbugform";
import BugCard from "./components/bugCard";
import { GetAllBugs } from "../../fetchData";
import Members from "../Org/components/Members";
import { useState,useEffect,useContext } from "react";
import Searchbug from "./components/SearchBugs";
import { useLocation } from "react-router-dom";
import { usercontext } from "../../config/useContext";
export default function Bug_Member({state}){
    const [isloading, setloading] = useState(false);
    const [allbugs, setallbugs] = useState([]);
    const [assignedbugs, setassignedbugs] = useState(null);
    const [raisedbugs, setraisedbugs] = useState(null);
    const [searchbugs,setsearch]=useState([]);
    const userContext=useContext(usercontext);
    const id = userContext.user.id;
    const name = userContext.user.name;
    const orgid=parseInt(state.orgid);
    const orgname=state.orgname;
    const adminid=parseInt(state.adminid);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: draweropen, onOpen: draweronOpen, onClose: draweronClose } = useDisclosure();
    const mclose = () => {
        fetch();
        onClose();
    }
    const modal = (
        <Modal isOpen={isOpen} onClose={mclose}>
            <ModalOverlay />
            <ModalContent borderColor={'gray'} borderWidth={2} w={400}>
                <ModalHeader textAlign={'center'}>Raise Bug</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Createbug onClose={mclose} orgid={orgid}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
    const drawer = (
        <Drawer
            isOpen={draweropen}
            placement='right'
            onClose={draweronClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Members</DrawerHeader>
                <DrawerBody>
                    <Members orgid={orgid} adminid={adminid}/>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
    const checkAssigned=(assignedArray,userid)=>{
        const temp=assignedArray.filter((x)=>x.userid==userid)
        return (temp.length!=0);
    }
    const fetch = async () => {
        setloading(true);
        var temp = await GetAllBugs(orgid);
        var assignedbugs = await temp.data.filter((x)=>(checkAssigned(x.assigned,id)));
        var raisedbugs = await temp.data.filter((x) => (x.raisedbyid == id));
        var tempallbugs = await temp.data.map((x) => (<BugCard bugtitle={x.bugtitle} bugdesc={x.bugdesc} status={x.status} raisedbyid={x.raisedbyid} updatedate={x.updatedate} orgid={orgid} orgname={orgname} adminid={adminid} assigned={x.assigned} bugid={x.bugid}></BugCard>))
        assignedbugs = await assignedbugs.map((x) => (<BugCard bugtitle={x.bugtitle} bugdesc={x.bugdesc} status={x.status} raisedbyid={x.raisedbyid} updatedate={x.updatedate}  orgid={orgid} orgname={orgname} adminid={adminid} assigned={x.assigned} bugid={x.bugid}></BugCard>));
        raisedbugs = await raisedbugs.map((x) => (<BugCard bugtitle={x.bugtitle} bugdesc={x.bugdesc} status={x.status} raisedbyid={x.raisedbyid} updatedate={x.updatedate}  orgid={orgid} orgname={orgname} adminid={adminid} assigned={x.assigned} bugid={x.bugid}></BugCard>));
        setassignedbugs(assignedbugs);
        setsearch(temp.data);
        setraisedbugs(raisedbugs);
        setsearch(temp.data);
        setallbugs(tempallbugs);
        setloading(false);
    }
    useEffect(() => {
        fetch();
    },[]);

    return (
        <VStack flex={1} w={"100%"} overflowY={'auto'} wrap={'wrap'}>
            <HStack  alignItems={'center'} paddingX={5} w={'100%'} paddingY={3}>
            <Heading size={'md'}>Hi {name} !!</Heading>
            <Spacer/>
                <Box pos={'relative'}>
                    <Searchbug allbugs={searchbugs}  adminid={adminid}/>
                </Box>
                <Button onClick={onOpen} >Raise Bug</Button>
                <Button onClick={draweronOpen}>Members</Button>
            </HStack>
            <HStack flex={1} w={'100%'} justify={'space-around'} alignItems={'flex-start'} maxH={'100%'} overflowY={'auto'} wrap={'wrap'}>
                {isloading && <Heading>{<Spinner/>}</Heading>}
                {!isloading && allbugs &&
                    <>
                        <VStack h={'80%'} padding={'2%'} rounded={'md'} borderWidth={'medium'} >
                            <Heading>All Bugs</Heading>
                            <VStack spacing={2} overflowX={'hidden'} overflowY={'auto'} p={'5%'}>
                                {allbugs}
                            </VStack>
                        </VStack>
                        <VStack h={'80%'} padding={'2%'} rounded={'md'} borderWidth={'medium'} >
                            <Heading>assignedbugs</Heading>
                            <VStack spacing={2} overflowX={'hidden'} overflowY={'auto'} p={'5%'}>
                                {assignedbugs}
                            </VStack>
                        </VStack>
                        <VStack h={'80%'} padding={'2%'} rounded={'md'} borderWidth={'medium'} >
                            <Heading>raisedbugs</Heading>
                            <VStack spacing={2} overflowX={'hidden'} overflowY={'auto'} p={'5%'}>
                                {raisedbugs}
                            </VStack>
                        </VStack>
                    </>
                }
                {modal}
                {drawer}
            </HStack>
        </VStack>


    )
}