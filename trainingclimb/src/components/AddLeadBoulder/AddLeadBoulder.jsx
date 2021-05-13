import React from 'react';
import "./AddLeadBoulder.css";
import firebs from '../../services/firebs';
import { MyLeadBould } from '../MyLeadBoulder/MyLeadBould';
export class AddLeadBoulder extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            selectedType: 'Boulder',
            selectedLevel: 'Begginer',
            files:null,
            isCancel:false,
            imagelb:"",
            imageuser:"",
            level:"",
            location:"",
            published:"",
            type:"",
            indications:"",
        }
        this.typeChange = this.typeChange.bind(this);
        this.levelChange = this.levelChange.bind(this);
        this.locationChange = this.locationChange.bind(this);
        this.indicationsChange = this.indicationsChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.fileInput = React.createRef();
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
            isCancel:true
        })
    }
    handleChange (files) {
        this.setState({
            files : files
        })
        const preview = document.querySelector('img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
      
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          preview.src = reader.result;
          const btnInputImg = document.getElementById('btn-img');
          btnInputImg.style.display="none";
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        }
    }
    handleFileUpload(){
        let file  = this.state.files[0];
        let storageRef = firebs.storage().ref(`myleadbould/${file.name}`);
        let uploadTask = storageRef.put(file);
        uploadTask.on('state_changed',
            null,
            null,
            () =>{
                storageRef.getDownloadURL().then((url) => {
                    let downloadURL = url;
                    firebs.auth().onAuthStateChanged((userdata) =>{
                        if(userdata){
                            const userUID = userdata.uid;
                            firebs.database().ref().child('Users').child(userUID).get().then((snapshot) => {
                                const username = snapshot.val().username;
                                firebs.database().ref('MyLeadsBoulders/'+userUID+"/").set({
                                    imagelb: downloadURL,
                                    imageuser: "https://firebasestorage.googleapis.com/v0/b/trainingclimb-dcb7a.appspot.com/o/profiles%2Fprofiledefault.png?alt=media&token=47977950-2113-4f52-a9f9-134e80090379"
                                    ,level: this.state.selectedLevel
                                    ,location: this.state.location
                                    ,published: username
                                    ,type: this.state.selectedType
                                    ,indications:this.state.indications
                                });
                            })    
                        }
                    })
                });
            }
        );
    }
    render(){
        return(
            <>
                {this.state.isCancel ? (
                        <MyLeadBould/>
                ):(
                    <div className="container">
                        <div className="add-content-lb">
                            <div className="cancel-container">
                                <div className="btn-cancel" onClick={this.handleCancel}>X</div>
                            </div>
                            <div>             
                                <img id="new-img" onClick={() => this.fileInput.current.click()}/>
                                <input type="file" onChange={(e)=>{this.handleChange(e.target.files)}} ref={this.fileInput} style={{ display: "none" }}/>
                            </div>
                            <div className="btncontaineradd">
                                <button id="btn-img" className="btninputfile" onClick={() => this.fileInput.current.click()}>Choose File</button>
                            </div>  
                            <div className="typecontainer">
                                <p>Type:</p>
                                <label>
                                    <input type="radio" 
                                            value="Boulder" 
                                            checked={this.state.selectedType ==="Boulder"}
                                            onChange={this.typeChange} />
                                    Boulder
                                </label>
                                <label>
                                        <input type="radio" 
                                        value="Lead" 
                                        checked={this.state.selectedType ==="Lead"} 
                                        onChange={this.typeChange}/>
                                        Lead
                                </label>
                            </div>
                            <div className="levelcontainer">
                                <p>Lvl:</p>
                                <label>
                                        <input type="radio" 
                                        value="Expert" 
                                        checked={this.state.selectedLevel ==="Expert"} 
                                        onChange={this.levelChange}/>
                                        Expert
                                </label>
                                <label>
                                        <input type="radio" 
                                        value="Medium" 
                                        checked={this.state.selectedLevel ==="Medium"} 
                                        onChange={this.levelChange}/>
                                        Medium
                                </label>
                                <label>
                                        <input type="radio" 
                                        value="Begginer" 
                                        checked={this.state.selectedLevel ==="Begginer"} 
                                        onChange={this.levelChange}/>
                                        Begginer
                                </label>
                            </div>
                            <div className="locationcontainer">
                                <label>
                                    Location:
                                </label>
                                <div>
                                    <input type="text" name="Location" onChange={this.locationChange} />
                                </div>
                            </div>
                            <div className="indicationscontainter">
                                <label>
                                    Indications:
                                </label>
                                <div>
                                    <textarea onChange={this.indicationsChange}/>
                                </div>

                            </div>
                            <div className="btncontaineradd">
                                <button className="btn-add-lb" onClick={this.handleFileUpload}>Add Lead/Bouldering</button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}