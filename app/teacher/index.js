import axios from 'axios';
import React from 'react'
import {Text, Appbar, Button,Surface } from 'react-native-paper';
import { HOST } from '../../constants';
import { View } from 'react-native'
import { Link } from 'expo-router';

export const classContext = React.createContext(null);

function Page() {

  const [classes, setClasses] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${HOST}/api/teacher/getClasses`)
    .then((res) => {
      if(res.data.success) {
        setClasses(res.data.data);
        console.log(res.data.data);
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Something went wrong");
    });
  }, []);

  return (
    <>
      <View style={{padding:10}}>
        <View>
          <Text variant='titleMedium' style={{paddingLeft:10}}>Classes</Text>
          {
            classes.map((classItem) => (
              <ClassCard classItem={classItem} />
            ))
          }
          
        </View>
     </View>
    </>
  )
}

export default Page


function ClassCard({classItem}){
  const startsAt = new Date(classItem.startsAt)
  const today= new Date()
  return (
        <classContext.Provider value={classItem}>
          <Surface elevation={2} style={{width:"100%",height:"auto",marginTop:20,backgroundColor:"lightpink",borderRadius:20, padding:12}}>
              <Link href={{
                pathname:"/teacher/section/[id]",
                params:{id:classItem?.id}
              
              }} >
                <View style={{width:"100%",marginLeft:"auto",marginRight:"auto"}}>
                  <Text variant='titleMedium' style={{textAlign:"center"}}>{classItem?.title}</Text>
                  <View style={{marginTop:10,padding:10}}>
                    <Text variant='titleSmall' style={{textAlign:"left"}}>Start: {startsAt?.toLocaleDateString()!=today.toLocaleDateString()?"Today ":startsAt?.toLocaleDateString()}, {startsAt?.getHours()}:{startsAt?.getMinutes()}</Text>
                  </View>
                </View>
              </Link>
          </Surface>
          </classContext.Provider>
  )
}