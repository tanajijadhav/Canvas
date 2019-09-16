import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router'
import {connect} from "react-redux"
import { withRouter } from "react-router";

import {writeLogin} from "../actions/loginActions"
import {postLogin} from "../actions/loginActions"

class Login extends React.Component {
    constructor(){
        super();

        // this.state = {
        //     email: "",
        //     password : "",
        //     message: null,
        //     alertClass : null,
        //     first : true,
        //     success : false,
        //     is_faculty : null,
        // }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.facultyRadioClickHandler = this.facultyRadioClickHandler.bind(this);
        this.studentRadioClickHandler = this.studentRadioClickHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    usernameChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeLogin(data);

        // this.setState({
        //     email : e.target.value
        // })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.writeLogin(data);
        // this.setState({
        //     password : e.target.value
        // })
    }

    facultyRadioClickHandler = (e) => {
        // console.log("CHnaging",e.target.value)
        if (e.target.value == "on"){
            let data = {
                "is_faculty" : true
            }
            this.props.writeLogin(data);
            // this.setState({
            //     is_faculty : true
            // })
        }
        else{
            let data = {
                "is_faculty" : false
            }
            this.props.writeLogin(data);
            // this.setState({
            //     is_faculty : false
            // })
        }
    }

    studentRadioClickHandler = (e) => {
        // console.log("CHnaging",e.target.value)
        if (e.target.value == "on"){
            // this.setState({
            //     is_faculty : false
            // })
            let data = {
                "is_faculty" : false
            }
            this.props.writeLogin(data);
        }
        else{
            // this.setState({
            //     is_faculty : true
            // })
            let data = {
                "is_faculty" : true
            }
            this.props.writeLogin(data);
        }
    }

    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.props.login.email,
            password : this.props.login.password,
            is_faculty : this.props.login.is_faculty,
        }
        this.props.postLogin(data,()=>{
            this.props.history.push("/home");
        });
        // console.log("Submit function",data);
        //make a post request with the user data
        
    }

    render() {
        
        let login = this.props.login ||{};

        var email_pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        // console.log(this.state)
        // if (this.state.message){
        //     this.setState({
        //         alertClass : "alert alert-success",
        //         first : false,
        //         success : true,
        //         message : this.props.location.state.message
        //     })   
        // }
        return (
                <div className="container-fluid" style={{backgroundColor:"#f5f5f5"}}>
                    <div className="login-div-center shadow p-3 mb-5 bg-white rounded" style={{border:"groove",borderWidth:"0.5px",backgroundColor:"white",padding:"30px"}}>
                        <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7"></img><hr></hr>
                        <div style={{width:"90%",marginLeft:"17px"}}>
                            <p style={{fontWeight:500,color:"#5e5e5e"}}>Sign In</p>

                            <div class={login.alertClass} style={{display: login.first ? "none" : "block"}}>
                                <small>
                                   {login.message}
                                </small>
                            </div>

                            <div className="form-group">
                                <input type="email" name="email" className="form-control" placeholder="Username" onChange = {this.usernameChangeHandler} pattern={{email_pattern}} required/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" placeholder="Password" onChange = {this.passwordChangeHandler} required/>
                            </div>
                            <div className="form-group small">
                                <div className="custom-control custom-radio custom-control-inline" style={{paddingRight:"110px"}}>
                                    <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" onClick = {this.facultyRadioClickHandler}/>
                                    <label className="custom-control-label" for="customRadioInline1" style={{fontWeight:500,color:"#5e5e5e"}}>Faculty</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" onClick = {this.studentRadioClickHandler}/>
                                    <label className="custom-control-label" for="customRadioInline2" style={{fontWeight:500,color:"#5e5e5e"}}>Student</label>
                                </div>  
                            </div>
                            <div className="form-group">
                                <button style={{backgroundColor:"#007dc1",color:"#fff"}} className="form-control" onClick = {this.submitLogin}>Sign In</button>
                            </div>
                            <div className="form-group">
                                <label class="form-check-label" style={{fontSize:"16px"}}><Link to="/register">Register</Link></label>
                            </div>
                        </div>
                    </div>
                </div>
    )}
}

const mapStateToProps = (state) => {
    return {
      login :  (state.login||{}).login,
    //   error: (state.authReducer||{}).error,
    }
  }
  Login = connect(
    mapStateToProps,
    {postLogin, writeLogin}
  )(Login)
  export default withRouter(Login);