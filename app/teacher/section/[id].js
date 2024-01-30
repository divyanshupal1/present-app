import { router, useLocalSearchParams } from 'expo-router';
import { Button, Icon, Text, MD3Colors ,ActivityIndicator,MD2Colors,PaperProvider,Portal,Modal,Surface } from 'react-native-paper'
import axios from 'axios';
import { HOST } from '../../../constants';
import { View } from 'react-native';
import { classContext } from '..';
import useSession from '../../../hooks/useSession';
import React from 'react';
import { Link } from 'expo-router';

export default function Page(){

    const { id } = useLocalSearchParams();
    const classItem = React.useContext(classContext);
    const {user,loading} = useSession();
    const [sections,setSections] = React.useState([])

    React.useEffect(() => {
        if(!loading && !user) {
            router.replace("/login")
        }
    },[])

    React.useEffect(() => {
        axios.get(`${HOST}/api/teacher/getSections/${id}`).then((res) => {
            if(res.data.success) {
                setSections(res.data.data)
                console.log("section",res.data.data)
            }
        }).catch((err) => {
            console.log(err)
            alert("Something went wrong")
        })
    },[])
    console.log(classItem)

    return (
        <>
            <View style={{padding:10}}>
                <View>
                    <Text variant='titleMedium' style={{paddingLeft:10}}>Sections</Text>
                    {
                        sections.map((section) => (
                            <SectionCard section={section} classId={id} />
                        ))
                    }
                </View>
            </View>
        </>
    )
    
}

function SectionCard({section,classId}){

    return (
        <Surface elevation={2} style={{width:"100%",height:"auto",marginTop:20,backgroundColor:"lightpink",borderRadius:20, padding:12}}>
        <Link href={{
          pathname:"/teacher/attendance/[id]",
          params:{id:`${section?.id}/${classId}`}
        
        }} >
          <View style={{width:"100%",marginLeft:"auto",marginRight:"auto"}}>
            <Text variant='titleMedium' style={{textAlign:"center"}}>{section?.name}</Text>
          </View>
        </Link>
    </Surface>
    )
}