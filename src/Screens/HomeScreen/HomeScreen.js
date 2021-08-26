
import React, {  useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch , useSelector } from 'react-redux'
import FocusAwareStatusBar from '../../Component/FocusAwareStatusBar';
import { getDataAPI } from '../../Redux/UserData';
import ItemSwitch from './Component/Switch'
import ItemFollow from './Component/DisplayDevice'

// import RemotePushController from '../RemotePushController '

import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl
} from 'react-native'

const HomeScreen = ()=>{
  const dispatch = useDispatch()
  const {id,data} = useSelector(state => state.auth)
  const {Devices,Loading} = useSelector(state => state.dataUser)
  const navigation = useNavigation();
  useEffect (() => {
      dispatch(getDataAPI({id,Loading:true}))
  },[])
  const goAddScreen=async()=>{
    navigation.navigate('add')
  }
  const renDerMap =Devices.map((item,key)=>{
    if(item.class === "switch"){
      return <ItemSwitch device = {item} key={key}  index = {key}/>
    }
    else{
      return <ItemFollow device = {item} key={key}  index = {key}/>
    }
  })
  const onRefresh =()=>{
    dispatch(getDataAPI({id,Loading:true}))
  }
  return(
    <View style={styles.container}>
      <RemotePushController/>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.headerContainer}>
          <TouchableOpacity  onPress={goAddScreen} >
              <Icon style={{marginLeft:10}} name="add" size={28}/>
          </TouchableOpacity>
          <Text >Trang Chủ</Text>
          <TouchableOpacity >
              <Image 
                  source={{uri:data?.avatar}}
                  style={{width:30,height:30,borderRadius:30,marginRight:10}}
              />
          </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={Loading}
            onRefresh={onRefresh}
            colors={['#2962ff']}
          />
        }
      >
        {!Loading && renDerMap}
      </ScrollView>
    </View>
  )

}

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
      backgroundColor:'white',
      width:"100%",
      height:"100%",
  },
  headerContainer:{
      flexDirection:'row',
      height:45,
      width:'100%',
      backgroundColor:'white',
      justifyContent:'space-between',
      shadowColor: "#000",
      elevation: 2,
      alignItems:"center"
  },
  modalContainer:{
      width:45,
      height:40,
      backgroundColor:'red',
      justifyContent: 'flex-start',
  },
  centeredView: {
      flex: 2,
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      backgroundColor: "white",
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      justifyContent: "flex-end",
      width:"100%",
      height:399
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
})

