import axios from 'axios';
import React from 'react'
import { View } from 'react-native'
import {Text, Appbar, Button,Surface} from 'react-native-paper';
import { HOST } from '../../constants';
import { Link } from 'expo-router';

function Page() {

  const [activeClass,setActiveClass] = React.useState(null)
  const [startsAt,setStart] = React.useState(null)
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

  return (
    <>
     <View style={{padding:10}}>
        <View>
          <Text variant='titleMedium'>Active Class</Text>
          <Surface elevation={2} style={{width:"100%",height:"auto",marginTop:20,backgroundColor:"lightpink",borderRadius:20, padding:12}}>
              <Link href={{
                pathname:"/student/class/[id]",
                params:{id:activeClass?.id}
              
              }} >
                <View style={{width:"100%",marginLeft:"auto",marginRight:"auto"}}>
                  <Text variant='titleMedium' style={{textAlign:"center"}}>{activeClass?.title}</Text>
                  <View style={{marginTop:10,padding:10}}>
                    <Text variant='titleSmall' style={{textAlign:"left"}}>Teacher: {activeClass?.teacher.name}</Text>
                    <Text variant='titleSmall' style={{textAlign:"left"}}>Start: {startsAt?.toLocaleDateString()!=today.toLocaleDateString()?"Today ":startsAt?.toLocaleDateString()}, {startsAt?.getHours()}:{startsAt?.getMinutes()}</Text>
                  </View>
                </View>
              </Link>
          </Surface>
        </View>
     </View>
    </>
  )
}

export default Page