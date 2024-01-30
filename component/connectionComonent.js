import React, { useEffect } from 'react'
import { View } from 'react-native';
import { useCameraPermission , useCodeScanner ,useCameraDevice , Camera} from 'react-native-vision-camera';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { connectionContext } from '../app/student/_layout';
import axios from 'axios';

function CameraComp() {

    const [loading, setLoading] = React.useState(false)
    const [code, setCode] = React.useState(null)
    const connection = React.useContext(connectionContext)

    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back')
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if(!code){
              let json = JSON.parse(codes[0].value)
              setCode(json)
              setLoading(true)
              console.log(`Scanned ${JSON.stringify(json)} codes!`)
            }
        }
    })

    useEffect(() => {
        if(code) {
          console.log("Connecting",code.url)
            axios.get(`${code.url}/api/auth/session`).then((res) => {
                if(res.data.success) {
                  console.log("Connected")
                  connection.setConnection(code.url)
                  setLoading(false)                    
                }
            }).catch((err) => {
                console.log(err)
                setCode(null)
                alert(`Connect to wifi "${code.ssid}" password is ${code.password} and try again.`)
                setLoading(false)
            })
        }
    }, [code])

    useEffect(() => {
        if (!hasPermission) {
          requestPermission()
        }
    }, [hasPermission, requestPermission])

    if (device == null) return <NoCameraDeviceError />
    return (
        <View style={{ width:200,height:200,backgroundColor:"gray",position:"relative",marginLeft:"auto",marginRight:"auto",borderRadius:10,overflow:"hidden",flexGrow:0}}>
            {loading && <ActivityIndicator animating={true} color={MD2Colors.red800} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-10px,-10px)",zIndex:10}} />}
            <Camera
              style={{ position:"absolute",top:0,left:0,width:200,height:200,zIndex:-1}}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
              zoom={2}
            />
        </View>
      )
}

export default CameraComp