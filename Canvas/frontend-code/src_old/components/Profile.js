import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import validateToken from './Auth'

class Profile extends React.Component {
    constructor(){
        super();

        this.state = {
            name : null,
            phone_number : null,
            about_me : null,
            city : null,
            country : null,
            company : null,
            school : null,
            hometown : null,
            language : null,
            gender : null,
            profile_pic : null,
            message: null,
            alertClass : null,
            first : true,
            profile_src : null,
        }

        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.aboutMeChangeHandler = this.aboutMeChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
        this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
        this.languageChangeHandler = this.languageChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentDidMount(){
        console.log("Inside componentDidMount")
        axios.get('http://18.191.237.120:3001/profile',{ headers: { token: localStorage.getItem("token") } })
                .then((response) => {
                //update the state with the response data
                console.log(response.data.user);
                this.setState(response.data.user);
                if (response.data.user.profile_pic){
                    this.state.profile_src = ("http://18.191.237.120:3001/"+response.data.user.profile_pic).toString()
                }
                else{
                    this.state.profile_src = "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg"
                }
                console.log('State',this.state)
                console.log(this.state.profile_src);
            });
    }

    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone_number : e.target.value
        })
    }
    
    aboutMeChangeHandler = (e) => {
        this.setState({
            about_me : e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }

    countryChangeHandler = (e) => {
        this.setState({
            country : e.target.value
        })
    }

    companyChangeHandler = (e) => {
        this.setState({
            company : e.target.value
        })
    }

    schoolChangeHandler = (e) => {
        this.setState({
            school : e.target.value
        })
    }

    hometownChangeHandler = (e) => {
        this.setState({
            hometown : e.target.value
        })
    }

    languageChangeHandler = (e) => {
        this.setState({
            language : e.target.value
        })
    }

    genderChangeHandler = (e) => {
        this.setState({
            gender : e.target.value
        })
    }

    profilepicHandler = event => {
        // console.log(event.target.files[0]);
        this.setState({
            profile_pic : event.target.files[0]
        })
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profile_pic_preview").src = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        // console.log("State",this.state);
        var data = new FormData()
        data.append("name",this.state.name)
        data.append('phone_number',this.state.phone_number)
        data.append('about_me',this.state.about_me)
        data.append('city',this.state.city)
        data.append('company',this.state.company)
        data.append('school',this.state.school)
        data.append('hometown',this.state.hometown)
        data.append('language',this.state.language)
        data.append('gender',this.state.gender)
        data.append('profile_pic',this.state.profile_pic,this.state.profile_pic.name);
        
        console.log("Request ",data)
        axios.post('http://18.191.237.120:3001/profile',data,{ headers: { token: localStorage.getItem("token") }})
            .then(response => {
                console.log("Response",response.data);
                if(response.status === 200){
                    this.setState({
                        alertClass : "alert alert-success",
                        message : response.data.message,
                        first : false,
                    })
                }else{
                    this.setState({
                        alertClass : "alert alert-danger",
                        message : response.data.message,
                        first : false,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    alertClass : "alert alert-danger",
                    message : error.response.data.message,
                    first : false,
                })
                
            });
    }

    render() {
        validateToken();

        return (
            <div>
                <div className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body" style={{width:"40%",marginLeft:"30%"}}>
                        <h5 class="card-title">Profile</h5>
                        <div class={this.state.alertClass} style={{display: this.state.first ? "none" : "block"}}>
                            <small>
                                {this.state.message}
                            </small>
                        </div><hr></hr>
                        <form enctype="multipart/form-data">
                            <div className="form-group">
                                <img id="profile_pic_preview" src={this.state.profile_pic} alt="profile" style={{width:"135px",height:"135px"}}/>
                                <input type="file" class="form-control-file" name="profile_pic" id="profile_pic" onChange={this.profilepicHandler} accept="image/*" style={{marginLeft:"263px"}} />
                            </div><hr></hr>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Name" onChange = {this.nameChangeHandler} value={this.state.name}/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Phone" onChange = {this.phoneChangeHandler} value={this.state.phone_number} />
                            </div>
                            <div className="form-group">
                                <textarea class="form-control" rows="3" placeholder="About Me" onChange = {this.aboutMeChangeHandler} value={this.state.about_me} ></textarea>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="City" onChange = {this.cityChangeHandler} value={this.state.city} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Country" onChange = {this.countryChangeHandler} value={this.state.country} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Company" onChange = {this.companyChangeHandler} value={this.state.company} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="School" onChange = {this.schoolChangeHandler} value={this.state.school} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Hometown" onChange = {this.hometownChangeHandler} value={this.state.hometown} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Langauge" onChange = {this.languageChangeHandler} value={this.state.language} />
                            </div>
                            <div className="form-group">
                                <select class="custom-select custom-select-lg mb-3" onChange = {this.genderChangeHandler} value={this.state.gender}>
                                    <option selected></option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button style={{backgroundColor:"#007dc1",color:"#fff",width:"42%",marginLeft:"28%",marginTop:"6%"}} className="form-control" onClick = {this.submitLogin}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )}
}

export default Profile;