import React, {useState, useEffect} from 'react';
import {View,Text,StyleSheet, TouchableWithoutFeedback, TouchableOpacity,FlatList  } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import eventMqtt from '../../../Event/EventMqtt'
import { useNavigation } from '@react-navigation/native';


const Switch =(props)=>{
    const {device,index} = props
    const navigation = useNavigation();
    const [status,setStatus] = useState(device.data)
    useEffect (() => {
        // const tmp = setTimeout(()=>{
        //     eventMqtt.emit("subscribe",device.messageId)
        // },2000)
        // return ()=> clearTimeout(tmp)
        eventMqtt.emit("subscribe",device.messageId)
    },[])
    useEffect (() => {
        eventMqtt.on(device.messageId,getData)
        return()=>{
            eventMqtt.off(device.messageId,getData)
        }
    },[status])
    const getData =(tmp)=>{
        console.log(tmp)
        setStatus(tmp)
    }
    const changeSwitch=(actions)=>{
        if(actions === "switch1"){
            const send = {
                ...status,switch1:!status.switch1
            }
            eventMqtt.emit("publish",{topic:device.messageId,payload:JSON.stringify(send)})
        }
        if(actions === "switch2"){
            const send = {
                ...status,switch2:!status.switch2
            }
            eventMqtt.emit("publish",{topic:device.messageId,payload:JSON.stringify(send)})
        }
        if(actions === "switch3"){
            const send = {
                ...status,switch3:!status.switch3
            }
            eventMqtt.emit("publish",{topic:device.messageId,payload:JSON.stringify(send)})
        }
        // eventMqtt.emit("publish",{topic:device.messageId,payload:JSON.stringify(status)})
    }
    const getInfoDevice=()=>{
        navigation.navigate("infoDevice",{device,index})
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.titleSwitch}>{device.title}</Text>
            </View>
            <View style={styles.test} >
                <TouchableOpacity  style={styles.test1} onPress={getInfoDevice}>
                    <Icon name="settings" size={22}/>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row"}}>
                <View style={styles.boxItem}>
                    <TouchableWithoutFeedback onPress={()=>changeSwitch("switch1")} >
                        <View style={[styles.boxSwitch,{backgroundColor:status.switch1 ?"#00e5ff":"#c2c2c2",}]}>
                                <View style={[styles.test2,{alignItems:status.switch1?"flex-start":"flex-end"}]}>
                                    <View style={[styles.Switch,{backgroundColor:status.switch1?"white":"#f5f5f5",borderRadius:20}]}/>
                                </View>
                            <View style={styles.textSwitch}>
                                <Text style={{color:status.switch1?"#000000":"#f5f5f5"}}>ON</Text>
                                <Text style={{color:status.switch1?"#f5f5f5":"#000000"}}>OFF</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback >
                    <Text style={styles.titleBtn}>{device.nameSwitch.switch1}</Text>
                </View>
                <View style={styles.boxItem}>
                    <TouchableWithoutFeedback onPress={()=>changeSwitch("switch2")} >
                        <View style={[styles.boxSwitch,{backgroundColor:status.switch2 ?"#00e5ff":"#c2c2c2",}]}>
                                <View style={[styles.test2,{alignItems:status.switch2?"flex-start":"flex-end"}]}>
                                    <View style={[styles.Switch,{backgroundColor:status.switch2?"white":"#f5f5f5",borderRadius:20}]}/>
                                </View>
                            <View style={styles.textSwitch}>
                                <Text style={{color:status.switch2?"#000000":"#f5f5f5"}}>ON</Text>
                                <Text style={{color:status.switch2?"#f5f5f5":"#000000"}}>OFF</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback >
                    <Text style={styles.titleBtn}>{device.nameSwitch.switch2}</Text>
                </View>
                <View style={styles.boxItem}>
                    <TouchableWithoutFeedback onPress={()=>changeSwitch("switch3")} >
                        <View style={[styles.boxSwitch,{backgroundColor:status.switch3 ?"#00e5ff":"#c2c2c2",}]}>
                                <View style={[styles.test2,{alignItems:status.switch3?"flex-start":"flex-end"}]}>
                                    <View style={[styles.Switch,{backgroundColor:status.switch3?"white":"#f5f5f5",borderRadius:20}]}/>
                                </View>
                            <View style={styles.textSwitch}>
                                <Text style={{color:status.switch3?"#000000":"#f5f5f5"}}>ON</Text>
                                <Text style={{color:status.switch3?"#f5f5f5":"#000000"}}>OFF</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback >
                    <Text style={styles.titleBtn}>{device.nameSwitch.switch3}</Text>
                </View>
            </View>
        </View>
    )
}

export default Switch

const styles = StyleSheet.create({
    container:{
        height:160,
        alignSelf:'center',
        marginVertical:10,
        backgroundColor:"powderblue",
        width:"96%",
        borderRadius:20,
        alignItems:"center",
        flexDirection:"column",
        elevation:5
        
    },
    titleView:{
        paddingTop:10,
        flexDirection:"row",
        alignItems:"flex-end",
    },
    titleSwitch:{
        fontSize:22,
    },
    test:{
        position:"absolute",
        paddingTop:10,
        alignItems:"flex-end",
        width:"96%",
        justifyContent:"center",
        height:43,
        paddingRight:10
    },
    test1:{
        alignItems:"flex-end",
    },
    boxSwitch:{
        height:40,
        width:79,
        borderRadius:20,
        borderWidth:0.5,
        borderColor:"#000000",
        justifyContent:"center",
        alignItems:"center"
    },
    Switch:{
        width:"51%",
        height:"100%",
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    titleBtn:{
        fontSize:18,
        paddingTop:14
    },
    text:{
        width:"50%",
        height:"100%",
        justifyContent:"center",
    },
    test2:{
        width:"104%",
        height:"104%",
        justifyContent:"center",

    },
    boxItem:{
        height:100,
        width:122,
        justifyContent:"flex-end",
        alignItems:"center",
        marginTop:12
    },
    textSwitch:{
        width:"100%",
        height:"100%",
        justifyContent:"space-around",
        position:"absolute",
        flexDirection:"row",
        alignItems:"center"
    }
})

