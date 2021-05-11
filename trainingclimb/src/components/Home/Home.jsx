import React, {useState } from 'react';
import "../Home/Home.css"
import {NavLink, Switch, Route} from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { NewLeadBould } from "../NewLeadBoulder/NewLeadBould";
import { MyLeadBould } from '../MyLeadBoulder/MyLeadBould';

export function Home(props) {
    const {
        handleLogout
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
        render(){
          return (
            <div>
              <MyLeadBould></MyLeadBould>
            </div>
          )
        }
    }
    return(
        <>
            <nav className="navbar">
                    <div className="nav-container">
                        <ul className={click ? "nav-menu active" : "nav-menu"}>
                            <li className="nav-item"><NavLink to="/newleadbouldering" className="nav-links" activeClassName="active">New Lead/Bouldering</NavLink></li>
                            <li className="nav-item"><NavLink to="/myleadbouldering" className="nav-links" activeClassName="active">My Lead/Bouldering</NavLink></li>
                            <li className="nav-item"><NavLink to="/leadboulderingcompleted" className="nav-links" activeClassName="active">Lead/Bouldering Completed</NavLink></li>
                            <li className="nav-item"><NavLink to="/profile" className="nav-links" activeClassName="active">Profile</NavLink></li>
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
                        <MyLeadBouldView/>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

