import "./MyLeadBould.css"
import React from 'react';
import { Card } from '../Card/Card';
import firebs from '../../services/firebs';
import { Button } from 'react-floating-action-button';
import { AddLeadBoulder } from "../AddLeadBoulder/AddLeadBoulder";
import { ModLeadBoulder } from '../ModLeadBoulder/ModLeadBoulder';
const logoAPP='https://firebasestorage.googleapis.com/v0/b/trainingclimb-dcb7a.appspot.com/o/climberlogo.svg?alt=media&token=a3b4474a-682d-4239-bcc2-30bdb892e872';

export class MyLeadBould extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
           myLeadsBoulders : [], 
            clickLB: true,
            id: "",
            username:this.props.username,
            userUID : this.props.userUID,
            imageuser: this.props.imageuser,
            clickModificate:false,
            nodata:true
        }
    }
    componentDidMount(){
            const dbRef = firebs.database().ref().child('MyLeadsBoulders').child(this.props.userUID);
            dbRef.on('value', snapshot => { 
                if(snapshot.val()!==null){
                    this.setState({nodata:false});
                    this.setState({...this.state.myLeadsBoulders, myLeadsBoulders:snapshot.val()});
                }else{
                    this.setState({myLeadsBoulders:[]})
                }
            })
    }
    handleaddLeadBoulder = () =>{
        this.setState({
            clickLB:false
        })
    }
    handleModification = (id) =>{
        this.setState({
            id:id,
            clickModificate:true
        })
    }
    render(){
        return(
            <>
            {this.state.clickModificate ? (
                <ModLeadBoulder
                username ={this.state.username}
                userUID ={this.state.userUID}
                imageuser={this.state.imageuser}
                id={this.state.id}
                />
            ):(
                <>
                {this.state.clickLB ? (
                    <>
                        <div className="add-button-lb">
                            <Button
                            tooltip="Add Lead/Bouldering"
                            icon="fas fa-plus"
                            rotate={true}
                            styles={{backgroundColor: "#5fe46c"}}
                            onClick={this.handleaddLeadBoulder}
                            />
                        </div>
                        {this.state.nodata ? (
                                <p className="noDataMylb">No data added</p>
                            ):(
                                <div className="band">
                                {Object.keys(this.state.myLeadsBoulders).sort((a,b)=> this.state.myLeadsBoulders[a].dateadd < this.state.myLeadsBoulders[b].dateadd ? 1:-1).map( i => {
                                        return(
                                            <div key={i} className="card-added" onClick={() => this.handleModification(i)}>
                                                <Card
                                                className="card-item"
                                                key={i}
                                                id={i}
                                                imageURL={this.state.myLeadsBoulders[i].imagelb}
                                                dateadd={this.state.myLeadsBoulders[i].dateadd}
                                                level={this.state.myLeadsBoulders[i].level}
                                                type={this.state.myLeadsBoulders[i].type}
                                                location={this.state.myLeadsBoulders[i].location}
                                                published={this.state.myLeadsBoulders[i].published}
                                                profile={this.state.myLeadsBoulders[i].profile}
                                                iconapp={logoAPP}
                                                />
                                            </div>
                                        )
                                })}
                            </div>
                        )}
                    </>
                ):(
                    <AddLeadBoulder
                     username ={this.props.username}
                     userUID ={this.props.userUID}
                     imageuser={this.props.imageuser}
                    clickLB ={this.state.clickLB}/>
                )}
                </>
            )}
            </>
        )
    }
}