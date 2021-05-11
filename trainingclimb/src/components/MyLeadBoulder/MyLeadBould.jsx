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
        this.state = {myLeadsBoulders : [], clickLB: true}

    }
    componentDidMount(){
        const myLeadBoulderRef = firebs.database().ref("MyLeadsBoulders");
        myLeadBoulderRef.on("value", snapshot => {
            let myLeadsBoulders = [];
            snapshot.forEach(snap =>{
                myLeadsBoulders.push(snap.val());
            })
            this.setState({myLeadsBoulders:myLeadsBoulders});
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
                <div>
                     <div>
                        {this.state.myLeadsBoulders.map(data => {
                         return(
                                <Card
                                imageURL={data.imagelb}
                                level={data.level}
                                type={data.type}
                                location={data.location}
                                published={data.published}
                                profile={data.imageuser}
                                 iconapp='https://firebasestorage.googleapis.com/v0/b/trainingclimb-dcb7a.appspot.com/o/climberlogo.svg?alt=media&token=a3b4474a-682d-4239-bcc2-30bdb892e872'
                                />
                        )
                        })}
                    </div>
                    <div className="add-button-lb">
                        <Button
                        tooltip="Add Lead/Bouldering"
                        icon="fas fa-plus"
                        rotate={true}
                        onClick={this.handleaddLeadBoulder}
                        />
                    </div>
                </div>
            ):(
                <AddLeadBoulder/>
            )}
            </>
        )
    }
}