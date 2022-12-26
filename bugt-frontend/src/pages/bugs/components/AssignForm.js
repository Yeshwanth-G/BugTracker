import {
    Input, VStack, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
    Spinner,
    useToast,
    Avatar,
    Text,
    Box,
    HStack,
    Spacer,
    Button
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { GetMembers, AssignBug, UpdateStatus,GetRequestedUsers,DeleteRequest } from "../../../fetchData";
function UserCard({userid,name,email,role,onClickfn,deletefn}) {
    const boxbg = useColorModeValue('white', 'gray.900');

    return (
        <Box bg={boxbg} w={'100%'} padding={2} rounded='md' onClick={onClickfn} cursor={'pointer'}>
            <HStack>
                <Avatar src={`https://gravatar.com/avatar/${userid}?d=retro`} size='xs' />
                <Text>{name}</Text>
                {role &&
                <>
                <Spacer />
         <Text fontSize={'sm'} fontWeight={'semibold'}>{role}</Text>
                </>
                }
            </HStack>
            <Text>{email}</Text>
        <DeleteIcon cursor={'pointer'} onClick={deletefn}/>
        </Box>
    )
}
export default function AssignForm({ bugid, orgid,setstatus }) {
    const [members, setmembers] = useState(null);
    const [email, setemail] = useState("");
    const [userdetails, setuserdetails] = useState(null);
    const [selecteduser,setselected]=useState(null);
    const toast = useToast();
    const [menuitems, setmenuitems] = useState("");
    const boxbg = useColorModeValue('white', 'gray.900');
    const inputRef = useRef(null);
    const fetch = async () => {
        let res = await GetMembers(orgid);
        var req=await GetRequestedUsers(bugid);
        if(req.status==200)
        setuserdetails(req.data.map((x)=>x.user));
        if (res.status == 200) {
            setmembers(res.data);
        }
    }
    const assign_bug = async () => {
        if(selecteduser==null){
            toast({
                status: 'info',
                title: 'Select user to assign',
                isClosable: true,
            })
            return;
        }
        let res = await AssignBug(selecteduser.userid, bugid);
       let res1=await UpdateStatus(bugid,orgid,'ASSIGNED');
       await deletefromlist(selecteduser.userid);
        if (res1.status==200 && res.status == 200) {
            toast({
                status: 'success',
                title: 'Assigned successfully',
                isClosable: true,
            }
            )
        } else {
            toast({
                status: 'error',
                title: 'Failed to Assign',
                isClosable: true,
            }
            )
        }
        setstatus('ASSIGNED');
    }
    const menuf = (
        <Menu isOpen={email.length} >
            <MenuButton onClick={null} pos={'absolute'}>
            </MenuButton>
            <MenuList maxH={"150px"} maxW={'250px'} overflow={"auto"}>
                {
                    menuitems.length ?
                        menuitems.map((x) => (
                            <MenuItem onClick={() => {
                                setuserdetails([...userdetails,x]);
                                setemail("");
                            }}>{x.email}</MenuItem>
                        )) : <MenuItem>No relevant members in org</MenuItem>
                }
            </MenuList>
        </Menu>
    )
    const deletefromlist=async (userid)=>{
        setuserdetails(userdetails.filter((x)=>x.userid!=userid));
       await DeleteRequest(userid,bugid,orgid);
    }
    useEffect(() => {
        fetch();
    }, [])
    useEffect(() => {
        if (email.length != 0) {
            setmenuitems(members.filter((x) => (x.email.includes(email))))
            inputRef.current.focus();
        }
    }, [email])
    return (
        <>
            {members == null ? <Spinner></Spinner> :
                <VStack pos={'relative'}>
                    <Input placeholder="Enter user email" onChange={(e) => setemail(e.target.value)} value={email} ref={inputRef} />
                    {menuf}
                    {
                        userdetails != null &&
                        userdetails.map((userdetails)=>
                            <UserCard name={userdetails.name} email={userdetails.email} userid={userdetails.userid} onClickfn={()=>{setselected(userdetails)}} deletefn={()=>deletefromlist(userdetails.userid)}/>
                        )
                    }
                    <Button onClick={assign_bug} disabled={userdetails == null}>Assign</Button>
                </VStack>
            }
        </>
    )
}