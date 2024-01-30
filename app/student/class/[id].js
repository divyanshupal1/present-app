import React from 'react'
import { Button, Icon, Text, MD3Colors ,ActivityIndicator,MD2Colors,PaperProvider,Portal,Modal } from 'react-native-paper'
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { HOST } from '../../../constants';
import CameraComp from '../../../component/connectionComonent';
import { connectionContext } from '../_layout';
import { View } from 'react-native';
// import CameraComp from '../../../component/cameraComp';


function Page() {

const connection = React.useContext(connectionContext)
const [visible, setVisible] = React.useState(false);
const showModal = () => setVisible(true);
const hideModal = () => setVisible(false);
const containerStyle = {backgroundColor:"white",padding: 20,height:300,width:300,marginLeft:"auto",marginRight:"auto",display:"flex",justifyContent:"center",alignItems:"center"};

const { id } = useLocalSearchParams();

const [activeClass,setActiveClass] = React.useState(null)
const [startsAt,setStart] = React.useState(null)
const [tokens,setTokens] = React.useState(null)
const [checkedIn,setCheckIn] = React.useState(false)
const [verifyCount,setVerifyCount] = React.useState(-1)


const today= new Date()

React.useEffect(() => {
  axios.get(`${HOST}/api/student/active_class`).then((res) => {
    if(res.data.success) {
      setActiveClass(res.data.data)
      setStart(new Date(res.data.data.startsAt))
      console.log(res.data.data)
    }
  }).catch((err) => {
    console.log(err)
    alert("Something went wrong")
  })

},[])
React.useEffect(() => {
  if(activeClass && activeClass.id != id) {
    router.replace("/student")
  }
},[id])

function CheckIn() {
  console.log("Checking in",`${connection.connection}/api/student/get_tokens`)
  axios.get(`${connection.connection}/api/student/get_tokens`).then((res) => {
    console.log(res.data.data)
    if(!res.data.success) {
      alert("already checked in")
    }
    else {
      const temp_tokens = res.data.data
      setTokens(temp_tokens)
      setCheckIn(true)      
      alert("Checked in")
      setVerifyCount(0)  
    }
  })
  .catch((err) => {
    console.log(err)
    alert("Something went wrong")
  })

}
console.log(checkedIn, verifyCount)


React.useEffect(() => {
  if(checkedIn && verifyCount<5) {
    setTimeout(() => {MarkAttendance()},10000)
  }
},[verifyCount])

function MarkAttendance()
{ 
  if(!tokens || verifyCount>5) return
  console.log("Marking Attendance",tokens?.value[verifyCount],verifyCount)
  axios.post(`${connection.connection}/api/student/verify_token`,{token:tokens.value[verifyCount],classId:activeClass?.id}).then((res) => {
    console.log(res.data)
    if(!res.data.success) {
      alert("Wrong Token")
      clearTimeout(recall)
    }
    if(res.data.success == "done") {
      alert("Attendance marked")
      router.replace("/student")
    }
    if(res.data.success) {
      console.log("token verified")
      setVerifyCount(verifyCount+1)
    }    
  }).catch((err) => {
    console.log(err)
    alert("Something went wrong")
  })
}

return (
  <>
    <PaperProvider>
      <Portal>
        <Modal visible={visible && !(connection.connection!=null)} onDismiss={hideModal} dismissable={true} contentContainerStyle={containerStyle}>
          <View style={{width:"100%",height:"100%"}}>
            <Text variant='bodyLarge' style={{textAlign:"center",marginBottom:10}}>Scan the QR code to connect</Text>
            <CameraComp />
          </View>
        </Modal>
      </Portal>

      <View style={{width:"100%",height:400,padding:10}}>
          <Button mode='contained' style={{marginTop: 10,width:"100%"}} onPress={showModal} disabled={(connection.connection!=null)}>
            {connection.connection ? "Connected" : "Click to Connect"}
          </Button>
          <View style={{width:"100%",marginLeft:"auto",marginRight:"auto",width:"100%",height:"auto",marginTop:20,backgroundColor:"lightpink",borderRadius:20, padding:12}}>
            <Text variant='titleMedium' style={{textAlign:"center"}}>{activeClass?.title}</Text>
            <View style={{marginTop:10,padding:10}}>
              <Text variant='titleSmall' style={{textAlign:"left"}}>Teacher: {activeClass?.teacher.name}</Text>
              <Text variant='titleSmall' style={{textAlign:"left"}}>Start: {startsAt?.toLocaleDateString()!=today.toLocaleDateString()?"Today ":startsAt?.toLocaleDateString()}, {startsAt?.getHours()}:{startsAt?.getMinutes()}</Text>
            </View>
          </View>
          <View style={{width:"100%",marginLeft:"auto",marginRight:"auto",width:"100%",height:445,marginTop:20,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
            
            {checkedIn &&
            <>
              <ActivityIndicator animating={true} color={MD2Colors.red800} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-10px,-10px)",zIndex:10}} />
              <View style={{width:"100%",marginLeft:"auto",marginRight:"auto",width:"100%",padding:10,borderRadius:20, borderWidth:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",columnGap:10}}>
                <Text variant='titleMedium' style={{textAlign:"center",color:"red"}}>Attendance process started it will be marked when class ends</Text>
              </View>
              <Text variant='titleSmall' style={{textAlign:"center",marginTop:10}}>verifyCount : {verifyCount}</Text>
              <View style={{width:"100%",marginLeft:"auto",marginRight:"auto",marginTop:20,width:"100%",padding:10,borderRadius:20, borderWidth:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",columnGap:10}}>
                <Icon
                  source="alert-octagon-outline"
                  color={MD3Colors.error50}
                  size={40}
                />
                <Text variant='titleMedium' style={{textAlign:"center",color:"red"}}>Do not leave this app</Text>
              </View>
            </>
            }
            {(!checkedIn && !(connection.connection==null)) && 
              <Button mode="contained" disabled={checkedIn ||(connection.connection==null)} onPress={() => CheckIn()} style={{width:"100%",marginTop:20}}>{checkedIn?"Attendance process startred":"Mark Attendance"}</Button>
            }
          </View>        
      </View>
   </PaperProvider>
  
  </>
)
}

export default Page

// WIFI:T:WPA;P:gaurav@0000;S:Gaurav 302;H:false;