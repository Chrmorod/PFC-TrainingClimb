import React from 'react';
import "../Details/Details.css";
import firebs from '../../services/firebs';
import { NewLeadBould } from '../NewLeadBoulder/NewLeadBould';
export class Details extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            selectedType: 'Boulder',
            selectedLevel: 'Begginer',
            files:null,
            isCancel:false,
            imagelb:"",
            profile:"",
            level:"",
            location:"",
            published:"",
            type:"",
            indications:"",
            username:"",
            userUID :"",
            dateadd:""
        }
        this.typeChange = this.typeChange.bind(this);
        this.levelChange = this.levelChange.bind(this);
        this.locationChange = this.locationChange.bind(this);
        this.indicationsChange = this.indicationsChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount(){
        const details = firebs.database().ref('LeadsBoulders/'+this.props.id);
        details.get().then((snapshot) => {
            const preview = document.getElementById('new-img');
            preview.src=snapshot.val().imagelb;
            this.setState({
                selectedLevel: snapshot.val().level,
                selectedType: snapshot.val().type,
                location: snapshot.val().location,
                indications: snapshot.val().indications
            })
        })
    }
    typeChange(e){
        this.setState({
            selectedType:  e.currentTarget.value
        })
    }
    levelChange(e){
        this.setState({
            selectedLevel: e.currentTarget.value
        })
    }
    locationChange(e){
        this.setState({
            location: e.currentTarget.value
        })
    }
    indicationsChange(e){
        this.setState({
            indications: e.currentTarget.value
        })
    }
    handleCancel(){
        this.setState({
            isCancel:true, 
            clickLB: true
        })
    }
    render(){
        return(
            <>
                {this.state.isCancel ? (
                        <NewLeadBould/>
                ):(
                    <div>
                            <div className="cancel-container-details" onClick={this.handleCancel}>
                                <div className="btn-cancel-details">X</div>
                            </div>
                            <div className="img-lead-bould-container">             
                                <img className="img-lead-bould" id="new-img"/>
                            </div>
                            <div className="typecontainer-detail">
                                <p className="title-details">Type:</p>
                            </div>
                            <div className="typecontainer-detail">
                                <textarea readOnly value={this.state.selectedType}/>
                            </div>
                            <div className="levelcontainer-detail">
                                <p className="title-details">Lvl:</p>
                            </div>
                            <div className="levelcontainer-detail">
                                <textarea readOnly value={this.state.selectedLevel}/>
                            </div>
                            <div className="locationcontainer-detail">
                                <p className="title-details">Location:</p>
                            </div>
                            <div className="locationcontainer-detail">
                                <textarea readOnly value={this.state.location}/>
                            </div>
                            <div className="indicationscontainter-details">
                                <p className="title-details">Indications:</p>
                            </div>
                            <div className="indicationscontainter-details">
                                <textarea readOnly value={this.state.indications} onChange={this.indicationsChange}/>
                            </div>
                    </div>
                )}
            </>
        )
    }
}