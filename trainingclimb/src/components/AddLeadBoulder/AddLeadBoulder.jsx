import React from 'react';
import "./AddLeadBoulder.css";
import firebs from '../../services/firebs';
import { MyLeadBould } from '../MyLeadBoulder/MyLeadBould';
import moment from 'moment';
import Swal from 'sweetalert2'
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
            profile:"",
            level:"",
            location:"",
            published:"",
            type:"",
            indications:"",
            username:this.props.username,
            userUID :this.props.userUID,
            dateadd:""
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
            isCancel:true, 
            clickLB: true
        })
    }
    handleChange (files) {
        this.setState({
            files : files
        })
        const preview = document.getElementById('new-img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
      
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          preview.src = reader.result;
          preview.style.width= "500px";
          preview.style.height= "600px";
          preview.style.marginTop ="2rem";
          const btnInputImg = document.getElementById('btn-img');
          btnInputImg.style.display="none";
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        }
    }
    handleFileUpload(){
        if(this.state.files==null){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Image Lead/Bouldering is mandatory',
            })
        }else{
            let file  = this.state.files[0];
            let storageRef = firebs.storage().ref(`myleadbould/${file.name}`);
            let uploadTask = storageRef.put(file);
            uploadTask.on('state_changed',
                (snapshot) =>{
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress==100){
                        Swal.fire({
                            icon: 'success',
                            title: 'Your Lead/Bouldering has been saved',
                            showConfirmButton: true,
                        })
                    }
                },
                () =>{ 
                    Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    })
                },
                () =>{
                    storageRef.getDownloadURL().then((url) => {
                        let downloadURL = url;
                        //My leads and bouldering part
                        const myleadbould = firebs.database().ref('MyLeadsBoulders/'+this.state.userUID+'/').push({
                             imagelb: downloadURL
                            ,profile: this.props.imageuser
                            ,level: this.state.selectedLevel
                            ,location: this.state.location
                            ,published: this.props.username
                            ,type: this.state.selectedType
                            ,indications:this.state.indications
                            ,dateadd: moment().format("DD/MM/YYYY")
                        });
                        //New leads and bouldering part
                        firebs.database().ref('LeadsBoulders/'+myleadbould.key+'/').set({
                            id: myleadbould.key
                           ,imagelb: downloadURL
                           ,profile: this.props.imageuser
                           ,level: this.state.selectedLevel
                           ,location: this.state.location
                           ,published: this.props.username
                           ,type: this.state.selectedType
                           ,indications:this.state.indications
                           ,dateadd: moment().format("DD/MM/YYYY")
                        });    
                    });
                }
            );
        }
        this.handleCancel()
    }
    render(){
        return(
            <>
                {this.state.isCancel ? (
                        <MyLeadBould 
                         username={this.state.username}
                         userUID={this.state.userUID}
                         imageuser={this.props.imageuser}/>
                ):(
                    <div className="container">
                        <div className="add-content-lb">
                            <div className="cancel-container" onClick={this.handleCancel}>
                                <div className="btn-cancel">X</div>
                            </div>
                            <div className="img-lead-bould-container">             
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
                                            className="radio-btn-add" 
                                            value="Boulder" 
                                            checked={this.state.selectedType ==="Boulder"}
                                            onChange={this.typeChange} />
                                    Boulder
                                </label>
                                <label>
                                        <input type="radio"
                                        className="radio-btn-add" 
                                        value="Lead" 
                                        checked={this.state.selectedType ==="Lead"} 
                                        onChange={this.typeChange}/>
                                        Lead
                                </label>
                            </div>
                            {(this.state.selectedType =="Lead") ? (
                                <div className="levelcontainer">
                                    <p>Lvl:</p>
                                    <label>
                                            <input type="radio" 
                                            className="radio-btn-add"
                                            value="5a" 
                                            checked={this.state.selectedLevel ==="5a"} 
                                            onChange={this.levelChange}/>
                                            5a
                                    </label>
                                    <label>
                                            <input type="radio" 
                                            className="radio-btn-add"
                                            value="5b" 
                                            checked={this.state.selectedLevel ==="5b"} 
                                            onChange={this.levelChange}/>
                                            5b
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="5c" 
                                            checked={this.state.selectedLevel ==="5c"} 
                                            onChange={this.levelChange}/>
                                            5c
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="6a" 
                                            checked={this.state.selectedLevel ==="6a"} 
                                            onChange={this.levelChange}/>
                                            6a
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="6a+" 
                                            checked={this.state.selectedLevel ==="6a+"} 
                                            onChange={this.levelChange}/>
                                            6a+
                                    </label>
                                    <label>
                                            <input type="radio" 
                                            className="radio-btn-add"
                                            value="6b" 
                                            checked={this.state.selectedLevel ==="6b"} 
                                            onChange={this.levelChange}/>
                                            6b
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="6b" 
                                            checked={this.state.selectedLevel ==="6b+"} 
                                            onChange={this.levelChange}/>
                                            6b+
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="6c" 
                                            checked={this.state.selectedLevel ==="6c"} 
                                            onChange={this.levelChange}/>
                                            6c
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="6c+" 
                                            checked={this.state.selectedLevel ==="6c+"} 
                                            onChange={this.levelChange}/>
                                            6c+
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="7a" 
                                            checked={this.state.selectedLevel ==="7a"} 
                                            onChange={this.levelChange}/>
                                            7a
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="7a+" 
                                            checked={this.state.selectedLevel ==="7a+"} 
                                            onChange={this.levelChange}/>
                                            7a+
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="7b" 
                                            checked={this.state.selectedLevel ==="7b"} 
                                            onChange={this.levelChange}/>
                                            7b
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="7b+" 
                                            checked={this.state.selectedLevel ==="7b+"} 
                                            onChange={this.levelChange}/>
                                            7b+
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="7c" 
                                            checked={this.state.selectedLevel ==="7c"} 
                                            onChange={this.levelChange}/>
                                            7c
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="7c+" 
                                            checked={this.state.selectedLevel ==="7c+"} 
                                            onChange={this.levelChange}/>
                                            7c+
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="8a" 
                                            checked={this.state.selectedLevel ==="8a"} 
                                            onChange={this.levelChange}/>
                                            8a
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="8a+" 
                                            checked={this.state.selectedLevel ==="8a+"} 
                                            onChange={this.levelChange}/>
                                            8a+
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="8b" 
                                            checked={this.state.selectedLevel ==="8b"} 
                                            onChange={this.levelChange}/>
                                            8b
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="8b+" 
                                            checked={this.state.selectedLevel ==="8b+"} 
                                            onChange={this.levelChange}/>
                                            8b+
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="8c" 
                                            checked={this.state.selectedLevel ==="8c"} 
                                            onChange={this.levelChange}/>
                                            8c
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="8c+" 
                                            checked={this.state.selectedLevel ==="8c+"} 
                                            onChange={this.levelChange}/>
                                            8c+
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="9a" 
                                            checked={this.state.selectedLevel ==="9a"} 
                                            onChange={this.levelChange}/>
                                            9a
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="9a+" 
                                            checked={this.state.selectedLevel ==="9a+"} 
                                            onChange={this.levelChange}/>
                                            9a+
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="9b" 
                                            checked={this.state.selectedLevel ==="9b"} 
                                            onChange={this.levelChange}/>
                                            9b
                                    </label>
                                </div>
                            ):(
                                <div className="levelcontainer">
                                    <p>Lvl:</p>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="Expert" 
                                            checked={this.state.selectedLevel ==="Expert"} 
                                            onChange={this.levelChange}/>
                                            Expert
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="Medium" 
                                            checked={this.state.selectedLevel ==="Medium"} 
                                            onChange={this.levelChange}/>
                                            Medium
                                    </label>
                                    <label>
                                            <input type="radio"
                                            className="radio-btn-add" 
                                            value="Begginer" 
                                            checked={this.state.selectedLevel ==="Begginer"} 
                                            onChange={this.levelChange}/>
                                            Begginer
                                    </label>
                                </div>
                            )}
                            <div className="locationcontainer">
                                <label>
                                    Location:
                                </label>
                                <div>
                                    <input className="input-location-add" type="text" name="Location" onChange={this.locationChange} />
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
                                <button className="btn-add-lb" onClick={()=>this.handleFileUpload()}>Add Lead/Bouldering</button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}