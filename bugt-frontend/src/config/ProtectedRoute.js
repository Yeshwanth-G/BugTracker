import { useContext, useEffect } from "react"
import { usercontext } from "./useContext"
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Heading,Box, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
export default function ProtectedRoute(props){
    const {user,isLoggedin} = useSelector((state)=>state.user);
    const {id,name}=user
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