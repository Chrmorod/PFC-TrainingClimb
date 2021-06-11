import React from "react";
import "./ForgotPassword.css"
import {Login2} from "../Login/Login2"
import firebs from '../../services/firebs';
import Swal from 'sweetalert2';
class LoginView extends React.Component{
    render(){
      return (
          <Login2
          forgotpassword={this.props.forgotpassword}/>
      )
    }
}
export class ForgotPassword extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
           email:"",
           forgotpassword:this.props.forgotpassword
        } 
    }
    handleCancel(){
        this.setgo2Login(false);
    }
    sendEmail = () =>{
        firebs.auth().sendPasswordResetEmail(this.state.email);
        Swal.fire({
            icon: 'success',
            title: 'Email sent!',
            showConfirmButton: true,
        })
        this.setgo2Login(false);
    }
    setEmail = (email) => {this.setState({email:email})}
    setgo2Login = (forgotpassword) => {this.setState({forgotpassword:forgotpassword})}
    render(){
        return(
            <>
            {this.state.forgotpassword ? (
                <section className="forgotpassword">
                    <div className = "btncontainer-forgot">
                        <div className="logofather-forgot">
                            <label>Training</label>
                            <img className="logo"/>
                            <label>Climb</label>
                        </div>
                        <div className="title-email-sended">Enter your email and we'll send you a link to get back into your account:</div>
                            <input className="input-email-sended" placeholder="Email" type="text" autoFocus required value={this.state.email} onChange={(e) => this.setEmail(e.target.value)}/>
                            <div className="send-email">
                            <button className="btn-send-email" onClick={() => this.sendEmail()}>Send Email</button>
                        </div>
                        <div className="send-email">
                            <button className="btn-cancel-forgot" onClick={() => this.handleCancel()}>Cancel</button>
                        </div>
                    </div>
                </section>

            ):(
                <LoginView
                forgotpassword={this.state.forgotpassword}/>
            )}
            </>
        )
    }
}