import React from 'react';
import "./NewLeadBould.css"
import { Card } from '../Card/Card'
import firebs from '../../services/firebs';
export class NewLeadBould extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {leadsBoulders : []}
    }
    componentDidMount(){
        const leadBoulderRef = firebs.database().ref("LeadsBoulders");
        leadBoulderRef.on("value", snapshot => {
            let leadsBoulders = [];
            snapshot.forEach(snap =>{
                leadsBoulders.push(snap.val());
            })
            this.setState({leadsBoulders:leadsBoulders});
        })
    }
    render(){
        return(
                <div>
                    {this.state.leadsBoulders.map(data => {
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
        )
    }
}
