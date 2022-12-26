import { Button, FormControl, Box, FormLabel, Image, Input,Toast, useToast, Breadcrumb, BreadcrumbLink, Link, VStack, Flex, Spacer, InputGroup, InputRightElement, Text, ModalContent, ModalHeader, Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, useDisclosure, HStack, BreadcrumbItem } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Field, ErrorMessage, replace } from "formik";
import { useState,useContext, useEffect } from "react";
import { Form, Formik } from "formik";
import Signup from "./Signup";
import { FLogin } from "../fetchData";
import { button_styles } from "../components/button_styles";
import { useNavigate,useLocation } from "react-router-dom";
import bughome from "../assets/bughome.svg"
import * as yup from 'yup'
import { usercontext } from "../config/useContext";
const siginupSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string()
        .required('Required'),
})

export default function Login() {
    const [show, setshow] = useState(false)
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();
    const userContext=useContext(usercontext);
    const modal = (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderColor={'gray'} borderWidth={2} w={400}>
                <ModalHeader textAlign={'center'}>Register</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Signup />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
    useEffect(()=>{
        if(userContext.isLoggedin==true){
            navigate("/orgs",{replace:true})
        }
    },[])
    return (
        <HStack h='100%' spacing={60}>
            <VStack boxShadow={'0px 0px 5px'} p={10} borderRadius={10}>
                <Formik
                    initialValues={
                        {
                            email: '', password: '',
                        }

                    }
                    validationSchema={siginupSchema}
                    onSubmit={async (values) => {
                        const res = await FLogin(values.email, values.password);
                        toast({
                            title:res.messege,
                            status: res.status != 200 ? 'error' : "success",
                            isClosable: true,
                        })
                        if(res.status==200){
                            userContext.login({
                                name:res.details.name,
                                id:res.details.id
                            })
                        }
                    }}
                >
                    {({ values, isSubmitting, submitForm, handleChange, touched, errors, handleBlur }) => (
                        <Form>
                            <VStack>
                                <FormControl>
                                    <FormLabel>User id</FormLabel>
                                    <Input name='email' type='email' placeholder='Enter email' onChange={handleChange} onBlur={handleBlur}></Input>
                                    {
                                        touched.email && errors.email ? <Text color={'red'} textAlign={'end'}>{errors.email}</Text> : null
                                    }
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <InputRightElement>
                                            <Button onClick={() => { setshow(!show); }}>
                                                {show == true ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                        <Input placeholder="Enter Password" type={show == true ? 'text' : "password"} onChange={handleChange} name='password' onBlur={handleBlur} />
                                    </InputGroup>
                                    {
                                        touched.password && errors.password ? <Text color={'red'} textAlign={'end'}>{errors.password}</Text> : <p></p>
                                    }
                                </FormControl>
                                <Flex width={'100%'} pt={5}>
                                    <Button
                                        sx={button_styles}
                                        type='submit'
                                    >Login</Button>
                                    <Spacer />
                                    <Button
                                        sx={button_styles}
                                        onClick={onOpen}
                                    >Sign Up</Button>
                                </Flex>
                            </VStack>
                        </Form>
                    )}
                </Formik>
                {modal}
            </VStack>
            <Image
                boxSize={'500px'}
                src={bughome}
                alt='Dan Abramov'
            />
        </HStack>
    )
}
//format before commit
//commit messege.