
import { Pressable, SafeAreaView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button,TextInput,Text   } from 'react-native-paper';
import { Link , router } from 'expo-router';
import useSession from '../../hooks/useSession';

export default function LoginPage() {

  const {user} = useSession()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("student")
  const [showPassword, setShowPassword] = useState(false)

  function SignMeIN(){
    fetch("http://192.168.1.52:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username:username, password:password ,type:type}),
    }).then((res) => res.json()).then((data)=>{
      if(data.success) {
        router.push("/"+type)
      }
      else{ 
        alert("Incorrect username or password")
      }
    }).catch((err) => {
      console.log(err)
      alert("Something went wrong")
    })
  }

  useEffect(() => {      
      if(user?.type) {
        router.push("/"+user.type)
      }
  }, [user]);

  return (


      <View style={{padding: 20,rowGap:10,display:"flex",flexDirection:"column",justifyContent:"space-between",flexGrow:1}}>
        <View style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",height:350}}>
            <Text variant='headlineMedium' style={{marginLeft:"auto",marginRight:"auto",paddingTop:20,marginBottom:30,fontWeight:"bold"}}>Login</Text>
            <View style={{flex:1,flexDirection:"column",rowGap:10}}>
                <TextInput
                    mode="outlined"
                    label="Username"
                    onChangeText={value => setUsername(value)}
                    defaultValue={username}
                />
                <View style={{position:"relative"}}>
                    <TextInput
                        mode="outlined"
                        label="Password"
                        onChangeText={value => setPassword(value)}
                        defaultValue={password}
                        secureTextEntry={!showPassword}
                    />
                    <Text style={{textAlign:"right",position:"absolute",right:10,bottom:15}} onPress={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</Text>
                </View>          
            </View>  
            <Text variant='titleLarge' style={{marginTop:50,marginLeft:"auto",marginRight:"auto"}}>Login as</Text>
            <View style={{flex:1,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Button mode={`${type=='student'?"contained-tonal":"text"}`} onPress={() => setType("student")} style={{width:"48%"}}>
                    <Text variant='titleMedium' style={{marginLeft:"auto",marginRight:"auto",marginTop:"auto",marginBottom:"auto"}}>Student</Text>
                </Button>
                <Button mode={`${type=='teacher'?"contained-tonal":"text"}`} onPress={() => setType("teacher")} style={{width:"48%"}}>
                    <Text variant='titleMedium' style={{marginLeft:"auto",marginRight:"auto",marginTop:"auto",marginBottom:"auto"}}>Teacher</Text>
                </Button>
            </View>
        </View>

        <Button mode="contained" onPress={() => SignMeIN()} style={{width:"100%"}}>
            <Text variant='titleMedium' style={{color:"white",marginLeft:"auto",marginRight:"auto",marginTop:"auto",marginBottom:"auto"}}>Sign In</Text>
        </Button>
                



      </View>    
  );
}


