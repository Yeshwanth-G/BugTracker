import { Button,Card,CardHeader, FormControl,Heading, Box, FormLabel, Image, Input, Breadcrumb, BreadcrumbLink, Link, VStack, Flex, Spacer, InputGroup, InputRightElement, Text, ModalContent, ModalHeader, Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, useDisclosure, HStack, BreadcrumbItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../../config/useContext";
import { useContext } from "react";
export function statuscolor(bugstatus){
  if(bugstatus=='NEWBUG')return 'blue'
  else if(bugstatus=='ASSIGNED')return 'yellow'
  else if(bugstatus=='RESOLVED')return 'green'
  else return 'red';
}
export default function BugCard(props){
    const navigate=useNavigate();
    console.log("Bugscard",props);
    function Orgdetails(){
       navigate('/bugdetails',
        {state:{props}}
        );}
return(
<Flex  boxShadow={'dark-lg'} rounded={'md'} flexDirection={'column'} w={'25vw'} onClick={Orgdetails} cursor={'pointer'}>
    <Flex bg={statuscolor(props.status)} w={'100%'} h={'10px'} borderRadius={'md'}></Flex>
    <Flex flexDir={'row'} justifyContent={"space-around"} pt={10} align={'center'} >
    <Heading maxW={'70%'} >{props.bugtitle}</Heading>
    <Text>
        raised by:{props.raisedbyid}
    </Text>
    </Flex>
    <Flex flexDir={'row'}  p={10} pt={0} align={'flex-start'} mt={2}>
    <Text whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>
       {props.bugdesc}
    </Text>
    </Flex>
</Flex>
)
}