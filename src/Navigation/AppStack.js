import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SearchScreen from '../Screens/AddDeviceScreen/SearchScreen';
import { useSelector} from 'react-redux'
import BottomTab from './BottomTab'
import Login from '../Screens/LoginScreen/LoginScreen'
import Registered from '../Screens/RegisteredScreen/RegisteredScreen'
import InfoUser from '../Screens/InfoUserScreen/InfoUserScreen'
import InfoDevice from '../Screens/InfoDeviceScreen/infoDevice';

const Stack = createStackNavigator();

const AppStack =()=>{
    const {token,id} = useSelector(state => state.auth)
    return(
        <NavigationContainer
        >
            {token ?(
                <Stack.Navigator 
                    screenOptions={{
                        animationEnabled:true,
                        headerShown:false,
                        ...TransitionPresets.SlideFromRightIOS,
                        cardOverlayEnabled:true,
                        
                    }}
                >   
                    <Stack.Screen 
                        name="home" 
                        component={BottomTab}
                    />
                    <Stack.Screen 
                        name ="add"
                        component={SearchScreen}
                    />
                    <Stack.Screen 
                        name="infoUser" 
                        component={InfoUser}
                        options={{
                            title:"Thông Tin Tài Khoản",
                            headerShown:true
                        }}
                    />
                    <Stack.Screen 
                        name="infoDevice" 
                        component={InfoDevice}
                        options={{
                            title:"",
                            headerShown:true
                        }}
                    />
                </Stack.Navigator>
            ):(
                <Stack.Navigator
                    screenOptions={{
                        // headerShown:false,
                        ...TransitionPresets.SlideFromRightIOS
                    }}
                >
                    <Stack.Screen 
                        name="Login"
                        component={Login}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen name="Sign up" component={Registered}/>
                </Stack.Navigator>
            )
            }

        </NavigationContainer>
    )
}

export default AppStack