import { Slot } from 'expo-router';
import { Appbar } from 'react-native-paper';
import React from 'react';
import useSession from '../../hooks/useSession';
import axios from 'axios';
import { HOST } from '../../constants';
import { router } from 'expo-router';

export default function HomeLayout() {

  const {user,loading} = useSession()

  function logout() {
    axios.get(`${HOST}/api/auth/logout`).then((res) => {
      if(res.data.success) {
        router.push("/login")
      }
    })
  }

  React.useEffect(() => {
    if(!loading && !user){
      router.replace("/login")
    }
  },[loading])


  return (
    <>
        <Appbar.Header>
            <Appbar.Content title={user?.username} />
            <Appbar.Action icon="logout" onPress={() => logout() } />
        </Appbar.Header>
        <Slot />
    </>


  );
}