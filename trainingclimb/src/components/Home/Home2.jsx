import React from 'react';
import firebs from '../../services/firebs';
import "../Home/Home.css"
import {NavLink, Switch, Route, Redirect} from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { NewLeadBould } from "../NewLeadBoulder/NewLeadBould";
import { MyLeadBould } from '../MyLeadBoulder/MyLeadBould';
import { Profile } from "../Profile/Profile";
    /*Classes Type*/
    class NewLeadBouldView extends React.Component{
      render(){
        return (
            <NewLeadBould/>
        )
      }
  }
  class MyLeadBouldView extends React.Component{
      render(){
        return (
            <MyLeadBould 
            username={this.props.username}
            userUID={this.props.userUID}
            imageuser={this.props.imageuser}/>
        )
      }
  }
  class ProfileView extends React.Component{
      constructor(props){
        super(props)
      }
      render(){
        return (
            <Profile
            username ={this.props.username}
            email={this.props.email}
            password={this.props.password}/>
        )
      }
  }
export class Home2 extends React.Component
{
  constructor(props){
    super(props)
    this.state = {
      click:false,
    }

  }
  setClick = (click) => {this.setState({click:click})}
  handleLogout(){
    firebs.auth().signOut();
    firebs.database().ref().off();
  }
  render(){
    return(
      <>
          <div className="header-home">
              <img className ="profileHome" src={this.props.image}/>
              <p className="msgWelcome">Welcome {this.props.username}!</p>
          </div>
          <nav className="navbar">
                  <div className="nav-container">
                      <ul className={this.state.click ? "nav-menu active" : "nav-menu"}>
                          <li className="nav-item"><NavLink to="/newleadbouldering" className="nav-links" activeClassName="active">New Lead/Bouldering</NavLink></li>
                          <li className="nav-item"><NavLink to="/myleadbouldering" className="nav-links" activeClassName="active">My Lead/Bouldering</NavLink></li>
                          {/*<li className="nav-item"><NavLink to="/leadboulderingcompleted" className="nav-links" activeClassName="active">Lead/Bouldering Completed</NavLink></li>*/}
                          <li className="nav-item"><NavLink to="/profile" className="nav-links" activeClassName="active">Profile</NavLink></li>
                          <li className="container-btn-logout">
                            <NavLink to="/"><button className="btnLogout" onClick={() => this.handleLogout()}>Logout <AiOutlineLogout/></button></NavLink>
                          </li>
                      </ul>
                      <div className="nav-icon" onClick={() => this.setClick(!this.state.click)}>
                          {/*Add script on index.html */}
                          <i className={this.state.click ? "fas fa-times" : "fas fa-bars" }></i>
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
                        username={this.props.username}
                        userUID={this.props.userUID}
                        imageuser={this.props.image}/>
                    </Route>
                    <Route path={'/profile'}>
                        <ProfileView
                        username={this.props.username}
                        email={this.props.email}
                        password={this.props.password}
                        />
                    </Route>
                    <Route exact path={'/'}>
                      <NewLeadBouldView/>
                    </Route>
                    <Redirect to={'/'}/>
                </Switch>
          </div>
      </>
  )
  }
}

