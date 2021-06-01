import React from "react";
import firebs from '../../services/firebs';
import "./Login.css"
import { Register } from "../Register/Register";
import { Home2 } from "../Home/Home2";
import { BrowserRouter } from 'react-router-dom';
class RegisterView extends React.Component{
    render(){
      return (
          <Register/>
      )
    }
}
class HomeView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            image: "",
            userUID:""
        }
    }
    componentDidMount(){
        this.setState({
            email: this.props.email,
            password: this.props.password,
            username: this.props.username,
            image: this.props.image,
            userUID:this.props.userUID
        })
    }
    render(){
      return (
          <Home2
          email={this.state.email}
          password={this.state.password}
          username={this.state.username}
          image={this.state.image}
          userUID={this.state.userUID}/>
      )
    }
}
export class Login2 extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
           email:"",
           password:"",
           emailError:"",
           passwordError:"",
           username: "",
           imageuser:"",
           user:"",
           accountNoCreated:false
        }
        
    }
    clearErrors = () =>{ 
        this.setEmailError('');
        this.setPasswordError('');
    }
    clearInputs = () =>{
        this.setEmail("");
        this.setPassword("");
    }
    authListener = () =>{
        firebs.auth().onAuthStateChanged(user => {
            if(user){
                this.clearInputs();
                this.setUser(user);
            }else{
                this.setUser("");
            }
            
        })
    }
    //Inputs email and password
    setEmail = (email) => {this.setState({email:email})}
    setPassword = (password) => {this.setState({password:password})}
    //Comprobation about exist user
    setUser = (user) => {this.setState({user:user})}
    //Data transfered to Home View
    setUserName =(username) => {this.setState({username:username})}
    setImage = (imageuser) => {this.setState({imageuser:imageuser})}
    setUserUID = (userUID) => {this.setState({userUID:userUID})}
    //Control Account
    setAccountCreated = (accountNoCreated) => {this.setState({accountNoCreated:accountNoCreated})}
    //Login Errors
    setEmailError = (emailError) => {this.setState({emailError:emailError})}
    setPasswordError = (passwordError) => {this.setState({passwordError:passwordError})}
    //Function button login
    handleLogin(){
        firebs.database().ref().off();
        this.clearErrors();
        firebs.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
            (userCredential)=>{
                const userUID = userCredential.user.uid;
                //Data to manage account yourself
                this.setEmail(this.state.email);
                this.setPassword(this.state.password);
                //Retrieve data (img profile, username) from database TrainingClimb
                firebs.database().ref().child('Users').child(userUID).get().then((snapshot) =>{
                    const userName = snapshot.val().username;
                    const imageUserLogin = snapshot.val().imageuser;
                    //Transfer data to HomeView
                    this.setUserName(userName);
                    this.setImage(imageUserLogin);
                    this.setUserUID(userUID);
                    //Validate auth user to enter HomeView
                    this.authListener();
                    this.setUser("");
                }).catch(err => {
                    switch(err.code){
                        case "auth/invalid-email":
                        case "auth/user-disabled":
                        case "auth/user-not-found":
                            this.setEmailError(err.message);
                        break;
                        case "auth/wrong-password":
                            this.setPasswordError(err.message);
                        break;
                    }
                })
            }
        )
    }
    render(){
        return(
        <>
            {this.state.accountNoCreated ? (
                <RegisterView/>
            ):(
                <>
                {this.state.user ? (
                    <BrowserRouter>
                        <HomeView
                        email = {this.state.email}
                        password = {this.state.password}
                        username={this.state.username}
                        image={this.state.imageuser}
                        userUID={this.state.userUID}
                        />
                    </BrowserRouter>
                ):(
                    <section className="login">
                        <div className="containerlogin">
                            <div className="logofather">
                                <label>Training</label>
                                <img className="logo"/>
                                <label>Climb</label>
                            </div>
                            <div className = "btncontainer">
                                <label>Email</label>
                                <input type="text" autoFocus required value={this.state.email} onChange={(e) => this.setEmail(e.target.value)}/>
                                <p className="errorMessage">{this.state.emailError}</p>
                                <label>Password</label>
                                <input type="password" autoFocus required value={this.state.password} onChange={(e) => this.setPassword(e.target.value)}/>
                                <p className="errorMessage">{this.state.passwordError}</p>
                                <button className ="btnlogreg" onClick={()=> this.handleLogin()}>Sign in</button>
                                <p>Don't have account? 
                                    <span onClick={() => this.setAccountCreated(!this.state.accountNoCreated)}> Sign up</span>
                                </p>
                            </div>
                        </div>
                    </section>
                )}
                </>
            )}
        </>
        )
    }
}