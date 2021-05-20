import React from 'react';
import firebs from '../../services/firebs';
import "../Profile/Profile.css"
export class Profile extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password:"",
            currentPassword:"",
            newPassword:"",
            confirmPassword:"",
            photoURL:"",
            msgVerificationError:"",
            msgPasswordMatch:""
        }
    }
    componentDidMount(){
        this.setState({username:this.props.username});
        this.setState({email:this.props.email});
        this.setState({password:this.props.password});
        this.handleGetImageProfile();
    }
    handlePasswordVerify(currentPassword){
        let msgVerificationError = "";
        if(currentPassword == this.state.password){
                msgVerificationError = "Password Verify!";
        }else if((currentPassword != this.state.password) && (currentPassword.length == this.state.password.length)){
                msgVerificationError = "Wrong Password";
        }
        this.setState({
            currentPassword:currentPassword,
            msgVerificationError:msgVerificationError
        })

    }
    handleNewPassword(newPassword){
        this.setState({
            newPassword:newPassword
        })
    }
    handleConfirmPassword(confirmPassword){
        let msgPasswordMatch = "";
        if (confirmPassword == this.state.newPassword){
            msgPasswordMatch ="Password Match!"
        }else if((confirmPassword != this.state.newPassword) && (confirmPassword.length == this.state.newPassword.length)){
            msgPasswordMatch="Password doesn't match!"
        }
        this.setState({
            confirmPassword:confirmPassword,
            msgPasswordMatch:msgPasswordMatch
        })
    }
    handleUpdateProfile(){
        console.log(this.state.confirmPassword);
        let user = firebs.auth().currentUser;
        user.updatePassword(this.state.confirmPassword);
        //firebs.auth().signInWithEmailAndPassword(this.state.email,this.state.confirmPassword);
        //Avisar de que la contraseña se ha actualizado
    }
    handleGetImageProfile(){
        console.log("Holaaa!")
        let user = firebs.auth().currentUser;
        if(user != null){
            let userUID =user.uid;
            firebs.database().ref().child('Users').child(userUID).get().then((snapshot) => {
                let photoURL= snapshot.val().image;
                this.setState({
                    photoURL: photoURL
                })
            })
        }
    }
    render(){
        return(
            <>
            <div className="container-header-profile">
                <div className="header-item-profile">
                    <p>Picture</p>
                    <img className="picture-profile" src={this.state.photoURL}/>
                </div>
                <div className="header-item-profile">
                    <p>Personal Data</p>
                    <div className="profile-input">
                        <input placeholder={this.state.email} readOnly></input>
                        <input placeholder={this.state.username} readOnly></input>
                    </div>

                </div>
                <div className="header-item-profile">
                    <p>Security</p>
                    <div className="profile-input">
                        <input type="password" placeholder="Current Password" value={this.state.currentPassword} onChange={(e) =>this.handlePasswordVerify(e.target.value)}></input>
                        <p>{this.state.msgVerificationError}</p>
                        <input type="password" placeholder="New Password" value={this.state.newPassword} onChange={(e) =>this.handleNewPassword(e.target.value)}></input>
                        <input type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={(e) =>this.handleConfirmPassword(e.target.value)}></input>
                        <p>{this.state.msgPasswordMatch}</p>
                    </div>
                </div>
            </div>
            <div className="container-btn-update"><button onClick={()=>this.handleUpdateProfile()}>Update</button></div>
            </>
        )
    }
}
