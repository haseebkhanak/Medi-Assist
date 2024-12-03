import { useContext,createContext, useState } from "react";
const Navcontext=createContext()

export const UseNavContext = ()=> useContext(Navcontext)

export const contextProvider=({children})=>{
    const [navType,setNavType]=useState()
    return(
        <Navcontext.Provider value={{navType,setNavType}}>
            {children}
        </Navcontext.Provider>
    )
}