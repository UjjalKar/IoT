import React, { useState,useRef,useEffect } from 'react'
import { View,Text, StyleSheet, TextInput, TouchableOpacity ,StatusBar, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { registerAPI,setMessage } from '../../Redux/Auth';
import { useDispatch , useSelector } from 'react-redux'

const LoginScreen = ()=>{
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [hidePassword, setHidePassword] = useState(true)
    const [hideCheckPassword, setHideCheckPassword] = useState(true)
    const [name,setName] = useState(null)
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [confirmPassword,setConfirmPassword] = useState(null)
    const [nameStyle,setNameStyle] = useState(styles.inputView)
    const [emailStyle,setEmailStyle] = useState(styles.inputView)
    const [passwordStyle,setPasswordStyle] = useState(styles.inputView)
    const [confirmStyle,setConfirmPasswordStyle] = useState(styles.inputView)
    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    useEffect (() => {
        if(message){
            dispatch(setMessage({message:null}))
        }
    },[])
    const changeNameStyle=()=>{
        setNameStyle({
            ...nameStyle,
            borderWidth:1,
        })
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
    const changeConfirmPasswordStyle=()=>{
        setConfirmPasswordStyle({
            ...confirmStyle,
                borderWidth:1,
            
        })
    }
    const onChangeHidePassword=()=>{
        setHidePassword(!hidePassword)
    }
    const onChangeHideCheckPassword=()=>{
        setHideCheckPassword(!hideCheckPassword)
    }
    const onSubmitNewAcc=()=>{
        if(!name || !email || !password||!confirmPassword){
            dispatch(dispatch(setMessage({message:"Cần Điền Hết Thông Tin",isLoading:false})))
            setConfirmPassword(null)
            setPassword(null)
        }
        else{
            dispatch(registerAPI({name,email:email.toLowerCase(),password}))
        }
    }
    const backLogin =()=>{
        dispatch(dispatch(setMessage({message:null})))
        navigation.navigate("Login",{check:false})
    }

    const {message,isLoading,token} = useSelector(state => state.auth)
    console.log(message)
    return(
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white"/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.createContainer}>
                    <View style={styles.headerView}>
                        <Text style={styles.tittle}>Tạo Tài Khoản</Text>
                    </View>
                    <View style={[nameStyle,{borderColor:name?"#cfcfcf":"red"}]}>
                        <Icon name = "person" size={22}/>
                        <TextInput 
                            style={styles.inputMailView}
                            placeholder="Nhập tên tài khoản"
                            autoCompleteType="name"
                            onSubmitEditing={() => ref_input1.current.focus()}
                            value={name}
                            onChangeText={setName}
                            onPressIn={changeNameStyle}
                        />
                    </View>
                    <View style={[emailStyle,{borderColor:email ?"#cfcfcf":"red"}]}>
                        <Icon name = "mail" size={22}/>
                        <TextInput 
                            style={styles.inputMailView}
                            placeholder="Nhập email"
                            autoCompleteType="email"
                            onSubmitEditing={() => ref_input2.current.focus()}
                            ref={ref_input1}
                            onPressIn={changeEmailStyle}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={[passwordStyle,{borderColor:password ? "#cfcfcf":"red"}]}>
                        <Icon name = "lock-closed" size={22}/>
                        <TextInput 
                            style={styles.inputTextView}
                            secureTextEntry={hidePassword}
                            placeholder="Nhập mật khẩu"
                            autoCompleteType="password"
                            onSubmitEditing={() => ref_input3.current.focus()}
                            ref={ref_input2}
                            onPressIn={changePasswordStyle}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={onChangeHidePassword}>
                            <Icon name = {hidePassword ?  "eye-outline":"eye-off"} size={22}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[confirmStyle,{borderColor:(confirmPassword === password) ? "#cfcfcf":"red"}]}>
                        <Icon name = "lock-closed" size={22}/>
                        <TextInput 
                            style={styles.inputTextView}
                            secureTextEntry={hideCheckPassword}
                            placeholder="Nhập lại mật khẩu"
                            autoCompleteType="password"
                            onSubmitEditing={onSubmitNewAcc}
                            ref={ref_input3}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            onPressIn={changeConfirmPasswordStyle}
                        />
                        <TouchableOpacity onPress={onChangeHideCheckPassword}>
                            <Icon name = {hideCheckPassword ?  "eye-outline":"eye-off"} size={22}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginView}>
                        <TouchableOpacity style={styles.buttonSign} onPress={onSubmitNewAcc}>         
                            <Text style={styles.textSubmit}>Tạo tài khoản</Text>
                        </TouchableOpacity>
                        <View style={styles.registered}>
                            <Text style={styles.textSubmit}>Bạn đã có tài khoản ?</Text>
                            <TouchableOpacity onPress={backLogin}>
                                <Text style={styles.textRegistered}>Sign in!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        justifyContent:"center",
    },
    scrollView:{
        width:"100%",
        flex:1
    },
    createContainer:{
        alignItems:"center",
        marginTop:50
    },
    headerView:{
        width:"100%",
        height:60,
        alignItems:"center",
    },
    tittle:{
        fontSize:24,
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
        marginBottom:20,
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
    buttonSign:{
        width:160,
        height:50,
        borderRadius:20,
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