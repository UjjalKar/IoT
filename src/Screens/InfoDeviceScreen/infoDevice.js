import React, { useState, useEffect } from 'react'
import { View,Text,StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import InfoModal from './Component/infoModal'
import FocusAwareStatusBar from '../../Component/FocusAwareStatusBar';
import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux'
import {deleteDevice} from '../../Redux/UserData'
import { useNavigation ,useRoute} from '@react-navigation/native';


const infoDevice =()=>{
    const route = useRoute()
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const {id,data} = useSelector(state => state.auth)
    const {Devices,Loading} = useSelector(state => state.dataUser)
    const [visible,setVisible] = useState(false)
    const [message,setMessage] = useState(false)
    const [index,setIndex] = useState(route.params.index)
    const [device,setDevice] = useState(route.params.device)
    const openModal =()=>{
        setVisible(true)
    }
    const dismiss =()=>{
        setVisible(false)
    }

    const onSubDelete = async()=>{
        try {      
            const sendDelete = {
                idDelete:device._id,
                classDevice:device.class,
                index:index,
                idUser:id
            }
            console.log(sendDelete)
            const callApi = await axios.put("http://167.71.195.112/api/client/delete-device",sendDelete)
            if(callApi.status == 200){
                dispatch(deleteDevice(0))
                setTimeout(()=>{
                    navigation.navigate('home')
                },1000)
            }
            else{
                console.log(callApi.data)
            }
        } catch (err) {
            console.log(err)
        }
        
    }
    return(
        
            <View style={styles.container}>    
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
            <InfoModal visible={visible} message ={message} dismiss={dismiss}/>
            <View style = {styles.bodyView}>
                <View style = {styles.itemView}>
                    <View style = {styles.headerItem}>
                        <Text style ={styles.textHeader}>Thông tin thiết bị</Text>
                    </View>
                    <View style = {styles.bodyItem}>
                        <View style ={styles.titleView}>
                            <Text style = {styles.textItem}>Tên thiết bị</Text>
                            <TouchableOpacity onPress = {openModal}>
                                <Icon name ="edit" size = {20}/>
                            </TouchableOpacity>
                        </View>
                        <Text style = {styles.textValue}>Lam phuc hai</Text>
                        <Text style = {styles.textItem}>Phân loại</Text>
                        <Text style = {styles.textValue}>Công tắc</Text>
                        <View style ={styles.titleView}>
                            <Text style = {styles.textItem}>Tên công tắc 1</Text>
                            <TouchableOpacity>
                                <Icon name ="edit" size = {20}/>
                            </TouchableOpacity>
                        </View>
                        <Text style = {styles.textValue}>Công tắc1</Text>
                        <View style ={styles.titleView}>
                            <Text style = {styles.textItem}>Tên công tắc 2</Text>
                            <TouchableOpacity>
                                <Icon name ="edit" size = {20}/>
                            </TouchableOpacity>
                        </View>
                        <Text style = {styles.textValue}>Công tắc2</Text>
                        <View style ={styles.titleView}>
                            <Text style = {styles.textItem}>Tên công tắc 3</Text>
                            <TouchableOpacity>
                                <Icon name ="edit" size = {20}/>
                            </TouchableOpacity>
                        </View>
                        <Text style = {styles.textValue}>Công tắc3</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style ={styles.footerView} onPress={onSubDelete}>
                <Text style = {styles.textDelete}>Xóa thiết bị</Text>
            </TouchableOpacity>
            </View>
        
    )
}

export default infoDevice

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        backgroundColor:"white"
    },
    footerView:{
        width:"60%",
        height:44,
        borderRadius:30,
        backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center",
        marginTop:20
    },
    textDelete:{
        fontSize:20,
    },
    titleItem:{
        fontSize:17,
        backgroundColor:"#e0e0e0",
        height:30,
        width:"100%"
    },
    bodyView:{
        width:"100%",
        justifyContent:"center",
    },
    itemView:{
        width:"99%",
        alignItems:"center",
        paddingLeft:10
    },
    headerItem:{
        height:40,
        justifyContent:"flex-end",
        paddingBottom:4,
        width:"100%",
        alignItems:"flex-start"
    },
    textHeader:{
        fontSize:22
    },
    bodyItem:{
        width:"93%",
    },
    textItem:{
        fontSize:20,
        height:30,
        marginRight:20
    },
    textValue:{
        fontSize:15,
        // paddingLeft:10,
        height:30
    },
    titleView:{
        flexDirection:"row",
        // width:20,
        // height:30
        alignItems:"center"
    }
})