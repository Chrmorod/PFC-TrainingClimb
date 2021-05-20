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
                {id : { 
                    imagelb:"", 
                    imageuser:"",
                    indications:"",
                    level:"",
                    location:"",
                    published:"",
                    type:""
                    }
                }
            ], 
            clickLB: true,
        }
    }
    componentDidMount(){
            const dbRef = firebs.database().ref().child('MyLeadsBoulders').child(this.props.userUID);
            dbRef.get().then((snapshot) => {
                console.log("este es el snapshot primero" +snapshot.key)
                let myLeadsBoulders =[];
                snapshot.forEach(snap =>{
                    console.log("Este es el snap key: "+snap.length)
                    dbRef.child(snap.key).get().then(snap2 => {
                        console.log("Este es el snap2: "+snap2.val().type)
                        myLeadsBoulders.push(snap2.val());
                        console.log("Este es el array" +this.state.myLeadsBoulders)
                        this.setState({
                            myLeadsBoulders: myLeadsBoulders
                        })
                    })
                })
                //Aqui cuenta 0
                //console.log(myLeadsBoulders.length)
            })


    }
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
                    <div className="add-button-lb">
                        <Button
                        tooltip="Add Lead/Bouldering"
                        icon="fas fa-plus"
                        rotate={true}
                        styles={{backgroundColor: "#5fe46c"}}
                        onClick={this.handleaddLeadBoulder}
                        />
                    </div>
                    <div>
                        {this.state.myLeadsBoulders.map(data => {
                            //Con length: cuenta 1 en this.state.myLeadsBoulders.length
                            if(data.imagelb===undefined){
                                return(
                                    <div className="noDataMylb"><p>No data added</p></div>
                                )
                            }
                            console.log("datos "+this.state.myLeadsBoulders.length)
                                return(
                                    <>
                                        <div className="card-added">
                                            <Card
                                            imageURL={data.imagelb}
                                            level={data.level}
                                            type={data.type}
                                            location={data.location}
                                            published={data.published}
                                            profile={data.imageuser}
                                            iconapp='https://firebasestorage.googleapis.com/v0/b/trainingclimb-dcb7a.appspot.com/o/climberlogo.svg?alt=media&token=a3b4474a-682d-4239-bcc2-30bdb892e872'
                                            />
                                        </div>
                                    </>
                                )
                            
                        })}
                    </div>
                </div>
                </>
            ):(
                <AddLeadBoulder
                 username ={this.props.username}
                 userUID ={this.props.userUID}
                 clickLB ={this.state.clickLB}/>
            )}
            </>
        )
    }
}