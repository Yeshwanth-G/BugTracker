import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { usercontext } from "../../config/useContext";
import Bug_Member from "./bug_member";
import Bug_Admin from "./bug_admin";
export default function Bug(){
    const userContext=useContext(usercontext);
    const id = userContext.user.id;
    const location=useLocation();
    const adminid=parseInt(location.state.props.adminid);
    if(id==adminid){
        return <Bug_Admin state={location.state.props}/>
    }else return <Bug_Member state={location.state.props}/>
}