import React, { useState, useEffect } from 'react'
import {
    TouchableWithoutFeedback,
    StyleSheet,
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

const infoModal =(props)=>{
    const [textNew,setTextNew] = useState("null")

    const { visible,message,dismiss } = props;
    return (
        <View>
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={dismiss}
        >
            <View style={styles.createContainer}>
                <View style={{justifyContent:"center",paddingTop:220}}>
                    <View style={styles.notificationView}>
                        <View style ={styles.header}>
                            <Text style ={styles.textHeader}>Đổi tên</Text>
                        </View>
                        <View style ={styles.body}>
                            <TextInput
                                value={textNew}
                                onChangeText={setTextNew}
                                selectionColor="#000000"
                                // autoFocus={true}
                                style={{
                                    width:200,
                                    // backgroundColor:"#e0e0e0",
                                    height:40,
                                    textAlign:"center",
                                    borderRadius:12,
                                    borderColor:"#bdbdbd",
                                    borderWidth:1,
                                    fontSize:18
                                }}
                            />
                        </View>
                        <View style ={styles.footer}>
                            <TouchableOpacity style ={styles.itemLeft} onPress={dismiss}>
                                    <Text style={styles.textFooter}>Hủy bỏ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.itemRight}>
                                    <Text style={styles.textFooter}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </View>
        </Modal>
    </View>
    );
    
}

export default infoModal

const styles = StyleSheet.create({
    createContainer:{
        flex:1,
        justifyContent: "space-between",
        // height: "100%",
        backgroundColor:"rgba(52, 52, 52, 0.8)",
        alignItems:"center"
    },
    notificationView:{
        width:"87%",
        height: 190, 
        backgroundColor: 'white',
        alignItems:"center",
        justifyContent:"space-around",
        borderRadius:20
    },
    header:{
        // height:40,
        marginTop:8
    },
    textHeader:{
        fontSize:20,
    },
    body:{

    },
    footer:{
        width:"100%",
        borderTopColor:"#bdbdbd",
        borderTopWidth:1,
        height:40,
        flexDirection:"row",
    },
    itemLeft:{
        width:"50%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        borderRightColor:"#bdbdbd",
        borderRightWidth:1
    },
    itemRight:{
        width:"50%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    textFooter:{
        fontSize:18
    }
})


