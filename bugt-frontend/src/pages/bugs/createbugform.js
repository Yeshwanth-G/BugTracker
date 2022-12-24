import { Button, FormControl, FormLabel, Input, VStack, Flex, Spacer, InputGroup, InputRightElement, Text, ModalContent, ModalHeader, Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { usercontext } from "../../config/useContext";
import { useContext } from "react";
import * as yup from 'yup'
import { button_styles } from "../../components/button_styles";
import { bugCreate } from "../../fetchData";

const bugSchema = yup.object().shape({
    name: yup.string().required('Required'),
    desc: yup.string().required('Required'),
})
function Createbug({onClose,orgid}) {
    const toast=useToast();
    const userContext=useContext(usercontext);
    const id = userContext.user.id;
    return (
        <VStack p={5}>
            <Formik
                initialValues={
                    {
                        name:'',desc:''
                    }

                }
                validationSchema={bugSchema}
                onSubmit={async (values) => {
                    const res=await bugCreate(values.name,values.desc,id,orgid);
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
                            <FormLabel>bug Name</FormLabel>
                            <Input name='name' type='text' placeholder='Enter bug Name' onChange={handleChange} onBlur={handleBlur} value={values.name}></Input>
                            {
                                touched.name && errors.name ? <Text color={'red'}>{errors.name}</Text> : null
                            }
                        </FormControl>
                        <FormControl>
                            <FormLabel>description</FormLabel>
                            <Input name='desc' type='text' placeholder='short description' onChange={handleChange} onBlur={handleBlur} value={values.desc}></Input>
                            {
                                touched.desc && errors.desc ? <Text color={'red'}>{errors.desc}</Text> : null
                            }
                        </FormControl>
                        <Flex width={'100%'} pt={5}>
                            <Button
                            type='submit'
                            sx={button_styles}
                            >Raise</Button>
                            <Spacer />
                            <Button
                                sx={button_styles}
                                onClick={onClose}
                                >CANCEL</Button>
                        </Flex>
                </VStack>
                    </Form>
                )}
            </Formik>
        </VStack>
    )
}
export default Createbug;