import { replace } from "formik";
import { useContext,createContext, useState } from "react"
import { useNavigate } from "react-router-dom";
export const usercontext=createContext();
export default function ContextWrapper(props){
    const [isLoggedin,setloggedin]=useState(localStorage.getItem("user")?true:false);
    const [user,setuser]=useState(JSON.parse(localStorage.getItem("user")));
    const navigate=useNavigate();
    const login=(userdetails)=>{
        localStorage.setItem("user",JSON.stringify(userdetails));
        setuser(userdetails);
        setloggedin(true);
        navigate("/orgs",{replace:true});
        console.log("userdetails",userdetails);
    }
    const logout=()=>{
        setloggedin(false);
        setuser(null);
        localStorage.removeItem("user");
        navigate("/")
    }
    return (
        <usercontext.Provider value={{isLoggedin,login,logout,user}}>
            {props.children}
        </usercontext.Provider>
    )
}