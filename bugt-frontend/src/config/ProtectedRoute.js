import { useContext, useEffect } from "react"
import { usercontext } from "./useContext"
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Heading,Box, VStack } from "@chakra-ui/react";
export default function ProtectedRoute(props){
    const {isLoggedin,user}=useContext(usercontext);
    const navigate=useNavigate();
    if(isLoggedin==false){
        return <VStack>
            <Heading>Looks like you are signed out...</Heading>
            <Button onClick={()=>{navigate("/")}} >Sign in</Button>
        </VStack>
    }
        return(
            <>
            {props.children}
            </>
        )
    
}