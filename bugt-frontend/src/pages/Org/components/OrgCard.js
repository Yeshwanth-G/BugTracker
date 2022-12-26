import { Button,Card,CardHeader, FormControl,Heading, Box, FormLabel, Image, Input, Breadcrumb, BreadcrumbLink, Link, VStack, Flex, Spacer, InputGroup, InputRightElement, Text, ModalContent, ModalHeader, Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, useDisclosure, HStack, BreadcrumbItem } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import { getusername } from "../../bugs/components/convcard";
import { useNavigate } from "react-router-dom";
export default function OrgCard(props){
    const navigate=useNavigate();
    const [adminname,setadminname]=useState("")
    function Orgdetails(){
       navigate('/bugs',
        {state:{props}}
        );
    }
    useEffect(()=>{
        getusername(props.adminid).then((data)=>setadminname(data))
    },[])
return(
<Flex  boxShadow={'dark-lg'} rounded={'md'} p={10} flexDirection={'column'} w={'25vw'} onClick={Orgdetails} cursor={'pointer'}>
    <Heading>{props.orgname}</Heading>
    <Text  whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>
        admin:{adminname}
    </Text>
</Flex>
)
}