import { Button, HStack, Input, Spinner, VStack, Box, useColorModeValue, Text, Avatar, Divider, Spacer, Heading, TagLeftIcon, useToast } from "@chakra-ui/react";
import { useEffect, useState,useContext } from "react";
import { GetMembers,AddMember,RemoveMember } from "../../../fetchData";
import { usercontext } from "../../../config/useContext";
import {DeleteIcon} from "@chakra-ui/icons"
import UserCard from "../../bugs/components/userCard";
import { useSelector } from "react-redux";
export default function Members({ orgid, adminid }) {
    const [members, setmembers] = useState(null);
    const [admindetails, setadmindetails] = useState(null);
    const [email_input,setemail_input]=useState("");
    const boxbg = useColorModeValue('white', 'gray.900');
    const {id} = useSelector((state)=>state.user.user);
    const toast=useToast();
    const fetch = async () => {
        let res = await GetMembers(orgid);
        if (res.status == 200) {
            setmembers(res.data.filter((x) => x.userid != adminid));
            setadmindetails(res.data.filter((x) => x.userid == adminid))
        }
    }
    const add_member=async (email,orgid)=>{
        const temp=await members.filter((x)=>x.email==email);
        if(temp.length!=0 || email==admindetails[0].email){
            toast({
                status:'info',
                title:'Memeber Already exists',
                isClosable:true,
            }
            )
            return;
        }
        let res=await AddMember(email,orgid);
        if(res.status==200){
            toast({
                status:'success',
                title:'Memeber added successfully',
                isClosable:true,
            }
            )
        }else{
            toast({
                status:'error',
                title:'Failed to add check email address',
                isClosable:true,
            }
            )
        }
        fetch();
    }

    const remove_member=async (userid,orgid)=>{
        let res=await RemoveMember(userid,orgid);
        if(res.status==200){
            toast({
                status:'success',
                title:'Memeber Removed successfully',
                isClosable:true,
            }
            )
        }else{
            toast({
                status:'error',
                title:'Failed to Remove',
                isClosable:true,
            }
            )
        }
        fetch();
    }
    useEffect(() => {
        fetch();
    }, [])
    return (
        <VStack>
            <HStack>
                <Input placeholder="Enter User email.address to add" value={email_input} onChange={(e)=>setemail_input(e.target.value)}/>
                <Button onClick={()=>add_member(email_input,orgid)} disabled={id!=adminid}>Add</Button>
            </HStack>
            <VStack w={'100%'}>
                {admindetails == null && <Spinner></Spinner>}
                {admindetails != null && members != null &&
                    <>
                        {admindetails.map((x) => (
                           <UserCard name={x.name} email={x.email} userid={x.userid} role={'Admin'}/>
                        ))}
                        <Divider />
                    {members.length==0?
                        <Heading fontSize={'md'}>No members</Heading>
                        :
                            members.map((x) => (
                                <Box bg={boxbg} w={'100%'} padding={2} rounded='md'>
                                    <HStack>
                                        <Avatar src={`https://gravatar.com/avatar/${x.userid}?d=retro`} size='xs' />
                                        <Text>{x.name}</Text>
                                        <Spacer />
                                    </HStack>
                                    <HStack>
                                    <Text>{x.email}</Text>
                                    <Spacer></Spacer>
                                <DeleteIcon visibility={id!=adminid?'hidden':'visible'} cursor={'pointer'} onClick={()=>remove_member(x.userid,orgid)}/>
                                    </HStack>
                                </Box>
                        ))
                           
                }


                    </>
                }
            </VStack>
        </VStack>
    )
}