import { Button,Card,CardHeader, FormControl,Heading, Box, FormLabel, Image, Input, Breadcrumb, BreadcrumbLink, Link, VStack, Flex, Spacer, InputGroup, InputRightElement, Text, ModalContent, ModalHeader, Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, useDisclosure, HStack, BreadcrumbItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function OrgCard(props){
    const navigate=useNavigate();
    function Orgdetails(){
       navigate('/bugs',
        {state:{props}}
        );
    }
return(
<Flex  boxShadow={'dark-lg'} rounded={'md'} p={10} flexDirection={'column'} w={'25vw'} onClick={Orgdetails} cursor={'pointer'}>
    <Heading>{props.orgname}</Heading>
    <Flex flexDir={'row'} justify={'space-around'} align={'center'} mt={2}>
    <Text>
        orgid:{props.orgid}
    </Text>
    <Text>
        adminid:{props.adminid}
    </Text>
    </Flex>
</Flex>
)
}