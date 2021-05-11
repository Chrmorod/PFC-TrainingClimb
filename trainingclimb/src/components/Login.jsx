import React, {Fragment, useRef, useState} from "react";
import firebs from '../services/firebs';
import "./Login.css"
export function Login(props) {
   const {
          username,
          setUserName,
          email, 
          setEmail, 
          password, 
          setPassword, 
          handleLogin, 
          handleSignup, 
          accountNoCreated, 
          setAccountCreated, 
          emailError, 
          passwordError
    } = props;
    const [image, setImage] = useState("");
    const inputFile = useRef(null);
    const changeProfile = () => {
        inputFile.current.click();
    }
    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
          const filename = files[0].name;
          const file = files[0];
          var parts = filename.split(".");
          const fileType = parts[parts.length - 1];
          console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
    
          setImage(URL.createObjectURL(files[0]));
          const storageRef=firebs.storage().ref(`profiles/${filename}`)
          storageRef.put(file);
        }
    };
  return (
    <Fragment>
    <section className="login">
        <div className="containerlogin">
            <div className="logofather">
                <label>Training</label>
                <img className="logo"/>
                <label>Climb</label>
            </div>
            <div className = "btncontainer">
                {accountNoCreated ? (
                    <>
                        <label>Attach Picture</label>
                        <img className="profile" onClick={changeProfile} src={image}/>
                        <input style={{ display: "none" }} ref={inputFile}  onChange={handleFileUpload} type="file"/>
                        <label>Email</label>
                        <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <p className="errorMessage">{emailError}</p>
                        <label>Username</label>
                        <input type="text" autoFocus required value={username} onChange={(e) => setUserName(e.target.value)}/>
                        <p className="errorMessage">{emailError}</p>
                        <label>Password</label>
                        <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <p className="errorMessage">{passwordError}</p>
                        <label>Confirm Password</label>
                        <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <p className="errorMessage">{passwordError}</p>
                        <button onClick={handleSignup}>Sign up</button>
                        <p>Have an account? 
                            <span onClick={() => setAccountCreated(!accountNoCreated)}> Sign in</span>
                        </p>
                    </>
                ):(
                    <>
                        <label>Email</label>
                        <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <p className="errorMessage">{emailError}</p>
                        <label>Password</label>
                        <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <p className="errorMessage">{passwordError}</p>
                        <button onClick={handleLogin}>Sign in</button>
                        <p>Don't have account? 
                            <span onClick={() => setAccountCreated(!accountNoCreated)}> Sign up</span>
                        </p>
                    </>
                )}
            </div>
        </div>
    </section>
    </Fragment>

  )
}
