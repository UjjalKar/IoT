import React from 'react'
import {createSlice} from "@reduxjs/toolkit"
import axios from 'axios';

import {getDataAPI} from './UserData'


const initialState = {
    token :null,
    isLoading:false,
    data:{},
    message : null,
}
const auth = createSlice({
    name:'auth',
    initialState,
    reducers: {
        loginSuccess(state,action){
            state.token = action.payload.token
            state.id = action.payload.id
            state.data = action.payload.data
            state.isLoading = false

        },
        logout(state,action){
            state.token = null
            state.message = null
            state.id = null
            state.isLoading = false
            state.data = null
        },
        setMessage(state,action){

            state.message = action.payload.message
            state.isLoading = action.payload.isLoading
        },
        upData(state,action){
            state.data.avatar = action.payload
        }
    }
})

const {loginSuccess} = auth.actions
export const {logout} = auth.actions
export const {setMessage} = auth.actions
const {upData} = auth.actions



export const login = ({email,password}) => async dispatch =>{
    try{
        dispatch(setMessage({message:null,isLoading:true}))
        const LoginData = await axios.post("http://167.71.195.112/api/client/login",{email,password})
        if(LoginData.status == 200){
            dispatch(setMessage({message:null,isLoading:false}))
            dispatch(loginSuccess(LoginData.data))
        }
        else{
            dispatch(setMessage({message:LoginData.data,isLoading:false}))
        }
        
    }
    catch(err){
        console.log(err)
        dispatch(setMessage({message:"Có Lỗi Sảy Ra",isLoading:false}))
    }
    
}
export const registerAPI = ({email,password,name}) => async dispatch =>{
    try{
        const registerData = await axios.post("http://167.71.195.112/api/client/register",{email,password,name})
        dispatch(setMessage({message:registerData.data,isLoading:false}))
        
    }
    catch(err){
        console.log(err)
    }
    
}

export const upImage = ({photo,id}) => async dispatch=>{
    const formData = new FormData();
    formData.append('Image',
    {
        name: photo.fileName,
        type: photo.type,
        uri:  photo.path//Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    })
    formData.append("id", id);
    try {
        const callApi = await axios.post("http://167.71.195.112/api/client/up/image",formData)
        if(callApi.status == 200){
            console.log(callApi.data)
            dispatch(upData(callApi.data))
        }
    } catch (err) {
        console.log(err[0])
    }
}

export default auth.reducer
