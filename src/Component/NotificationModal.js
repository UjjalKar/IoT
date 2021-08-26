import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    Modal,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';



const NotificationModal =(props)=>{
    const { visible,dismiss,message} = props;
    return (
        <View>
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={dismiss}
        >
            <TouchableWithoutFeedback onPress={dismiss}>
                <View style={styles.createContainer}>
                        <View style={{justifyContent:"center",paddingTop:190}}>
                            <View style={styles.notificationView}>
                            <Text style={{fontSize:20,position:"absolute",paddingVertical:15}}>Thông báo</Text>
                                <TouchableOpacity style={styles.header} onPress={dismiss}>
                                    <Icon name ="close" size={22}/>
                                </TouchableOpacity>
                                <Text style={styles.messageText}>{message}</Text>
                            </View> 
                        </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </View>
    );
    }

export default NotificationModal;
const styles = StyleSheet.create({
    createContainer:{
        flex:1,
        justifyContent: "space-between",
        borderRadius:20,
        height: "100%",
        // backgroundColor:"rgba(52, 52, 52, 0.8)"

    },
    notificationView:{
        width:"94%",
        height: 120, 
        backgroundColor: '#cfd8dc',
        alignSelf:"center",
        alignItems:"center",
        borderRadius:20
    },
    messageText:{
        fontSize:22,
        alignItems:"center",
        color:"#000000",
        marginTop:20
    },
    button:{
        marginTop:20,
        height:40,
        backgroundColor:"#6ec6ff",
        width:120,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20
    },
    header:{
        width:"90%",
        alignItems:"flex-end",
        marginTop:15
    }
})


