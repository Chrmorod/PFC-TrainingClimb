import React from 'react';
import firebs from '../../services/firebs';
export class Details extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            selectedType: 'Boulder',
            selectedLevel: 'Begginer',
            files:null,
            isCancel:false
        }
        this.typeChange = this.typeChange.bind(this);
        this.levelChange = this.levelChange.bind(this);
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
        let storageRef = firebs.storage().ref(`leadbould/${file.name}`);
        let uploadTask = storageRef.put(file);
        uploadTask.on('state_changed',
            null,
            null,
            () =>{
                let downloadURL = uploadTask.snapshot.downloadURL
                console.log(downloadURL);
            }
        );
    }
    render(){
        return(
            <div className="container">
                <div className="add-content-lb">
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
                            <input type="text" name="Location" />
                        </div>
                    </div>
                    <div className="indicationscontainter">
                        <label>
                            Indications:
                        </label>
                        <div>
                            <textarea/>
                        </div>

                    </div>
                    <div className="btncontaineradd">
                        <button className="btn-add-lb" onClick={this.handleFileUpload}>Update Lead/Bouldering</button>
                    </div>
                </div>

            </div>

        )
    }
}