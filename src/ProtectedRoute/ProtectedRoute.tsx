import  { useContext } from 'react'
import { AuthContext } from '../Modules/AuthModule/context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function protedtedRoute(props:any) {
   let {userData}:any= useContext(AuthContext)
  
    if(localStorage.getItem('userToken') || userData){
        
return props.children
    }else{
        return<Navigate to={'/login'}/>
    }
  

}
