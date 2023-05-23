import { Button, FormControl, Heading, Box, FormLabel,Spinner, Image, Input, VStack, Flex, Spacer, InputGroup, InputRightElement, Text, ModalContent, ModalHeader, Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, useDisclosure, HStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import OrgCard from "./components/OrgCard";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { GetAllOrgs } from "../../fetchData";
import CreateOrgForm from "./components/CreateOrg";
import { usercontext } from "../../config/useContext";
import SearchOrg from "./components/searchorg";
import Login from "../Auth/LoginForm"
import { useSelector } from "react-redux";

export default function Orgainsations() {
    const [isloading, setloading] = useState(false);
    const [allorgs, setallorgs] = useState([]);
    const [yourorgs, setyourorgs] = useState(null);
    const [otherorgs, setotherorgs] = useState(null);
    const navigate=useNavigate();
    const {id,name} = useSelector((state)=>state.user.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const mclose = () => {
        fetch();
        onClose();
    }
    const modal = (
        <Modal isOpen={isOpen} onClose={mclose}>
            <ModalOverlay />
            <ModalContent borderColor={'gray'} borderWidth={2} w={400}>
                <ModalHeader textAlign={'center'}>Create Org</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <CreateOrgForm onClose={mclose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
    const fetch = async () => {
        setloading(true);
        var temp = await GetAllOrgs(id);
        var tempyourorgs = await temp.data.filter((x) => (x.adminid == id));
        var tempotherorgs = await temp.data.filter((x) => (x.adminid != id));
        tempyourorgs = await tempyourorgs.map((x) => (<OrgCard orgname={x.orgname} orgid={x.orgid} adminid={x.adminid}></OrgCard>))
        tempotherorgs = await tempotherorgs.map((x) => (<OrgCard orgname={x.orgname} orgid={x.orgid} adminid={x.adminid}></OrgCard>));
        setyourorgs(tempyourorgs);
        setotherorgs(tempotherorgs);
        setallorgs(temp.data);
        setloading(false);
    }
    useEffect(() => {
        fetch();
    }, []);
    return (
        <VStack flex={1} w={"100%"} overflowY={'hidden'} wrap={'wrap'}>
            <HStack  alignItems={'center'} paddingX={5} w={'100%'} paddingY={3}>
            <Heading size={'md'}>Hi {name} !!</Heading>
            <Spacer/>
                <Box pos={'relative'}>
                    <SearchOrg allorgs={allorgs}/>
                </Box>
                <Button onClick={onOpen} >CREATE</Button>
            </HStack>
            <HStack flex={1} w={'100%'} justify={'space-around'} alignItems={'flex-start'} maxH={'100%'} overflowY={'auto'} wrap={'wrap'}>
                {isloading && <Heading>{<Spinner/>}</Heading>}
                {!isloading && yourorgs && otherorgs &&
                    <>
                        <VStack h={'80%'} padding={'2%'} rounded={'md'} borderWidth={'medium'} >
                            <Heading>Your Organisations</Heading>
                            <Text fontSize={'sm'}>(Orgs you created)</Text>
                            <VStack spacing={2} overflowX={'hidden'} overflowY={'auto'} p={'5%'}>
                                {yourorgs}
                            </VStack>
                        </VStack>
                        <VStack h={'80%'} padding={'2%'} rounded={'md'} borderWidth={'medium'} >
                            <Heading>Other Organisations</Heading>
                            <Text fontSize={'sm'}>(Orgs you are member of)</Text>
                            <VStack spacing={2} overflowX={'hidden'} overflowY={'auto'} p={'5%'}>
                                {otherorgs}
                            </VStack>
                        </VStack>
                    </>
                }
                {modal}
            </HStack>
        </VStack>
    )
}