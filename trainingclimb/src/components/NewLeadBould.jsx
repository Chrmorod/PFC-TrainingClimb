import "./Login.css"
import React from 'react';
import { Card } from './Card'
export class NewLeadBould extends React.Component
{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                <Card
                imageURL='https://firebasestorage.googleapis.com/v0/b/trainingclimb-dcb7a.appspot.com/o/imgexample.jpg?alt=media&token=e6bf866d-6546-4c1a-ab9a-bd338560f99e'
                level='6b+'
                type='Lead'
                location='Bunker'
                published='ToniClimber'
                profile='../images/profileDefault.svg'
                iconapp='../images/climberlogo.svg'
                />
                <Card
                imageURL='https://firebasestorage.googleapis.com/v0/b/trainingclimb-dcb7a.appspot.com/o/imgexample.jpg?alt=media&token=e6bf866d-6546-4c1a-ab9a-bd338560f99e'
                level='6b+'
                type='Lead'
                location='Bunker'
                published='ToniClimber'
                profile='../images/profileDefault.svg'
                iconapp='../images/climberlogo.svg'
                />
		    </div>
        )
    }
}
