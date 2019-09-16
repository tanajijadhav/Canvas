import React, { StrictMode } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from "react-redux"
import { withRouter } from "react-router";

import validateToken from './Auth'
import SideBar from './Sidebar';
import {getProfile} from "../actions/profileActions"
import {writeProfile} from "../actions/profileActions"
import {postProfile} from "../actions/profileActions"

// connect((store) => {
//     return {
//         profile : store.profile
//     };
// })

class Profile extends React.Component {
    constructor(){
        super();

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
        this.profile_pic = this.profilepicHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentDidMount(){
        this.props.getProfile();
    }

    nameChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeProfile(data);
    }

    phoneChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeProfile(data);
    }
    
    aboutMeChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeProfile(data);
    }

    cityChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeProfile(data);
    }

    countryChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeProfile(data);
    }

    companyChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeProfile(data);
    }

    schoolChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeProfile(data);
    }

    hometownChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeProfile(data);
    }

    languageChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeProfile(data);
    }

    genderChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeProfile(data);
    }

    profilepicHandler = event => {
        // console.log(event.target.files[0]);
        let data = {
            [event.target.name] : event.target.files[0]
        }
        this.props.writeProfile(data);

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
        console.log("State",this.props.profile);
        var data = new FormData()
        data.append("name",this.props.profile.name)
        data.append('phone_number',this.props.profile.phone_number)
        data.append('about_me',this.props.profile.about_me)
        data.append('city',this.props.profile.city)
        data.append('country',this.props.profile.country)
        data.append('company',this.props.profile.company)
        data.append('school',this.props.profile.school)
        data.append('hometown',this.props.profile.hometown)
        data.append('language',this.props.profile.language)
        data.append('gender',this.props.profile.gender)
        data.append('profile_pic',this.props.profile.profile_pic);

        console.log("data sending to post \n",data)

        this.props.postProfile(data);
    }

    render() {

        let user = this.props.profile ||{};

        return (
            <div>
                {validateToken()}
                <SideBar />
                <div className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body" style={{width:"40%",marginLeft:"30%"}}>
                        <h5 class="card-title">Profile</h5>
                        <div class={user.alertClass} style={{display: user.first ? "none" : "block"}}>
                            <small>
                                {user.message}
                            </small>
                        </div><hr></hr>
                        <form enctype="multipart/form-data">
                            <div className="form-group">
                                <img id="profile_pic_preview" src={`${user.profile_pic}`} alt="profile" style={{width:"400px",height:"400px"}}/>
                                <input type="file" class="form-control-file" name="profile_pic" id="profile_pic" onChange={this.profilepicHandler} accept="image/*" style={{marginLeft:"263px"}} />
                            </div><hr></hr>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Name" onChange = {this.nameChangeHandler} name="name" value={user.name}/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Phone" onChange = {this.phoneChangeHandler} name="phone_number" value={user.phone_number} />
                            </div>
                            <div className="form-group">
                                <textarea class="form-control" rows="3" placeholder="About Me" onChange = {this.aboutMeChangeHandler} name="about_me" value={user.about_me} ></textarea>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="City" onChange = {this.cityChangeHandler} name="city" value={user.city} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Country" onChange = {this.countryChangeHandler} name="country" value={user.country} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Company" onChange = {this.companyChangeHandler} name="company" value={user.company} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="School" onChange = {this.schoolChangeHandler} name="school" value={user.school} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Hometown" onChange = {this.hometownChangeHandler} name="hometown" value={user.hometown} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Langauge" onChange = {this.languageChangeHandler} name="language" value={user.language} />
                            </div>
                            <div className="form-group">
                                <select class="custom-select custom-select-lg mb-3" onChange = {this.genderChangeHandler} name="gender" value={user.gender}>
                                    <option value="" disabled selected>Gender</option>
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

const mapStateToProps = (state) => {
    return {
      profile :  (state.profile||{}).profile,
    //   error: (state.authReducer||{}).error,
    }
  }
  Profile = connect(
    mapStateToProps,
    {getProfile, writeProfile, postProfile}
  )(Profile)
  export default withRouter(Profile);
