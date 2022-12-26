import {
    Button,
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
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Menu,  
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    HStack
} from "@chakra-ui/react";
import Createbug from "./createbugform";
import BugCard from "./bugCard";
import Members from "../Members";
import { GetAllBugs,GetRequests } from "../../fetchData";
import { useState, useEffect, useContext } from "react";
import Searchbug from "./SearchBugs";
import { usercontext } from "../../config/useContext";
import { useNavigate } from "react-router-dom";
export default function Bug_Admin({ state }) {
    const [isloading, setloading] = useState(false);
    const [allbugs, setallbugs] = useState([]);
    const [searchbugs, setsearch] = useState([]);
    const [requests,setrequests]=useState([]);
    const [pendingbugs, setpendingbugs] = useState(null);//pendingbugs
    const [newbugs, setnewbugs] = useState(null);//newbugs
    const userContext = useContext(usercontext);
    const id = userContext.user.id;
    const name = userContext.user.name;
    const orgid = parseInt(state.orgid);
    const orgname = state.orgname;
    const navigate=useNavigate();
    const adminid = parseInt(state.adminid);
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
                    <Createbug onClose={mclose} orgid={orgid} />
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

    const menuf=(
        <Menu>
        <MenuButton as={Button}>
        Requests
      </MenuButton>
        <MenuList maxH={"150px"} maxW={'250px'} overflow={"auto"}>
        {
        requests.length?
        requests.map((x)=>(
            <MenuItem onClick={()=>{
                navigate("/bugdetails",{state:{props:{...x.bug,adminid}}});
            }}>{x.user.name} has requested for {x.bug.bugtitle}</MenuItem>
        )):<MenuItem>No Requests</MenuItem>
        }
      </MenuList>
        </Menu>
    )

    const fetch = async () => {
        setloading(true);
        var temp = await GetAllBugs(orgid);
        var req=await GetRequests(orgid);
        if(req.status==200)
        setrequests(req.data);
        var pendingbugs = await temp.data.filter((x) => (x.status == "ASSIGNED"));
        var newbugs = await temp.data.filter((x) => (x.status == "NEWBUG"));
        var tempallbugs = await temp.data.map((x) => (<BugCard bugtitle={x.bugtitle} bugdesc={x.bugdesc} status={x.status} raisedbyid={x.raisedbyid} updatedate={x.updatedate} orgid={orgid} orgname={orgname} adminid={adminid} assigned={x.assigned} bugid={x.bugid}></BugCard>))
        pendingbugs = await pendingbugs.map((x) => (<BugCard bugtitle={x.bugtitle} bugdesc={x.bugdesc} status={x.status} raisedbyid={x.raisedbyid} updatedate={x.updatedate} orgid={orgid} orgname={orgname} adminid={adminid} assigned={x.assigned} bugid={x.bugid}></BugCard>));
        newbugs = await newbugs.map((x) => (<BugCard bugtitle={x.bugtitle} bugdesc={x.bugdesc} status={x.status} raisedbyid={x.raisedbyid} updatedate={x.updatedate} orgid={orgid} orgname={orgname} adminid={adminid} assigned={x.assigned} bugid={x.bugid}></BugCard>));
        setpendingbugs(pendingbugs);
        setnewbugs(newbugs);
        setallbugs(tempallbugs);
        setsearch(temp.data);
        setloading(false);
    }
    useEffect(() => {
        fetch();
    }, []);
    return (
        <VStack flex={1} w={"100%"} overflowY={'auto'} wrap={'wrap'}>
            <HStack alignItems={'center'} paddingX={5} w={'100%'} paddingY={3}>
                <Heading size={'md'}>Hi {name} !!</Heading>
                <Spacer />
                <Box pos={'relative'}>
                    <Searchbug allbugs={searchbugs} adminid={adminid} />
                </Box>
                {menuf}
                <Button onClick={onOpen} >Raise Bug</Button>
                <Button onClick={draweronOpen}>Members</Button>
            </HStack>
            <HStack flex={1} w={'100%'} justify={'space-around'} alignItems={'flex-start'} maxH={'100%'} overflowY={'auto'} wrap={'wrap'} >
                {isloading && <Heading>{<Spinner />}</Heading>}
                {!isloading && allbugs &&
                    <>
                        <VStack h={'80%'} padding={'2%'} rounded={'md'} borderWidth={'medium'} >
                            <Heading>All Bugs</Heading>
                            <VStack spacing={2} overflowX={'hidden'} overflowY={'auto'} p={'5%'}>
                                {allbugs}
                            </VStack>
                        </VStack>
                        <VStack h={'80%'} padding={'2%'} rounded={'md'} borderWidth={'medium'} >
                            <Heading>pendingbugs</Heading>
                            <VStack spacing={2} overflowX={'hidden'} overflowY={'auto'} p={'5%'}>
                                {pendingbugs}
                            </VStack>
                        </VStack>
                        <VStack h={'80%'} padding={'2%'} rounded={'md'} borderWidth={'medium'} >
                            <Heading>newbugs</Heading>
                            <VStack spacing={2} overflowX={'hidden'} overflowY={'auto'} p={'5%'}>
                                {newbugs}
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