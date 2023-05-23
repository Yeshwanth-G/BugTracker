import { configureStore } from '@reduxjs/toolkit'
import { reducer,actions } from './features/user/userSlice'
const userstore=configureStore({
    reducer:{
        user:reducer
    }
})
userstore.subscribe(()=>console.log("Updated State..",userstore.getState()))  
export default userstore