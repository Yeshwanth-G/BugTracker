import {
    Input, VStack, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    Avatar,
    Text,
    Spacer,
    useColorModeValue,
    Spinner,
    HStack,
    Button,
    useToast
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { GetMembers, AssignBug } from "../../fetchData";
import UserCard from "./userCard";
export default function AssignForm({ bugid, orgid }) {
    const [members, setmembers] = useState(null);
    const [email, setemail] = useState("");
    const [userdetails, setuserdetails] = useState(null);
    const toast = useToast();
    const [menuitems, setmenuitems] = useState("");
    const boxbg = useColorModeValue('white', 'gray.900');
    const inputRef = useRef(null);
    const fetch = async () => {
        let res = await GetMembers(orgid);
        if (res.status == 200) {
            setmembers(res.data);
        }
    }
    const assign_bug = async () => {
        let res = await AssignBug(userdetails.userid, bugid);
        if (res.status == 200) {
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
                                setuserdetails(x);
                                setemail("");
                            }}>{x.email}</MenuItem>
                        )) : <MenuItem>No relevant members in org</MenuItem>
                }
            </MenuList>
        </Menu>
    )
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
                        userdetails != null ?
                            <UserCard name={userdetails.name} email={userdetails.email} userid={userdetails.userid} />
                            : null
                    }
                    <Button onClick={assign_bug} disabled={userdetails == null}>Assign</Button>
                </VStack>
            }
        </>
    )
}