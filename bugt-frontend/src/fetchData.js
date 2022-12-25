export const URL='http://localhost:8000'
//--Auth--
export async function FLogin(email,password){
   let res= await fetch(`${URL}/auth/login`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(
            {
                email,
                password,
            }
        )
   })
        const data=await res.json(); 
        if(res.status==200)
        return {messege:data.messege,status:res.status,details:{name:data.name,id:data.id}};
        return {messege:data.messege,status:res.status};
    }
export async function FSignup(email,password,name){
   let res= await fetch(`${URL}/auth/signup`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(
            {
                email,
                password,
                name,
            }
        )
   })
        const data=await res.json(); 
        return {messege:data.messege,status:res.status};
}

// --Organisations
export async function GetAllOrgs(id){

let res=await fetch(`${URL}/orgs/${id}`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json',
    },
})
const data=await res.json();
if(res.status!=200) return {messege:data.messege,status:res.status}
return {data:data.allorgs,status:res.status};
} 

export async function CreateOrg(orgname,id){
   
    let res=await fetch(`${URL}/orgs/create/${id}`,{
        method:'POST',
        body:JSON.stringify(
            {
                orgname
            }
        ),
        headers:{
            'Content-Type': 'application/json',
        },
    })
    const data=await res.json();
    return {messege:data.messege,status:res.status};
    }

export async function GetMembers(orgid){
    let res=await fetch(`${URL}/orgs/members/${orgid}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
    })
    const data=await res.json();
    return {data:data.data,status:res.status};
}

export async function AddMember(email,orgid){
    console.log("Addmember",email,orgid);
    let res=await fetch(`${URL}/orgs/members/${orgid}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email,
        })
    })
    const data=await res.json();
    return {data:data.messege,status:res.status};
}

export async function RemoveMember(userid,orgid){
    let res=await fetch(`${URL}/orgs/members/remove/${orgid}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            userid,
        })
    })
    const data=await res.json();
    return {data:data.messege,status:res.status};
}

// --Bugs
export async function GetAllBugs(orgid){
   
    let res=await fetch(`${URL}/bugs/all/${orgid}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    })
    const data=await res.json();
    if(res.status!=200)return {messege:data.messege,status:res.status}
    return {data:data.bugsarray,status:res.status};
}

export async function bugCreate(bugtitle,bugdesc,userid,orgid)
{
    
    let res=await fetch(`${URL}/bugs/create/${userid}/${orgid}`,{
        method:'POST',
        body:JSON.stringify(
            {
                bugtitle,
                bugdesc,
            }
        ),
        headers:{
            'Content-Type': 'application/json',
        },
    })
    const data=await res.json();
    return {messege:data.messege,status:res.status};
    }

export async function GetMesseges(bugid){
    let res=await fetch(`${URL}/bugs/conv/${bugid}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    })
    const data=await res.json();
    if(res.status!=200)return {messege:data.messege,status:res.status}
    return {data:data.messege,status:res.status};
}
export async function AssignBug(userid,bugid){
    let res=await fetch(`${URL}/bugs/assign/${userid}/${bugid}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
    })
    const data=await res.json();
    return {messege:data.messege,status:res.status};
}

export async function GetAssignedUsers(bugid){
    let res=await fetch(`${URL}/bugs/assigned_users/${bugid}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    })
    const data=await res.json();
    if(res.status!=200)return {messege:data.messege,status:res.status}
    return {data:data.messege,status:res.status};
}
// (data.id,data.bugid,msg);
export async function Postmsg(userid,bugid,msg){
    let res=await fetch(`${URL}/bugs/conv/${bugid}/${userid}`,{
        method:'POST',
        body:JSON.stringify(
            {
                messege:msg,
            }
        ),
        headers:{
            'Content-Type': 'application/json',
        },
    })
    const data=await res.json();
    return {messege:data.messege,status:res.status};
}