import React from 'react';
import "./AddLeadBoulder.css";
import firebs from '../../services/firebs';
export class AddLeadBoulder extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            selectedType: 'Boulder',
            selectedLevel: 'Begginer',
            files:null
        }
        this.typeChange = this.typeChange.bind(this);
        this.levelChange = this.levelChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.showImage = this.showImage.bind(this);
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
    handleChange (files) {
        this.setState({
            files : files
        })
    }
    handleFileUpload(){
        let file  = this.state.files[0];
        let storageRef = firebs.storage().ref(`leadbould/${file.name}`);
        let uploadTask = storageRef.put(file);
        uploadTask.on('state_changed',
            null,
            null,
            () =>{
                let downloadURL = uploadTask.snapshot.downloadURL
            });
    }
    showImage(){
        let storageRef = firebs.storage().ref()
        //let spaceRef = storageRef.child('leadbould/'+this.state.files[0].name)
        storageRef.child('leadbould/'+this.state.files[0].name).getDownloadURL().then((url) => {
            console.log(url)
            document.getElementById('new-img').src=url;
        })
    }
    render(){
        return(
            <div className="container">
                <div className="add-content-lb">
                    <div>             
                        <img id="new-img"/>
                        <input type="file" onChange={(e)=>{this.handleChange(e.target.files)}} />
                        <button onClick={this.handleFileUpload}>upload</button>
                        <button onClick={this.showImage}>Show image</button>
                    </div>  
                    <div>
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
                    <div>
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
                    <div>
                        <label>
                            Location:
                            <input type="text" name="Location" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Indications:
                            <textarea/>
                        </label>
                    </div>
                </div>
            </div>

        )
    }
}