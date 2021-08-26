import React, { useState} from 'react'
import { Text, View,StyleSheet, TouchableOpacity } from 'react-native'
import FocusAwareStatusBar from '../../Component/FocusAwareStatusBar';
import { useSelector } from 'react-redux'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import EditPassModal from './Component/EditModal';

const InfoUserScreen =()=>{
    const [callPass,setCallPass] = useState(false)
    const navigation = useNavigation();
    const {id,data,message} = useSelector(state => state.auth)
    const {Devices} = useSelector(state => state.dataUser)
    const [visible,setVisible] = useState(false)

    const dismiss =()=>{
        setVisible(false)
    }
    const openEditNameModal =()=>{
    }
    const openEditPasModal =()=>{
        setVisible(true)
    }
    return(
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.infoView}>
            <Text style={[styles.text,{marginBottom:10}]}>Tài Khoản</Text>
                <View style={styles.itemView}>
                    <View style={styles.leftItem}>
                        <Icon name="person" size={28}/>
                    </View>
                    <View style={styles.rightItem}>
                        <Text style={styles.textItem}>{data?.name}</Text>
                    </View>
                </View>
                <View style={styles.itemView}>
                    <View style={styles.leftItem}>
                        <Icon name="email" size={28}/>
                    </View>
                    <View style={styles.rightItem}>
                        <Text style={styles.textItem}>{data.email}</Text>
                    </View>
                </View>
                <View style ={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={openEditPasModal}>
                        <Text style={styles.textButton}>Đổi Mật Khẩu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.infoView}>
            <Text style={[styles.text,{marginBottom:10}]}>Thiết Bị</Text>
                <View style={styles.itemView}>
                    <View style={styles.leftItem}>
                        <Icon name="devices" size={28}/>
                    </View>
                    <View style={styles.rightItem}>
                        <Text style={styles.textItem}>{Devices.length}</Text>
                    </View>
                </View>
            </View>
            <EditPassModal visible ={visible} dismiss = {dismiss} check = {callPass} id={id}/>
        </View>
    )
}

export default InfoUserScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        height:"100%",
        alignItems:"center"
    },
    infoView:{
        width:"90%",
        // height:"60%",
        // backgroundColor:"#bbdefb",
        borderRadius:20,
        marginTop:20,
        paddingHorizontal:10,
        // borderTopColor:"#000000",
        // borderTopWidth:1
    },
    itemView:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#f5f5f5",
        height:50,
        borderRadius:10,
        marginBottom:16,
        height:60,
    },
    titleItem:{
        fontSize:20,
        paddingRight:10,
    },
    textItem:{
        fontSize:20,
    },
    leftItem:{
        // width:150,
        flexDirection:"row",
        alignItems:"center",
        // backgroundColor:"red",
        justifyContent:"space-between",
        paddingRight:10,
        paddingHorizontal:30,
        borderRightColor:"#000000",
        borderRightWidth:1
        
    },
    rightItem:{
        marginLeft:10
    },
    text:{
        fontSize:24
    },
    button:{
        width:"90%",
        height:40,
        backgroundColor:"#00b8d4",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        marginBottom:10

    },
    buttonView:{
        justifyContent:"center",
        alignItems:"center",
    },
    textButton:{
        fontSize:17
    }
})
