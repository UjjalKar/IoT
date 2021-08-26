import React, { useState, useEffect ,useRef, createRef} from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch  } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import {addDevice} from '../../../Redux/UserData'
import {
    StyleSheet,
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';



const FromAddDevice =(props)=>{
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const { visible,dismiss,id,data} = props;
    const [title, setTitle] = useState("")
    const onSubmit =async ()=>{
        data.title = title
        try{
            const callApi = await axios.put("http://167.71.195.112/api/client/addDevice",{title,idUser:id,idDevice:data})
            if(callApi.status ==200){
                // setMessage(callApi.data)
                dispatch(addDevice(data))
                setTimeout(()=>{
                    navigation.navigate("home")
                },2000)
            }
            else{
                // setCheckLoad(false)
            }   
        }
        catch(err){
            console.log(err)
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
                    <View style={{justifyContent:"center",paddingTop:180}}>
                        <View style={styles.notificationView}>
                        <Text style={{fontSize:20,position:"absolute",paddingVertical:15}}>Thêm thiết bị Mới</Text>
                            <TouchableOpacity style={styles.header} onPress={dismiss}>
                                <Icon name ="close" size={22}/>
                            </TouchableOpacity>
                            <TextInput 
                                style={styles.inputView}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Nhập tên của thiết bị"
                                autoCompleteType="name"
                                selectionColor="#000000"
                                autoFocus={true}
                            /> 
                            
                            <TouchableOpacity style={styles.button} onPress ={onSubmit}>
                                <Text>Lưu Lại</Text>
                            </TouchableOpacity>
                            {/* <NotificationModal visible={showNotification} message ={message} dismiss={exitModal}/> */}
                        </View> 
                    </View>
            </View>
        </Modal>
    </View>
    );
    }

export default FromAddDevice;
const styles = StyleSheet.create({
    createContainer:{
        flex:1,
        justifyContent: "space-between",
        borderRadius:20,
        height: "100%",
        // backgroundColor:"rgba(52, 52, 52, 0.8)"

    },
    notificationView:{
        width:"94%",
        height: 200, 
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
        marginTop:15
    }
})


