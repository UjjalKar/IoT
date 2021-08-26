import 'react-native-gesture-handler';
import React, { useState, useRef  } from 'react'
import { View,Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator ,StatusBar} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation  } from '@react-navigation/native';
import { login,setMessage } from '../../Redux/Auth';
import { useDispatch , useSelector } from 'react-redux'
import NotificationModal from '../../Component/NotificationModal';
const LoginScreen = ()=>{
    const {message,isLoading,token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [hidePassword, setHidePassword] = useState(true)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [emailStyle,setEmailStyle] = useState(styles.inputView)
    const [passwordStyle,setPasswordStyle] = useState(styles.inputView)
    const ref_input2 = useRef();
    const dismiss=()=>{
        dispatch(setMessage({message:null}))
    }
    const onChangeHidePassword=()=>{
        setHidePassword(!hidePassword)
    }
    const onChangeLogin=()=>{
        if(!email || !password){
            dispatch(setMessage({message:"Bạn Cần Nhập Đủ Thông Tin"}))
        }
        else{
            dispatch(login({email:email.toLowerCase(),password:password}))
        }
        
    }
    const changeEmailStyle=()=>{
        setEmailStyle({
            ...emailStyle,
            borderWidth:1,
        })
    }
    const changePasswordStyle=()=>{
        setPasswordStyle({
            ...passwordStyle,
                borderWidth:1,
        })
    }
    const SignIn =()=>{
        setEmail(null)
        setPassword(null)
        navigation.navigate("Sign up")
    }
    return(
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white"/>
            {message ?<NotificationModal visible={!isLoading} message={message} dismiss={dismiss}/> :null}
            <View style={styles.headerView}>
                <Text style={styles.tittle}>Chào Mừng</Text>
            </View>
            <Text style={{height:50,fontSize:20,margin:20}}>Đăng Nhập</Text>
            <View style={[emailStyle,{borderColor:email ?"#cfcfcf":"red"}]}>
                <Icon name = "mail" size={22}/>
                <TextInput 
                    style={styles.inputMailView}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    autoCompleteType="email"
                    onPressIn={changeEmailStyle}
                    onSubmitEditing={() => ref_input2.current.focus()}
                />
            </View>
            <View style={[passwordStyle,{borderColor:password ? "#cfcfcf":"red"}]}>
                <Icon name = "lock-closed" size={22} />
                <TextInput 
                    style={styles.inputTextView}
                    secureTextEntry={hidePassword}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    autoCompleteType="password"
                    onPressIn={changePasswordStyle}
                    ref={ref_input2}
                    onSubmitEditing={onChangeLogin}
                />
                <TouchableOpacity onPress={onChangeHidePassword}>
                    <Icon name = {hidePassword ? "eye-outline":"eye-off"} size={22}/>
                </TouchableOpacity>
            </View>

            <View style={styles.loginView}>
                <TouchableOpacity style={styles.buttonLogin} onPress={onChangeLogin}>
                    { isLoading ?<ActivityIndicator size={30} color="#0000ff" />
                        :<Text style={styles.textSubmit}>Đăng Nhập</Text> 
                    }
                </TouchableOpacity>
                <View style={styles.registered}>
                    <Text style={styles.textSubmit}>Bạn chưa có tài khoản ?</Text>
                    <TouchableOpacity onPress={SignIn}>
                        <Text style={styles.textRegistered}> Sign up!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:"white",
    },
    headerView:{
        width:"100%",
        height:90,
        alignItems:"center",
        justifyContent:"flex-end",
        marginVertical:30
    },
    tittle:{
        fontSize:24,
        height:50
    },
    inputView:{
        width:"88%",
        height:60,
        backgroundColor:"#cfcfcf",
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        borderRadius:13,
        paddingHorizontal:10,
        marginBottom:25,
        elevation:2,
    },
    inputTextView:{
        width:"84%",
        height:50,
        color:"#000000",
        paddingHorizontal:15,
        fontSize:18,
    },
    inputMailView:{
        width:"90%",
        height:50,
        color:"#000000",
        paddingHorizontal:15,
        fontSize:18,
    },
    loginView:{
        width:"100%",
        height:90,
        justifyContent:"center",
        alignItems:"center"
    },
    buttonLogin:{
        width:150,
        height:47,
        borderRadius:40,
        backgroundColor:"#62efff",
        justifyContent:"center",
        alignItems:"center"
    },
    registered:{
        flexDirection:"row",
        marginTop:20
    },
    textRegistered:{
        fontSize:15,
        color:"#29b6f6"
    },
    imageView:{
        width:20,
        height:20
    },
    textSubmit:{
        fontSize:16
    },
})