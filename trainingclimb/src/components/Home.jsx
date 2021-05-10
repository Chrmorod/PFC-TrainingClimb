import React, { Fragment } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import "./Home.css"
import { NewLeadBould } from './NewLeadBould';
class NewLeadBouldView extends React.Component{
    render(){
      return (
        <div>
          <NewLeadBould></NewLeadBould>
        </div>
      )
    }
}
export function Home(props) {
    const {
        handleLogout
    } = props;
    return(
        <Fragment>
            <nav class="container">
                    <div className="menu-control">
                        <ul>
                            <li><div className="pictureuser"><a className="nameuser">Username</a></div></li> 
                            <li><button className="bntlogout" onClick={handleLogout}><a>Logout <AiOutlineLogout/></a></button></li>
                        </ul>
                    </div>
                    <div className="menu-nav">
                        <ul>
                            <li><a><NavLink to="/profile" activeClassName="menu-active">Profile</NavLink></a></li>
                            <li><a><NavLink to="/leadboulderingcompleted" activeClassName="menu-active">Lead/Bouldering Completed</NavLink></a></li>
                            <li><a><NavLink to="/myleadbouldering" activeClassName="menu-active">My Lead/Bouldering</NavLink></a></li>
                            <li><a><NavLink to="/newleadbouldering" activeClassName="menu-active">New Lead/Bouldering</NavLink></a></li>
                        </ul>
                    </div>
            </nav>
            <section className="home">
                <Switch>
                    <Route path={'/newleadbouldering'}>
                        <NewLeadBouldView/>
                    </Route>
                </Switch>
            </section>
        </Fragment>

    )
}

