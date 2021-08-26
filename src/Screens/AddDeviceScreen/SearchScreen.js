import React, { useState } from 'react'
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation} from '@react-navigation/native';
import FocusAwareStatusBar from '../../Component/FocusAwareStatusBar';
import QRCodeScanner from 'react-native-qrcode-scanner';
import FromAddDevice from './Component/FromAddDevice'
import NotificationModal from './Component/NotificationModal,';
import { useSelector } from 'react-redux'

import axios from 'axios';
import { 
    View,
    Text,
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Dimensions
} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const SearchScreen = ()=>{
    const [data, setData] = useState({})
    const [qrCode, setQrCode] = useState(false)
    const [searchId,setSearchId] = useState("61261739d30bed14b00352af")
    const [fromAddModal,setFromAddModal] = useState(false)
    const [notificationModal,setNotificationModal] = useState(false)
    const {id} = useSelector(state => state.auth)
    const handleQrCode = ()=>{
        setQrCode(true)
    }
    const onSearch=async(id)=>{
        try {
            const callApi = await axios.post("http://167.71.195.112/api/client/search-device",{id:id})
            if(callApi.status == 200){
                setData(callApi.data)
                setFromAddModal(true)
            }
            else{
                setNotificationModal(true)
            }
            setSearchId("")
        } catch (error) {
            console.log(error);
        }
    }
    const onSuccess =(e)=>{
        setQrCode(false)
        onSearch(e.data)
    }
    const exitQrCode =()=>{
        setQrCode(false)
    }
    const dismiss =()=>{
        setFromAddModal(false)
    }
    return(
        <View>
            <FromAddDevice visible ={fromAddModal} dismiss = {dismiss} data={data} id={id}/>
            <NotificationModal visible ={notificationModal} dismiss = {()=>setNotificationModal(false)}/>

            {qrCode ? (
                <View style={styles.container}>
                    <FocusAwareStatusBar barStyle="light-content" backgroundColor="rgba(52, 52, 52, 0.8)" />
                    <QRCodeScanner
                        showMarker
                        onRead={onSuccess}
                        reactivate={true}
                        cameraStyle={{ height: SCREEN_HEIGHT }}
                        customMarker={
                            <View style ={styles.qrCodeView}>
                                <View style={styles.viewTmp1}>
                                    <View style={styles.test1}>
                                        <TouchableOpacity style = {styles.qrButton} onPress={exitQrCode}>
                                            <Icon name="keyboard-backspace" size={35}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.test2}>
                                        <View style={styles.tmpView1}/>
                                        <View style={styles.tmpView2}/>
                                    </View>
                                    <View style={styles.test3}/>
                                </View>
                                <View style={styles.viewTmp2}>
                                    
                                </View>
                            </View>
                        }
                    />
                </View>
            ):(
                <View style={styles.container}>
                    <View style={styles.searchView}>
                        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
                        <View style={styles.centerView}>
                            <Text style={styles.titleSearch}>Tìm Kiếm Thiết Bị Mới</Text>
                            <View  style={styles.inputView}>
                                <TextInput 
                                    placeholder="Nhập id của thiết bị"
                                    style={styles.textInput}
                                    value={searchId}
                                    onChangeText={setSearchId}
                                />
                                <TouchableOpacity onPress={handleQrCode}>
                                    <Icon name="qrcode-scan" size={25} style={styles.iconQr}></Icon>
                                </TouchableOpacity>
                            </View>
                            
                            <TouchableOpacity style={styles.buttonSearch} onPress={()=>onSearch(searchId)}>
                                <Text>TÌM KIẾM</Text>
                                {/* {checkLoad ? 
                                    <ActivityIndicator size="large" color="#0000ff"/>
                                :
                                    <Text>TÌM KIẾM</Text>
                                } */}
                                    
                            </TouchableOpacity>                                   
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    container:{
        justifyContent:'flex-start',
        backgroundColor:"white",
        height:"100%",
    },
    searchView:{
        marginTop:187,
        justifyContent:"center"
    },
    inputView:{
        backgroundColor:'#E6E6E6',
        width:300,
        height:55,
        borderRadius:14,
        fontSize:18,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    iconQr:{
        width:40,
    },
    textInput:{
        paddingLeft:40,
        fontSize:18,
        width:"84%"
    },
    titleSearch:{
        fontSize:27,
        marginBottom:30,
    },
    buttonSearch:{
        backgroundColor:'#40c4ff',
        width:180,
        height:46,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        borderRadius:20,
    },
    qrCodeView:{
        justifyContent:'center',
        flexDirection:"column"
    },
    qrButton:{
        width:100,
        height:80,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    test:{
        width:200,
        height:200,
        borderColor:'#819ca9',
        borderWidth:2,
        marginBottom: 100,
    },
    test1:{
        width:200,
        height:10,
        justifyContent:"flex-end",
        alignItems:'center',
    },
    viewTmp1:{
        flex:1,
        width:SCREEN_WIDTH,
        flexDirection:"row",

    },
    viewTmp2:{
        flex:1,
        backgroundColor:"rgba(52, 52, 52, 0.8)",
        width:SCREEN_WIDTH,
        justifyContent:"flex-end",
        alignItems:"center"
    },
    test1:{
        width:SCREEN_WIDTH/4,
        backgroundColor:"rgba(52, 52, 52, 0.8)"
    },
    test2:{
        width:SCREEN_WIDTH/2, 
        flexDirection:"column",
        justifyContent:"flex-end"
    },
    test3:{
        width:SCREEN_WIDTH/4,
        backgroundColor:"rgba(52, 52, 52, 0.8)"
    },
    tmpView1:{
        height:"50%",
        width:"100%",
        backgroundColor:"rgba(52, 52, 52, 0.8)"
    },
    tmpView2:{
        height:"50%",
        width:"100%",
        borderColor:"white",
        borderWidth:1
    },
    backButton:{
        width:78,
        height:40,
        borderRadius:17,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:20
    },
    centerView:{
        alignItems:"center",
    }
})


// rgba(52, 52, 52, 0.8)