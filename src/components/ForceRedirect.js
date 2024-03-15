import React from 'react'
// import { Navigate } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
const ForceRedirect = ({user, children}) =>{
  // console.log(user)
    if(user.isConnected && user.isAdmin){

        return <Redirect to="/admin" replace/>
      }else if (user.isConnected && user.isPartner ){

        return <Redirect to="/partner" replace/>
      }
      return children
}

export default ForceRedirect