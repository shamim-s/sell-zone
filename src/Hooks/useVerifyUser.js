import React, { useEffect, useState } from 'react';

const useVerifyUser = (email) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        fetch(`https://sell-zone-server.vercel.app/jwt?email=${email}`)
        .then(res => res.json())
        .then(data => {
            if(data.accessToken){
                localStorage.setItem('userAccessToken', data.accessToken);
                setToken(data.accessToken);
            }
        })
    },[email])

    return [token];
}
export default useVerifyUser;