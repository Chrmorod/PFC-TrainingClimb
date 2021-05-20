import React, {useState } from 'react';
import "../Home/Home.css"
import {NavLink, Switch, Route} from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { NewLeadBould } from "../NewLeadBoulder/NewLeadBould";
import { MyLeadBould } from '../MyLeadBoulder/MyLeadBould';
import { Profile } from "../Profile/Profile";

export function Home(props) {
    const {
        handleLogout,
        email,
        password,
        username,
        userUID,
        image
    } = props;
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    /*Classes Type*/
    class NewLeadBouldView extends React.Component{
        render(){
          return (
            <div>
              <NewLeadBould></NewLeadBould>
            </div>
          )
        }
    }
    class MyLeadBouldView extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
              username:username,
              userUID:userUID
            }
        }
        componentDidMount(){
          console.log("Este es el user "+this.state.username)
          this.setState({username:this.state.username})
          this.setState({userUID:this.state.userUID})
        }
        render(){
          return (
            <div>
              <MyLeadBould 
              username={username}
              userUID={userUID}/>
            </div>
          )
        }
    }
    class ProfileView extends React.Component{
          constructor(props) {
            super(props);
            this.state = {
              username:username,
              password:password,
              email:email
            }
        }
        componentDidMount(){
         this.setState({email:this.state.email})
         this.setState({username:this.state.username})
         this.setState({password:this.state.password})
        }
        render(){
          return (
            <div>
              <Profile
              username ={username}
              email={email}
              password={password}/>
            </div>
          )
        }
    }
    return(
        <>
            <div className="header-home">
                <img className ="profileHome" src={image}/>
                <p className="msgWelcome">Welcome {username}!</p>
            </div>
            <nav className="navbar">
                    <div className="nav-container">
                        <ul className={click ? "nav-menu active" : "nav-menu"}>
                            <li className="nav-item"><NavLink to="/newleadbouldering" className="nav-links" activeClassName="active">New Lead/Bouldering</NavLink></li>
                            <li className="nav-item"><NavLink to="/myleadbouldering" className="nav-links" activeClassName="active">My Lead/Bouldering</NavLink></li>
                            <li className="nav-item"><NavLink to="/leadboulderingcompleted" className="nav-links" activeClassName="active">Lead/Bouldering Completed</NavLink></li>
                            <li className="nav-item"><NavLink to="/profile" className="nav-links" activeClassName="active">Profile</NavLink></li>
                            <li><div className="btnLogout" onClick={handleLogout}>Logout <AiOutlineLogout/></div></li>
                        </ul>
                        <div className="nav-icon" onClick={handleClick}>
                            {/*Add script on index.html */}
                            <i className={click ? "fas fa-times" : "fas fa-bars" }></i>
                        </div>
                    </div>
            </nav>
            <div className="content">
                <Switch>
                    <Route path={'/newleadbouldering'}>
                        <NewLeadBouldView/>
                    </Route>
                    <Route path={'/myleadbouldering'}>
                        <MyLeadBouldView
                        username={username}
                        userUID={userUID}/>
                    </Route>
                    <Route path={'/profile'}>
                        <ProfileView
                        username={username}
                        email={email}
                        password={password}
                        />
                    </Route>
                </Switch>
            </div>
        </>
    )
}

