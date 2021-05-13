import "./MyLeadBould.css"
import React from 'react';
import { Card } from '../Card/Card';
import firebs from '../../services/firebs';
import { Button } from 'react-floating-action-button';
import { AddLeadBoulder } from "../AddLeadBoulder/AddLeadBoulder";
export class MyLeadBould extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            myLeadsBoulders : [
                {imagelb:"", 
                imageuser:"",
                indications:"",
                level:"",
                location:"",
                published:"",
                type:""
                }
            ], 
            clickLB: true,
        }
    }
    componentDidMount(){
        console.log("username de mylead"+this.props.username+"y este es su UID "+this.props.userUID)
            let myLeadsBoulders = [];
            firebs.database().ref().child('MyLeadsBoulders').child(this.props.userUID).get().then((snapshot) => {
                snapshot.forEach(snap =>{
                    //console.log("Este es el snap: "+snap.val())
                    myLeadsBoulders.push(snap.val());
                    this.setState({
                        imagelb:myLeadsBoulders[0],
                        imageuser:myLeadsBoulders[1],
                        indications:myLeadsBoulders[2],
                        level: myLeadsBoulders[3],
                        location:myLeadsBoulders[4],
                        publised:myLeadsBoulders[5],
                        type:myLeadsBoulders[6],
                    });
                })
                console.log(this.state.imagelb)
                //console.log(myLeadsBoulders)
            })
    }
    /*getUIDuser = () =>{
        firebs.auth().onAuthStateChanged((userdata) =>{
            if(userdata){
                const userUID = userdata.uid;
               // console.log(userUID)
                this.setState({userUID:this.state.userUID});
            }
        })
    }*/
    handleaddLeadBoulder = () =>{
        this.setState({
            clickLB:false
        })
    }
    render(){
        return(
            <>
            {this.state.clickLB ? (
                <>
                <div>
                    <div>
                        {this.state.myLeadsBoulders.map(data => {
                            console.log("HOLAAAAAAAAAA  "+this.state.imagelb)
                            return(
                                <>
                                    <div className="card-added">
                                    <Card
                                    imageURL={this.state.imagelb}
                                    level={this.state.level}
                                    type={this.state.type}
                                    location={this.state.location}
                                    published={this.state.published}
                                    profile={this.state.imageuser}
                                    iconapp='https://firebasestorage.googleapis.com/v0/b/trainingclimb-dcb7a.appspot.com/o/climberlogo.svg?alt=media&token=a3b4474a-682d-4239-bcc2-30bdb892e872'
                                    />
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
                <div className="add-button-lb">
                    <Button
                    tooltip="Add Lead/Bouldering"
                    icon="fas fa-plus"
                    rotate={true}
                    styles={{backgroundColor: "#5fe46c"}}
                    onClick={this.handleaddLeadBoulder}
                    />
                </div>
                </>
            ):(
                <AddLeadBoulder/>
            )}
            </>
        )
    }
}