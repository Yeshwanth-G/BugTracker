import { Input, 
    InputGroup,
    InputRightElement, 
    Menu,  
    MenuButton,
    Text,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider, } from "@chakra-ui/react";
import {SearchIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from "react";
import { Form } from "formik";
import { Link, useNavigate } from "react-router-dom";

function SearchOrg({allorgs}){
    const [orgname,setorgname]=useState("");
    const [menuorgs,setmenuorgs]=useState([]);
    const handlechange=(e)=>setorgname(e.target.value);
    const navigate=useNavigate();
    const inputRef=useRef(null);
    useEffect(()=>{
        if(orgname.length){
            inputRef.current.focus();
            setmenuorgs(allorgs.filter((x)=>(x.orgname.includes(orgname))))
        }
    },[orgname]);
    const menuf=(
        <Menu isOpen={orgname.length} >
        <MenuButton onClick={null} pos={'absolute'}>
      </MenuButton>
        <MenuList maxH={"150px"} maxW={'250px'} overflow={"auto"}>
        {
        menuorgs.length?
        menuorgs.map((x)=>(
            <MenuItem onClick={()=>{
                navigate("/bugs",{state:{props:x}});
            }}>{x.orgname}</MenuItem>
        )):<MenuItem>No relevant orgs</MenuItem>
        }
      </MenuList>
        </Menu>
    )
return(
    < >
    <InputGroup >
    <Input placeholder="Search Organisations.." onChange={handlechange} value={orgname} ref={inputRef}/>
    <InputRightElement children={<SearchIcon/>} />
    </InputGroup>
    {menuf}
    </>
)
}
export default SearchOrg;