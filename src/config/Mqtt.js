import MQTT from 'sp-react-native-mqtt';
import eventMqtt from '../Event/EventMqtt'

module.exports ={
    connect(clientId){
        this.createId = "AppAndroid"+clientId
        MQTT.createClient({
            uri: 'mqtt://167.71.195.112:1883',
            clientId: this.createId,
            user:"admin",
            pass:"admin",
            auth:true,
            port:1883
        }
    )
    .then((client)=>{
        client.on('closed', (err)=>{
            console.log(`MQTT onConnectionClosed ${err}`);
        });
        client.on('error',(error)=>{
            console.error(`MQTT onError: ${error}`);
            if(error==="ConnectionLost! Timed out waiting for a response from the server (32000)"){
                setTimeout(()=>{
                    client.reconnect()
                },10000)
            }
        });
        client.on('message',(msg)=>{
            eventMqtt.emit(msg.topic,JSON.parse(msg.data.toString()))
        });
        client.on('connect',()=>{
            eventMqtt.on("subscribe",(data)=>{
                client.subscribe(data,0)
            })
            eventMqtt.on("publish",(data)=>{
                client.publish(data.topic,data.payload,0,false)
            })
        })
        eventMqtt.on("disconnect",()=>{
            client.disconnect()
        })
        client.connect()
    })
    .catch(err=>{
        console.log(err)
    })
    }
}