import React, { useState, useEffect } from 'react'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigation,useRoute } from '@react-navigation/native';
import { logout,upImage } from '../../Redux/Auth';
import {setDefault} from '../../Redux/UserData'
import FocusAwareStatusBar from '../../Component/FocusAwareStatusBar';
import eventMqtt from '../../Event/EventMqtt'
import {launchImageLibrary,launchCamera} from 'react-native-image-picker';
import { View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Image} from 'react-native'
const PersonScreen =()=>{
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {id,data} = useSelector(state => state.auth)
    const handleLogOut =()=>{
        eventMqtt.emit("disconnect")
        setTimeout(()=>{
            dispatch(setDefault())
            dispatch(logout())
        },1000)
        
    }
    const handleUpImage = async ()=>{
        const options = {
        storageOptions: {
        path: "images",
        mediaType: "photo",
        // saveToPhotos:true,
        },
        }
        launchImageLibrary(options,(image)=>{
            console.log(image)
            // if(!image.didCancel){
            //     dispatch(upImage({photo:image.assets[0],id}))
            // }
        })

        // try {
        //     const response = await MultipleImagePicker.openPicker({
        //       selectedAssets: "images",
        //       isExportThumbnail: true,
        //       maxVideo: 1,
        //       usedCameraButton: false,
        //       maxSelectedAssets:1,
        //     });
        //     console.log('done: ', response[0]);
        //     dispatch(upImage({photo:response[0],id}))
        //   } catch (e) {
        //     console.log(e);
        //   }
        // const options ={
        //     maxSelectedAssets:1,
        //     mediaType:"image"
        // }
        // const response = await MultipleImagePicker.openPicker(options);
        // console.log(response)
    }
    return(
        <View style = {styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
            <View style = {styles.infoView}>
                <Image source={{uri:data?.avatar}} style={styles.imageView}/>
                <View style={styles.addView}>
                    <TouchableOpacity style={styles.imageAdd} onPress={handleUpImage}>
                        <Icon name="photo-camera" size={30}/>
                    </TouchableOpacity>
                </View>      
                <Text style={styles.nameUser}>{data?.name}</Text>
            </View>
            <TouchableOpacity style={styles.itemView} onPress={()=>navigation.navigate("infoUser")} >
                <View style={styles.rowView}>
                    <View style={styles.iconItem}>
                        <Icon name="person" size={28}/>
                    </View>
                    <Text style={styles.textItem}>Thông Tin Tài Khoản</Text>
                    <Icon style={styles.icon} name="navigate-next" size={30}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemView}>
                <View style={styles.rowView}>
                    <View style={styles.iconItem}>
                        <Icon name="settings" size={28}/>
                    </View>
                    <Text style={styles.textItem}>Cài Đặt</Text>
                    <Icon style={styles.icon} name="navigate-next" size={30}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemView}>
                <View style={styles.rowView}>
                    <View style={styles.iconItem}>
                        <Icon name="info" size={28}/>
                    </View>
                    <Text style={styles.textItem}>Thông Tin Ứng Dụng</Text>
                    <Icon style={styles.icon} name="navigate-next" size={30}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemView} onPress={handleLogOut}>
                <View style={styles.rowView}>
                    <View style={styles.iconItem}>
                        <Icon name="logout" size={28}/>
                    </View>
                    <Text style={styles.textItem}>Đăng Xuất</Text>
                    <Icon style={styles.icon} name="navigate-next" size={30}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default PersonScreen


const {height,width} = Dimensions.get('screen')
const styles = StyleSheet.create({
    container:{
        // flexDirection:"column",
        justifyContent:"flex-start",
        backgroundColor:"white",
        flex:1,
    },
    infoView:{
        width:width,
        height:height/3,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center",
    },
    imageView:{
        width:182,
        height:182,
        borderRadius:200,
        marginBottom:20,
        borderColor:"rgba(52, 52, 52, 0.8)",
        borderWidth:2
    },
    addView:{
        position:"absolute",
        width:175,
        height:93,
        justifyContent:"flex-end",
        alignItems:"flex-end"
    },
    imageAdd:{
        width:42,
        height:42,
        backgroundColor:"rgba(52, 52, 52, 0.8)",
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    nameUser:{
        fontSize:27,
        fontFamily: "Cochin",
        marginRight:10
    }
    ,
    rowView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:70,
        marginHorizontal:18,
        paddingHorizontal:14,
        borderRadius:20,
    },
    icon:{
        marginTop:2
    },
    test:{
        marginStart:"37%",
        position:"absolute",
        paddingBottom:-50,
        marginTop:-40,
    },
    textItem:{
        fontSize:18,
        textAlign:"left",
        width:230
    },
    iconItem:{
        backgroundColor:"#e3f2fd",
        height:50,
        width:55,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15
    },
    itemView:{
        paddingBottom:5
    },
    textView:{

    }
})
