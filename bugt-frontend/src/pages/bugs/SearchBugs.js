import { Input, 
    InputGroup,
    InputRightElement, 
    Menu,  
    MenuButton,
    MenuList,
    MenuItem,} from "@chakra-ui/react";
import {SearchIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbug({allbugs,adminid}){
    const [bugname,setbugname]=useState("");
    const [menubugs,setmenubugs]=useState([]);
    const handlechange=(e)=>setbugname(e.target.value);
    const navigate=useNavigate();
    const inputRef=useRef(null);
    useEffect(()=>{
        if(bugname.length){
            inputRef.current.focus();
            setmenubugs(allbugs.filter((x)=>(x.bugtitle.includes(bugname))))
        }
    },[bugname]);
    const menuf=(
        <Menu isOpen={bugname.length} >
        <MenuButton onClick={null} pos={'absolute'}>
      </MenuButton>
        <MenuList maxH={"150px"} maxW={'250px'} overflow={"auto"}>
        {
        menubugs.length?
        menubugs.map((x)=>(
            <MenuItem onClick={()=>{
                navigate("/bugdetails",{state:{props:{...x,adminid}}});
            }}>{x.bugtitle}</MenuItem>
        )):<MenuItem>No relevant bugs</MenuItem>
        }
      </MenuList>
        </Menu>
    )
return(
    < >
    <InputGroup >
    <Input placeholder="Search bugs.." onChange={handlechange} value={bugname} ref={inputRef}/>
    <InputRightElement children={<SearchIcon/>} />
    </InputGroup>
    {menuf}
    </>
)
}
export default Searchbug;