import { router, useLocalSearchParams } from 'expo-router';
import { Button, Icon,Divider, Text, MD3Colors ,ActivityIndicator,MD2Colors,PaperProvider,Portal,Modal,Surface } from 'react-native-paper'
import axios from 'axios';
import { HOST } from '../../../constants';
import { View } from 'react-native';
import { classContext } from '..';
import useSession from '../../../hooks/useSession';
import React from 'react';
import { Link } from 'expo-router';


export default function Page(){

    const { id } = useLocalSearchParams();
    const {user,loading} = useSession();
    const [sections,setSections] = React.useState(null)

    React.useEffect(() => {
        if(!loading && !user) {
            router.replace("/login")
        }
    },[])

    React.useEffect(() => {
        axios.get(`${HOST}/api/teacher/getAttendance/${id}/`).then((res) => {
            if(res.data.success) {
                setSections(res.data.data)
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
                    <Text variant='titleMedium' style={{marginBottom:10,textAlign:"center"}}>Attendance</Text>
                    { sections &&
                        Object.keys(sections).map((date) => (
                            <SectionCard date={date} data={sections} />
                        ))
                    }
                </View>
            </View>
        </>
    )
    
}

function SectionCard({date,data}){

    return (
        <View>
            <Divider />
            <Text variant='titleMedium' style={{paddingLeft:10,marginTop:10,marginBottom:10}}>{date}</Text>
            <View >
                <Divider />
                {
                    data[date].map((item) => (
                        <>                        
                        <Text variant='titleMedium' style={{padding:15}}>{item.username}</Text>
                        </>
                    ))
                }
            </View>
        </View>
    )
}