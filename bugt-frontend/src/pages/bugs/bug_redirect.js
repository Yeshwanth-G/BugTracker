import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { usercontext } from "../../config/useContext";
import Bug_Member from "./bug_member_dashboard";
import Bug_Admin from "./bug_admin_dashboard";
import { useSelector } from "react-redux";
export default function Bug(){
    const {id,name} = useSelector((state)=>state.user.user);
    const location=useLocation();
    const adminid=parseInt(location.state.props.adminid);
    if(id==adminid){
        return <Bug_Admin state={location.state.props}/>
    }else return <Bug_Member state={location.state.props}/> 
}