import React, { createContext, useState } from 'react'
import { useContext } from 'react'

export let userToken=createContext();
export default function UserTokenProvider(props) {
    const [Token, setToken] = useState(null)
 
    return (
        <>
        <userToken.Provider value={{userToken ,Token,setToken}}>
            {props.children}
        </userToken.Provider>
            
        </>
    )
}
