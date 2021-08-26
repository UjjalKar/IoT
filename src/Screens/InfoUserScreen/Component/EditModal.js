import React, { useState, useEffect ,useRef, createRef} from 'react'
import NotificationModal from '../../../Component/NotificationModal';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    TouchableWithoutFeedback,
    StyleSheet,
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';



const EditModal =(props)=>{
    const { visible,dismiss,id} = props;
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState(null)
    const [showNotification,setShowNotification] = useState(false)
    const [message,setMessage] = useState(null)
    const ref_input1 = useRef()
    const ref_input2 = useRef()
    useEffect (() => {
        setPassword("")
        setConfirmPassword("")
    },[])
    const exitModal =()=>{
        if(message === "Mât khẩu không hợp lệ"){
            ref_input1.current.focus()
            setConfirmPassword(null)
        }
        else{
            setShowNotification(false)
            setMessage(null)
            setPassword(null)
            setConfirmPassword(null)
            dismiss()
        }
        setShowNotification(false)
        
    }
    const savePass =async ()=>{
        if(password != confirmPassword || !password || !confirmPassword){
            setConfirmPassword("")
            ref_input2.current.focus()
            console.log("check loi input")
            if(!password){
                ref_input1.current.focus()
            }
            if(!confirmPassword && password){
                console.log("pass")
                ref_input2.current.focus()
            }
        }
        else{
            try{
                const callApi = await axios.put("http://167.71.195.112/api/client/edit-info-user",{password,id})
                if(callApi.status == 200){
                    setMessage(callApi.data)
                    setShowNotification(true)
                }
                
            }
            catch(err){
                console.log(err)
            }
        }
    }
    return (
        <View>
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={dismiss}
        >
            <View style={styles.createContainer}>
                    <View style={{justifyContent:"center",paddingTop:220}}>
                        <View style={styles.notificationView}>
                            <TouchableOpacity style={styles.header} onPress={dismiss}>
                                <Icon name ="close" size={22}/>
                            </TouchableOpacity>
                            
                            <Text style={{fontSize:20,position:"absolute",paddingVertical:15}}>Đổi mật khẩu</Text>
                            <TextInput 
                                style={styles.inputView}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Mật Khẩu Mới"
                                autoCompleteType="password"
                                secureTextEntry={true}
                                selectionColor="#000000"
                                ref={ref_input1}
                                onSubmitEditing={()=>ref_input2.current.focus()}
                                autoFocus={true}
                            />                       
                            <TextInput 
                                style={styles.inputView}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Nhập Lại Mật Khẩu"
                                autoCompleteType="password"
                                secureTextEntry={true}
                                selectionColor="#000000"
                                ref={ref_input2}
                                onSubmitEditing={savePass}
                            />
                            <TouchableOpacity style={styles.button} onPress ={savePass}>
                                <Text>Lưu Lại</Text>
                            </TouchableOpacity>
                            <NotificationModal visible={showNotification} message ={message} dismiss={exitModal}/>
                        </View> 
                    </View>
            </View>
        </Modal>
    </View>
    );
    }


const styles = StyleSheet.create({
    createContainer:{
        flex:1,
        justifyContent: "space-between",
        borderRadius:20,
        height: "100%",
        backgroundColor:"rgba(52, 52, 52, 0.8)"

    },
    notificationView:{
        width:"94%",
        height: 260, 
        backgroundColor: '#cfd8dc',
        alignSelf:"center",
        alignItems:"center",
        borderRadius:20
    },
    textNotification:{
        textAlign:"center",
        color:"white",
    },
    messageText:{
        fontSize:20,
        alignItems:"center",
        color:"white"
    },
    inputView:{
        width:"70%",
        height:50,
        backgroundColor:"white",
        marginTop:29,
        borderRadius:20,
        paddingLeft:30,
        fontSize:18
    },
    button:{
        marginTop:20,
        height:40,
        backgroundColor:"#6ec6ff",
        width:120,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20
    },
    header:{
        width:"90%",
        alignItems:"flex-end",
        marginTop:5
    }
})


export default EditModal;