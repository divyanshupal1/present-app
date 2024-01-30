import React from 'react'
import { router } from 'expo-router';
import axios from 'axios';
import { HOST } from '../constants';
function useSession() {

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        console.log("useSession1")
        axios.get(`${HOST}/api/auth/session`).then((res) => {
        if(res.status == 302) {
            router.replace("/login")
            setUser(null);
            setLoading(false)
        }
        if (res.data.success) {
            setUser(res.data.data);
            setLoading(false)
        }
        }).catch((err) => {
           console.log(err.response.status)
           if(err.response.status == 302) {
            // router.push("/login")
           }
           setLoading(false)
        });

    }, []);

  return {user,loading}
}

export default useSession