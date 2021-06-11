import React from "react";
import firebs from '../../services/firebs';
import { Login2 } from "../Login/Login2";
import "../Login/Login.css"
import Swal from 'sweetalert2'
const imgProfileDefault = "https://firebasestorage.googleapis.com/v0/b/trainingclimb-dcb7a.appspot.com/o/profiles%2FprofileDefault.svg?alt=media&token=30681895-b0ea-41cc-b4f5-431c18678e61";
class LoginView extends React.Component{
    render(){
      return (
          <Login2/>
      )
    }
}
export class Register extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
           email:"",
           username: "",
           password:"",
           confirmpassword:"",
           emailError:"",
           userError:"",
           passwordError:"",
           confirmPasswordError:"",
           imageuser:null,
           accountNoCreated:false
        }
        this.inputFile = React.createRef();  
    }
    clearErrors = () =>{ 
        this.setEmailError('');
        this.setConfirmPasswordError('');
    }
    //Inputs email , username, password and confirm password
    setEmail = (email) => {this.setState({email:email})}
    setUserName = (username) => {this.setState({username:username})}
    setPassword = (password) => {this.setState({password:password})}
    setConfirmPassword = (confirmpassword) => {this.setState({confirmpassword:confirmpassword})}
    //Control Account
    setAccountCreated = (accountNoCreated) => {this.setState({accountNoCreated:accountNoCreated})}
    //Register Errors
    setEmailError = (emailError) => {this.setState({emailError:emailError})}
    setUserError = (userError) => {this.setState({userError:userError})}
    setPasswordError = (passwordError) => {this.setState({passwordError:passwordError})}
    setConfirmPasswordError = (confirmPasswordError) => {this.setState({confirmPasswordError:confirmPasswordError})}
    setNoMatchPassword = (matchpassword) => {this.setState({matchpassword:matchpassword})}
    passwordMatch(){
        if(this.state.password != this.state.confirmpassword){
            this.setConfirmPasswordError("Password doesn't match!");
            return false;
        }else{
            this.setConfirmPasswordError("");
            return true;
        }
    }
    //Function about picture profile
    changeProfile = (image) => {
        this.setState({
            imageuser : image
        })
        const preview = document.getElementById('img-signup-profile');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
          
        reader.addEventListener("load", function () {
            // convert image file to base64 string
              preview.src = reader.result;

        }, false);
          
        if (file) {
              reader.readAsDataURL(file);
        }
        
    }
    //Function button Sign up
    handleSignUp() {
        this.clearErrors();
        if(this.passwordMatch()){
            firebs.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(
                (userCredential) =>{
                    let userUID = userCredential.user.uid
                    let imageProfile  ="";
                    if(this.state.imageuser==null){
                        imageProfile = imgProfileDefault;
                        firebs.database().ref('Users').child(userUID).set({
                            email: this.state.email,  
                            username: this.state.username,
                            imageuser: imageProfile
                    });
                    }else{
                        imageProfile  = this.state.imageuser[0];
                        let storageRef = firebs.storage().ref(`profiles/${imageProfile.name}`);
                        //Add profile picture on storage
                        let uploadTask = storageRef.put(imageProfile);
                        uploadTask.on('state_changed',
                            null,
                            null,
                            () =>{
                                //Get url firestorage to add database training climb
                                firebs.storage().ref('profiles').child(imageProfile.name).getDownloadURL().then((url) => {
                                    //Add data on database training climb
                                    firebs.database().ref('Users').child(userUID).set({
                                            email: this.state.email,  
                                            username: this.state.username,
                                            imageuser: url
                                    });
                                })
                            }
                        )
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Your user has been registered',
                        showConfirmButton: true,
                    })
                    this.setAccountCreated(!this.state.accountNoCreated);
            })
            .catch(err => {
                switch(err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        this.setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        this.setPasswordError(err.message);
                        break;
                }
            })            
        }
    }
    render(){
        return(
            <>
                {this.state.accountNoCreated ? (
                    <LoginView/>
                ):(
                    <section className="login">
                        <div className="containerlogin">
                            <div className="logofather">
                                <label>Training</label>
                                <img className="logo"/>
                                <label>Climb</label>
                            </div>
                            <div className = "logcontainer">
                                <label>Attach Picture</label>
                                <img id="img-signup-profile" className="profile" onClick={() => this.inputFile.current.click()}/>
                                <input style={{ display: "none" }} ref={this.inputFile} onChange={(e) => this.changeProfile(e.target.files)} type="file"/>
                                <label>Email</label>
                                <input type="text" autoFocus required value={this.state.email} onChange={(e) => this.setEmail(e.target.value)}/>
                                <p className="errorMessage">{this.state.emailError}</p>
                                <label>Username</label>
                                <input type="text" autoFocus required value={this.state.username} onChange={(e) => this.setUserName(e.target.value)}/>
                                <p className="errorMessage">{this.state.userError}</p>
                                <label>Password</label>
                                <input type="password" autoFocus required value={this.state.password} onChange={(e) => this.setPassword(e.target.value)}/>
                                <p className="errorMessage">{this.state.passwordError}</p>
                                <label>Confirm Password</label>
                                <input type="password" autoFocus required value={this.state.confirmpassword} onChange={(e) => this.setConfirmPassword(e.target.value)}/>
                                <p className="errorMessage">{this.state.confirmPasswordError}</p>
                                <button className ="btnlogreg" onClick={()=>this.handleSignUp()}>Sign up</button>
                                <div className="container-pass-reg">
                                    <p className="question-account">Have an account? <span className ="account-created" onClick={() => this.setAccountCreated(!this.state.accountNoCreated)}> Sign in</span></p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </>
        )
    }
}