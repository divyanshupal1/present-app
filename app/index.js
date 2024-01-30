import React from 'react'
// import LoginPage from '../screens/login/LoginScreen'
import { Appbar, Button ,Text} from 'react-native-paper';
import { Link , router } from 'expo-router';
import useSession from '../hooks/useSession';
import { View } from 'react-native';


function Main() {

  const {user,loading} = useSession();

  // React.useEffect(() => {
  //   if(!loading && !user){
  //     router.replace("/login")
  //   }
  // },[loading])

  return (
    <>
    <Appbar.Header>
        <Appbar.Content title="Present" />
    </Appbar.Header>
    <View style={{padding: 20,rowGap:10,display:"flex",flexDirection:"column",justifyContent:"space-between",flexGrow:0}}>
      <Text variant='headlineMedium' style={{marginLeft:"auto",marginRight:"auto"}} >Group Code : BT3121</Text>
      <Text variant='titleLarge' style={{marginLeft:"auto",marginRight:"auto"}} >Attendance Sytem by QR Scan</Text>
      <Text variant='headlineSmall' style={{marginLeft:"auto",marginRight:"auto"}} >Guide : Dr. Kumar Manoj </Text>
      <Text variant='headlineSmall' style={{marginLeft:"auto",marginRight:"auto",textAlign:"center"}} >Reviewer : Mr. Vinay Kumar Sharma</Text>
      <Text variant='titleSmall' style={{marginLeft:"auto",marginRight:"auto"}} >Divyanshu Pal (21SCSE1011334)</Text>
      <Text variant='titleSmall' style={{marginLeft:"auto",marginRight:"auto"}} >Shivam Gupta (21SCSE1011309)</Text>
      <Text variant='titleSmall' style={{marginLeft:"auto",marginRight:"auto"}} >Arpit Kumar Chaudhary (21SCSE1010485)</Text>      
    </View>
    <View style={{padding: 20,rowGap:10,display:"flex",flexDirection:"column",justifyContent:"space-between",flexGrow:1}}>
      <Link push href="/login" asChild>
          <Button mode="contained" style={{marginLeft:"auto",marginRight:"auto",marginBottom:20, marginTop:"auto",width:"100%"}}>
            <Text style={{color:"white"}}>Continue</Text>
          </Button>
      </Link>  
    </View>

    {/* <LoginPage/> */}
  
  </>
  )
}

export default Main