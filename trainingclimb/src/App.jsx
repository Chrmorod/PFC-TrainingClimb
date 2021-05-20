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
   //Login userUID
   const[userUID,setUserUID] = useState('');
   //Login Email User
   const [email,setEmail] = useState('');
   //Login Password User
   const [password, setPassword] = useState('');
   // Login Image User Profile
   const [image, setImage] = useState("");
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
           .then((userCredential) => {
               const userUID =userCredential.user.uid;
               setUserUID(userUID);
               firebs.database().ref().child('Users').child(userUID).get().then((snapshot) => {
                   const username = snapshot.val().username;
                   const image = snapshot.val().image;
                   setUserName(username);
                   //Send email and password to Home
                   setEmail(email)
                   setPassword(password)
                   setImage(image);
               })
           })
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
           .then(()=>{
                firebs.auth().onAuthStateChanged((userdata) =>{
                    if(userdata){
                        console.log("este es el UID APPJSX"+ userdata.uid)
                        const userUID = userdata.uid;
                        firebs.database().ref('Users/'+userUID+"/").set({
                            email: email,  
                            username: username,
                            image: image
                        });
                        setUserUID(userUID);
                        setUserName(username);
                    }
                    /*firebs.database().ref().child('Users').child(userUID).get().then((snapshot) => {
                        const username = snapshot.val().username;
                        setUserName(username);
                    })*/
                })
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
            <Home 
            handleLogout={handleLogout}
            username={username}
            userUID={userUID}
            image={image}
            email={email}
            password={password}/>
          ):(
            <Login 
            image ={image}
            setImage={setImage}
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
