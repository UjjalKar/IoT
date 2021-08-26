import React from 'react'
import {createSlice} from "@reduxjs/toolkit"
import axios from 'axios';


const initialState = {
    Devices:[],
    Loading:false,
    index:null
}
const appData = createSlice({
    name:'UserData',
    initialState,
    reducers: {
        setData(state,action){
            state.Devices =action.payload
        },
        setLoading(state,action){
            state.Loading = action.payload
        },
        setDefault(state,action){
            state.Devices = []
            state.Loading = false
        },
        addDevice(state,action){
            state.Devices =[...state.Devices,action.payload]
        },
        deleteDevice(state,action){
            state.Devices.splice(action.payload,1)
        },
    }
})

const {setData} = appData.actions
export const {setDefault} = appData.actions
export const {addDevice} = appData.actions
export const {deleteDevice} = appData.actions
const {setLoading} = appData.actions


export const getDataAPI =({id,Loading})=>async dispatch =>{

    try{
        console.log(id)
        dispatch(setLoading(Loading))
        const dataAPI = await axios.post("http://167.71.195.112/api/client/get-data",{id:id})
        console.log("test",dataAPI.data)
        if(dataAPI.status == 200){
            dispatch(setData(dataAPI.data))
            dispatch(setLoading(false))          
        }
        else{
            dispatch(setLoading(false))
        }
    }
    catch(err){
        console.log(err.Error)
    }
}

export default appData.reducer
