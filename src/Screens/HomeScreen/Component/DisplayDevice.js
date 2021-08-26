import React, {useState, useEffect} from 'react';
import {View,Text,StyleSheet, TouchableWithoutFeedback, TouchableOpacity,FlatList  } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import eventMqtt from '../../../Event/EventMqtt'
import { useNavigation } from '@react-navigation/native';

const DisplayDevice =(props)=>{
    const navigation = useNavigation();
    const {device,index} = props
    const [data,setData] = useState(device.data)
    useEffect (() => {
        const tmp = setTimeout(()=>{
            eventMqtt.emit("subscribe",device.messageId)
        },2000)
        return ()=> clearTimeout(tmp)
    },[])
    useEffect (() => {
        eventMqtt.on(device.messageId,getData)
        return()=>{
            eventMqtt.off(device.messageId,getData)
        }
    },[data])
    const getData =(tmp)=>{
        console.log(tmp)
        setData(tmp)
    }
    const deleteDevice =()=>{
        navigation.navigate("infoDevice",{device,index})
    }
    return (
        <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleSwitch}>{device.title}</Text>
                </View>
            <View style={styles.test} >
                <TouchableOpacity style={styles.test1} onPress={deleteDevice}>
                    <Icon name="settings" size={22}/>
                </TouchableOpacity>
            </View>
            <View style={styles.viewItem}>   
                <View style={styles.item}>
                    <AnimatedCircularProgress
                        size={114}
                        width={15}
                        backgroundWidth={2}
                        fill={data.temperature}
                        tintColor="#00b8d4"
                        tintColorSecondary="#ff3d00"
                        backgroundColor="#006064"
                        arcSweepAngle={240}
                        rotation={240}
                        lineCap="round"/>
                        <View style={styles.viewValueItem}>
                            <Text style={styles.textValue}>{data.temperature}°C</Text>
                        <Text style={styles.titleItem}>Nhiệt Độ</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <AnimatedCircularProgress
                        size={114}
                        width={15}
                        backgroundWidth={2}
                        fill={data.humidity}
                        tintColor="#00c853"
                        tintColorSecondary="#ff3d00"
                        backgroundColor="#006064"
                        arcSweepAngle={240}
                        rotation={240}
                        lineCap="round"/>
                    <View style={styles.viewValueItem}>
                        <Text style={styles.textValue}>{data.humidity}%</Text>
                        <Text style={styles.titleItem}>Độ Ẩm</Text>
                    </View>
                </View>
            </View>
        </View>
)
}

export default DisplayDevice

const styles = StyleSheet.create({
    container:{
        height:160,
        alignSelf:'center',
        marginVertical:10,
        backgroundColor:"seashell",
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
    viewItem:{
        height:100,
        width:"80%",
        flexDirection:"row",
        marginTop:20,
        alignItems:"center",
        justifyContent:"space-around"
    },
    item:{
        justifyContent:"center",
        alignItems:"center"
    },
    viewValueItem:{
        position:"absolute",
        fontSize:20,
        alignItems:"center",
        // justifyContent:"flex-end",
        height:70,
        // backgroundColor:'red'
    },
    titleItem:{
        fontSize:13,
        height:40
        // marginTop:20
    },
    textValue:{
        fontSize:20,
        // backgroundColor:"white",
        marginVertical:13
    }
})

{/* <AnimatedCircularProgress
size={120}
width={15}
backgroundWidth={5}
fill={56}
tintColor="#00ff00"
tintColorSecondary="#ff0000"
backgroundColor="#3d5875"
arcSweepAngle={240}
rotation={240}
lineCap="round">
</AnimatedCircularProgress> */}

const test ={
    class:"switch",
    status:false,
    messageId:null,
    title:null,
    data:null
}