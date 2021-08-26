import React, {useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../Screens/HomeScreen/HomeScreen'
import {View,Text} from 'react-native'
import PersonScreen from '../Screens/PersonScreen/PersonScreen'
import { useSelector} from 'react-redux'
import MQTT from '../config/Mqtt';


const Tab = createBottomTabNavigator();

const BottomTab=()=>{
    const {token,id} = useSelector(state => state.auth)
    useEffect (() => {
        MQTT.connect()
    },[])
    return(
        <Tab.Navigator
        screenOptions={
            {
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                    display: "flex",
                    height:55
                    },
                    null
                ],
                headerShown:false,
            }
        }
        >
            <Tab.Screen 
                name ="Home" 
                component ={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems:"center"}}>
                            <Icon
                                name={focused ? "home-sharp":"home-outline"}
                                style={{
                                    color: focused ? '#0080FF' : '#000000'
                                    ,marginBottom:4
                                }}
                                size={focused ? 26 : 26}
                            
                                />
                            <Text style={{color: focused ? '#0080FF' : '#000000',fontSize:10}}>Trang Chủ</Text>
                        </View>
                        ),
                    // tabBarShowLabel:false
                }}
            
            />   
            {/* <Tab.Screen 
                name ="Map" 
                component ={Maps}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View >
                            <Icon
                                name="map"
                                style={{color: focused ? '#0080FF' : '#000000'}}
                                size={focused ? 26 : 22}
                                />
                        </View>
                        )

                    
                    }}
            /> */}
            <Tab.Screen 
                name ="PersonScreen" 
                component ={PersonScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems:"center"}}>
                            <Icon
                                name={focused ?"people":"people-outline"}
                                style={{color: focused ? '#0080FF' : '#000000',marginBottom:4}}
                                size={focused ? 26 : 26}
                            />
                            <Text style={{color: focused ? '#0080FF' : '#000000',fontSize:10}}>Cá Nhân</Text>
                        </View>
                        )
                    }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab