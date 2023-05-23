import {createSlice} from '@reduxjs/toolkit'
export const userSlice =createSlice({
    name:'user',
    initialState:{
        isLoggedin:(localStorage.getItem("user")?true:false),
        user:JSON.parse(localStorage.getItem("user"))
    },
    reducers:{
        login:(state,action)=>{
        localStorage.setItem("user",JSON.stringify(action.payload));
        state.user=action.payload;
        state.isLoggedin=true;
        },
        logout:(state)=>{
            state.isLoggedin=false;
            state.user=null;
            localStorage.removeItem("user")
        }
    }

})
export var actions=userSlice.actions;
export var reducer=userSlice.reducer;