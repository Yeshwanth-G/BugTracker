import { Button, FormControl, FormLabel, Input, VStack, Flex, Spacer, InputGroup, InputRightElement, Text, ModalContent, ModalHeader, Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as yup from 'yup'
import { FSignup } from "../fetchData";
import { button_styles } from "../components/button_styles";

const siginupSchema = yup.object().shape({
    password: yup.string()
        .min(2, 'Too Short!')
        .max(5, 'Too Long!')
        .required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    name: yup.string().required('Required'),
    confirm_password:yup.string().required('Required').oneOf([yup.ref('password'),null],'Passwords must match')

})
function Signup() {
    const toast=useToast();
    const [show, setshow] = useState(false)
    const [cshow,setcshow]=useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <VStack p={5}>
            <Formik
                initialValues={
                    {
                        email: '', password: '', name: '',confirm_password:''
                    }

                }
                validationSchema={siginupSchema}
                onSubmit={async (values) => {
                    const res=await FSignup(values.email,values.password,values.name);
                    toast({
                    title:res.messege,
                    status:res.status!=200?'error':"success",
                    isClosable:true,
                    })
                }}
            >
                {({ values, isSubmitting, submitForm, handleChange, touched, errors, handleBlur }) => (
                    <Form>
                        <VStack>
                        <FormControl>
                            <FormLabel>User id</FormLabel>
                            <Input name='email' type='email' placeholder='Enter email' onChange={handleChange} onBlur={handleBlur} value={values.email}></Input>
                            {
                                touched.email && errors.email ? <Text color={'red'}>{errors.email}</Text> : null
                            }
                        </FormControl>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input name='name' type='text' placeholder='Enter Your Name' onChange={handleChange} onBlur={handleBlur} value={values.name}></Input>

                            {
                                touched.name && errors.name ? <Text color={'red'}>{errors.name}</Text> : null
                            }
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <InputRightElement>
                                    <Button onClick={() => { setshow(!show);}}>
                                        {show == true ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                                <Input placeholder="Enter Password" type={show == true ? 'text' : "password"} onChange={handleChange} name='password' onBlur={handleBlur} />
                            </InputGroup>
                            {
                                touched.password && errors.password ? <Text color={'red'}>{errors.password}</Text> : null
                            }
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <InputRightElement>
                                    <Button onClick={() => { setcshow(!cshow);}}>
                                        {cshow == true ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                                <Input placeholder="Confirm Password" type={cshow == true ? 'text' : "password"} onChange={handleChange} name='confirm_password' onBlur={handleBlur} />
                            </InputGroup>
                            {
                                touched.confirm_password && errors.confirm_password ? <Text color={'red'}>{errors.confirm_password}</Text> : null
                            }
                        </FormControl>
                        <Flex width={'100%'} pt={5}>
                            <Button
                            type='submit'
                            sx={button_styles}
                            >Sign up</Button>
                            <Spacer />
                            <Button
                                sx={button_styles}
                                onClick={onClose}
                                >Cancel</Button>
                        </Flex>
                </VStack>
                    </Form>
                )}
            </Formik>
        </VStack>
    )
}
export default Signup;