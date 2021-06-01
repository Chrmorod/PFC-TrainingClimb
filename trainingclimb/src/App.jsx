import React from "react";
import { Login2 } from "./components/Login/Login2";
import "./App.css"
class LoginView extends React.Component{
    render(){
      return (
          <Login2/>
      )
    }
}
export class App extends React.Component{
    render(){
        return(
            <LoginView/>
        )
    }
}
  
