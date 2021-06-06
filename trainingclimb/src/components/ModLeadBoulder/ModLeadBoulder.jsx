import React from 'react';
import "./ModLeadBoulder.css";
import firebs from '../../services/firebs';
import { MyLeadBould } from '../MyLeadBoulder/MyLeadBould';
import moment from 'moment';
import Swal from 'sweetalert2'
export class ModLeadBoulder extends React.Component
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
        this.handleChange = this.handleChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.fileInput = React.createRef();
    }
    componentDidMount(){
        const details = firebs.database().ref('MyLeadsBoulders/'+this.props.userUID+'/'+this.props.id);
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
                (snapshot) =>{
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress==100){
                        Swal.fire({
                            icon: 'success',
                            title: 'Your Lead/Bouldering has been updated',
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
                        firebs.database().ref('MyLeadsBoulders/'+this.props.userUID+'/'+this.props.id).update({
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
                        firebs.database().ref('LeadsBoulders/'+this.props.id+'/').update({
                            imagelb: downloadURL
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
            this.handleCancel();
    }
    handleDeleteFile(){
        const swalWithBootstrapButtons = Swal.mixin({
            buttonsStyling: true
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your Lead/Bouldering has been deleted.',
                'success'
              )
              const deleterefimgLB = firebs.database().ref('LeadsBoulders/'+this.props.id);
              const deleterefimgMyLB = firebs.database().ref('MyLeadsBoulders/'+this.props.userUID+'/'+this.props.id);
              //Delete on database
              deleterefimgMyLB.remove();
              deleterefimgLB.remove();
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your Lead/Bouldering continue save :)',
                'error'
              )
            }
        })
        this.handleCancel();
    }
    render(){
        return(
            <>
                {this.state.isCancel ? (
                        <MyLeadBould 
                         username={this.props.username}
                         userUID={this.props.userUID}
                         imageuser={this.props.imageuser}/>
                ):(
                    <div className="container">
                        <div className="add-content-lb">
                            <div className="cancel-container">
                                <div className="btn-cancel" onClick={this.handleCancel}>X</div>
                            </div>
                            <div className="img-lead-bould-container">             
                                <img className="img-lead-bould" id="new-img" onClick={() => this.fileInput.current.click()}/>
                                <input type="file" onChange={(e)=>{this.handleChange(e.target.files)}} ref={this.fileInput} style={{ display: "none" }}/>
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
                                    <input className="input-location-add" value={this.state.location} type="text" name="Location" onChange={this.locationChange} />
                                </div>
                            </div>
                            <div className="indicationscontainter">
                                <label>
                                    Indications:
                                </label>
                                <div>
                                    <textarea value={this.state.indications} onChange={this.indicationsChange}/>
                                </div>

                            </div>
                            <div className="btncontainerupdate">
                                <button className="btn-upd-lb" onClick={()=>this.handleFileUpload()}>Update Lead/Bouldering</button>
                            </div>
                            <div className="btncontainerdelete">
                                <button className="btn-del-lb" onClick={()=>this.handleDeleteFile()}>Delete Lead/Bouldering</button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}