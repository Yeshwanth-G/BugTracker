import { Button, FormControl, FormLabel, Input, VStack, Flex, Spacer, InputGroup, InputRightElement, Text, ModalContent, ModalHeader, Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { CreateOrg as OrgCreate } from "../fetchData";
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as yup from 'yup'
import { FSignup } from "../fetchData";
import { button_styles } from "../components/button_styles";
import { usercontext } from "../config/useContext";
import { useContext } from "react";
const orgSchema = yup.object().shape({
    name: yup.string().required('Required'),
})
function CreateOrg({onClose}) {
    const toast=useToast();
    const userContext=useContext(usercontext);
    const id = userContext.user.id;
    const name = userContext.user.name;
    return (
        <VStack p={5}>
            <Formik
                initialValues={
                    {
                        name:''
                    }

                }
                validationSchema={orgSchema}
                onSubmit={async (values) => {
                    const res=await OrgCreate(values.name,id);
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
                            <FormLabel>Org Name</FormLabel>
                            <Input name='name' type='text' placeholder='Enter Org Name' onChange={handleChange} onBlur={handleBlur} value={values.name}></Input>
                            {
                                touched.name && errors.name ? <Text color={'red'}>{errors.name}</Text> : null
                            }
                        </FormControl>
                        <Flex width={'100%'} pt={5}>
                            <Button
                            type='submit'
                            sx={button_styles}
                            >CREATE</Button>
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
export default CreateOrg;