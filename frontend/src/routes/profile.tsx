import { googleLogout, TokenResponse, useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useEffect, useState } from "react"

interface IUserInfoResponse {
    id: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
}


const Profile = () => {
    const [user, setUser] = useState<TokenResponse | null>()
    const [profile, setProfile] = useState<IUserInfoResponse | null>()

    const login = useGoogleLogin({
        onSuccess: (codeResponse: TokenResponse) => setUser(codeResponse) as void,
        onError: (error) => console.log('login failed:', error),
        
    })

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data as IUserInfoResponse)
                    })
                    .catch((err) => console.log(err))
                }
        },
        [ user ]
    )

    const logOut = () => {
        googleLogout();
        setProfile(null as any)
    }

    return (
        <>
            <h2>Profile</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt='user pic' />
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                    <button onClick={() => login()}>Sign in with Google</button>
            )}
        </>
    )
}

export default Profile