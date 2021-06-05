import React from 'react';
import "./NewLeadBould.css"
import { Card } from '../Card/Card'
import firebs from '../../services/firebs';
import { Details } from '../Details/Details';
const logoAPP='https://firebasestorage.googleapis.com/v0/b/trainingclimb-dcb7a.appspot.com/o/climberlogo.svg?alt=media&token=a3b4474a-682d-4239-bcc2-30bdb892e872';
export class NewLeadBould extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            leadsBoulders : [
                {id : { 
                    imagelb:"", 
                    profile:"",
                    dateadd:"",
                    indications:"",
                    level:"",
                    location:"",
                    published:"",
                    type:"", 
                    }
                }
            ] 
            ,clickDetails:false
            ,nodata:true
        }
    }
    async componentDidMount(){
        let leadsBoulders = new Array();
        const leadBoulderRef = firebs.database().ref().child("LeadsBoulders");
        await leadBoulderRef.get().then((snapshot) => {
            console.log(snapshot.val())
            if(snapshot.val() != null){
                snapshot.forEach(snap =>{
                    leadsBoulders.push(snap.val());
                })
                this.setState({nodata:false});
                this.setState({leadsBoulders:leadsBoulders});
            }
        })
    }
    handleDetails = (id) =>{
        this.setState({
            id:id,
            clickDetails:true
        })
    }
    render(){
        return(
            <>
            {this.state.clickDetails ? (
                <Details
                id={this.state.id}/>
            ):(
                <>
                    {this.state.nodata ? (
                        <p className="noDataMylb">No data added</p>
                    ):(
                        <div className="leadboulders-container">
                            <div className="band">
                                {this.state.leadsBoulders.map(data => {
                                    return(
                                        <div className="card-added-newleads" onClick={() => this.handleDetails(data.id)}>
                                            <Card
                                            className="card-item"
                                            id={data.id}
                                            imageURL={data.imagelb}
                                            dateadd={data.dateadd}
                                            level={data.level}
                                            type={data.type}
                                            location={data.location}
                                            published={data.published}
                                            profile={data.profile}
                                            iconapp={logoAPP}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}
            </>
        )
    }
}
