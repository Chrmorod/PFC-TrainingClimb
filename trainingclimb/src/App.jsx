import React, {useState, useEffect, Fragment } from "react";
import firebs from './services/firebs';
import { Login } from "./components/Login";
import { Home } from "./components/Home/Home";
import "./App.css"
import {Route, NavLink, Switch, BrowserRouter} from 'react-router-dom';
export function App(){
   //Login User
   const [user, setUser] = useState('');
   //Login UserName
   const[username, setUserName] = useState('');
   //Login Email User
   const [email,setEmail] = useState('');
   //Login Password User
   const [password, setPassword] = useState('');
   //Errors on Login
   const [emailError,setEmailError] = useState('');
   const [passwordError,setPasswordError] = useState('');
   const [accountNoCreated, setAccountCreated] = useState(false);
   //Clear inputs & errors
   const clearInputs = () =>{
       setUserName('');
       setEmail('');
       setPassword('');
   }
   const clearErrors = () =>{
       setUserName('');
       setEmailError('');
       setPasswordError('');
   }
   //handles
   const handleLogin = () =>{
       clearErrors();
       firebs
           .auth()
           .signInWithEmailAndPassword(email,password)
           .catch(err => {
               switch(err.code){
                   case "auth/invalid-email":
                   case "auth/user-disabled":
                   case "auth/user-not-found":
                       setEmailError(err.message);
                       break;
                   case "auth/wrong-password":
                       setPasswordError(err.message);
                       break;
               }
           })
   }
   const handleSignUp = () =>{
       clearErrors();
       firebs
           .auth()
           .createUserWithEmailAndPassword(email,password)
           .then((userCredential)=>{
               const userdata =userCredential.user;
           })
           .catch(err => {
               switch(err.code){
                   case "auth/email-already-in-use":
                   case "auth/invalid-email":
                       setEmailError(err.message);
                       break;
                   case "auth/weak-password":
                       setPasswordError(err.message);
                       break;
               }
           })
           firebs.auth().onAuthStateChanged((userdata) =>{
                if(userdata){
                    const userUID = userdata.uid;
                    firebs.database().ref('Users/'+userUID+"/").set({
                        email: email,  
                        username: username
                    });
                }
            })
   }
   const handleLogout = () =>{
       firebs
       .auth()
       .signOut();
   }
   //Listeners
   const authListener = () =>{
       firebs.auth().onAuthStateChanged(user => {
           if(user){
               clearInputs();
               setUser(user);
           }else{
               setUser("");
           }
           
       })
   }
   //Comprobation
   useEffect(() => {
       authListener();
   }, [])

  return(
    <BrowserRouter>
        <div className="logincontainerfather">
          {user ? (
            <Home handleLogout={handleLogout}/>
          ):(
            <Login 
            username={username}
            setUserName ={setUserName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignUp}
            accountNoCreated={accountNoCreated}
            setAccountCreated={setAccountCreated}
            emailError={emailError}
            passwordError={passwordError}
          />
          )}
        </div>
        <Switch>
            <Route path="/newleadbouldering"/>
            <Route path="/myleadbouldering"/>
            <Route path="/leadboulderingcompleted"/>
            <Route path="/profile"/>
        </Switch>
    </BrowserRouter>
  );
};
