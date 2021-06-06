import React from 'react';
import "./NewLeadBould.css"
import { Card } from '../Card/Card'
import firebs from '../../services/firebs';
import { Details } from '../Details/Details';
const logoAPP='https://firebasestorage.googleapis.com/v0/b/trainingclimb-dcb7a.appspot.com/o/climberlogo.svg?alt=media&token=a3b4474a-682d-4239-bcc2-30bdb892e872';
const colornav ="#999999";
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
            ,clicknavall:colornav
            ,clicknavlead:colornav
            ,clicknavboulder:colornav
        }
    }
    componentDidMount(){
        this.handleAll();
    }
    handleDetails = (id) =>{
        this.setState({
            id:id,
            clickDetails:true
        })
    }
    handleLeads = () =>{
        let leadsBoulders = new Array();
        const leadBoulderRef = firebs.database().ref().child("LeadsBoulders");
        leadBoulderRef.get().then((snapshot) => {
            if(snapshot.val() != null){
                snapshot.forEach(snap =>{
                    console.log(snap.val().type)
                    if(snap.val().type === "Lead"){
                        leadsBoulders.push(snap.val());
                        this.setState({nodata:false});
                        this.setState({leadsBoulders:leadsBoulders});
                    }
                })
            }
        })
    }
    handleBoulder = () =>{
        let leadsBoulders = new Array();
        const leadBoulderRef = firebs.database().ref().child("LeadsBoulders");
        leadBoulderRef.get().then((snapshot) => {
            if(snapshot.val() != null){
                snapshot.forEach(snap =>{
                    console.log(snap.val().type)
                    if(snap.val().type === "Boulder"){
                        leadsBoulders.push(snap.val());
                        this.setState({nodata:false});
                        this.setState({leadsBoulders:leadsBoulders});
                    }
                })
            }
        })
    }
    handleAll = () =>{
        let leadsBoulders = new Array();
        const leadBoulderRef = firebs.database().ref().child("LeadsBoulders");
        leadBoulderRef.get().then((snapshot) => {
            if(snapshot.val() != null){
                snapshot.forEach(snap =>{
                    leadsBoulders.push(snap.val());
                })
                this.setState({nodata:false});
                this.setState({leadsBoulders:leadsBoulders});
            }
        })
    }
    handleColor = (color, item) => {
        if(item==="all"){
            this.setState({
                clicknavall:color,
                clicknavlead:colornav,
                clicknavboulder:colornav
            })
        }else if(item==="boulder"){
            this.setState({
                clicknavall:colornav,
                clicknavlead:colornav,
                clicknavboulder:color
            })
        }else{
            this.setState({
                clicknavall:colornav,
                clicknavlead:color,
                clicknavboulder:colornav
            })
        }

    }
    render(){
        //Define my array with concat because my sort will mutate the original array
        const myData = [].concat(this.state.leadsBoulders);
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
                        <>
                        <nav className="navbar-news">
                            <div className="nav-container-news">
                                <ul className="nav-menu-news">
                                    <li className="nav-item-news" style={{color:this.state.clicknavall}} onClick={() => {this.handleAll(); this.handleColor("#5fe46c", "all")}}>All</li>
                                    <li className="nav-item-news" style={{color:this.state.clicknavlead}} onClick={() => {this.handleLeads(); this.handleColor("#5fe46c", "lead")}}>Leads</li>
                                    <li className="nav-item-news" style={{color:this.state.clicknavboulder}} onClick={() => {this.handleBoulder(); this.handleColor("#5fe46c", "boulder")}}>Bouldering</li>
                                </ul>
                            </div>
                        </nav>                       
                        <div className="leadboulders-container">
                            <div className="band">
                                {myData.sort((a,b)=> a.dateadd < b.dateadd ? 1:-1).map((data, i) => {
                                    return(
                                        <div key={i} className="card-added-newleads" onClick={() => this.handleDetails(data.id)}>
                                            <Card
                                            key={i}
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
                        </>
                    )}
                </>
            )}
            </>
        )
    }
}
