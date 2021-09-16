import React from 'react'
import { TouchableOpacity , StyleSheet, View, Text , Image } from 'react-native'
import * as Permissions from 'expo-permissions'
import{BarCodeScanner} from 'expo-barcode-scanner' 
export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermissions = async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            //status==="granted"isTrue whenuser has granted permission
            //status==="granted"isFalse whenuser has not granted permission
            hasCameraPermissions:status==="granted",
        })
    }
    handleBarCodeScanned = async({type,data})=>{
        this.setState ({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned;
        const buttonState=this.buttonState;
        if(buttonState==="clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned }
                style = {StyleSheet.absoluteFillObject}
                />
            ); 
        }
        else if(buttonState === "normal"){
        return(
            <View style = {{flex:1 , justifyCotent:'center' , alignItems:'center'}}>
                <Image
                source={require("../assets/camera.jpg")}
                style={{width:200, height: 200}}
                title = "Bar Code Scanner"
                />
                <Text style = {styles.displayText}>
                {hasCameraPermissions===true?this.state.scannedData:"Request Camera Permission"} 
            </Text>
                <TouchableOpacity 
                onPress = {this.getCameraPermissions}
                style = {styles.scanButton}>
                    <Text style = {styles.buttonText}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
}
const styles = Stylesheet.create({
    displayText:{
        fontSize:15,
        textDecorationLine:'underine'
    },
    scanButton:{
        backgroundColor:'violet',
        padding:10,
        margin:10
    },
    buttonText:{
        color:'white',
        textAlign:'center',
        fontSize:10,
        marginTop:10
    }
})

