import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

class Register extends React.Component {
    constructor(){
        super();

        this.state = {
            name: null,
            password : null,
            email : null,
            is_faculty : null,
            message: null,
            alertClass : null,
            first : true,
            success : false,
        }

        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.facultyRadioClickHandler = this.facultyRadioClickHandler.bind(this);
        this.studentRadioClickHandler = this.studentRadioClickHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    // ableButton = () => {
    //     if (this.state.name != null && this.state.password != null &&this.state.email != null){
    //         document.getElementById("RegisterButton").disabled = false;
    //     }
    // }

    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
        // this.ableButton();
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
        // this.ableButton();
    }

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
        // this.ableButton();
    }

    facultyRadioClickHandler = (e) => {
        if (e.target.value == "on"){
            this.setState({
                is_faculty : true
            })
        }
        else{
            this.setState({
                is_faculty : false
            })
        }
    }

    studentRadioClickHandler = (e) => {
        if (e.target.value == "on"){
            this.setState({
                is_faculty : false
            })
        }
        else{
            this.setState({
                is_faculty : true
            })
        }
    }


    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name : this.state.name,
            password : this.state.password,
            email : this.state.email,
            is_faculty : this.state.is_faculty,
        }
        //make a post request with the user data
        axios.post('http://18.191.237.120:3001/register',data)
            .then(response => {
                // console.log("Try")console
                // console.log("Status Code : ",response.data);
                if(response.status === 200){
                    this.setState({
                        alertClass : "alert alert-success",
                        message : response.data.message,
                        first : false,
                        success : true,
                    })
                    document.getElementById("name").value = null;
                    document.getElementById("password").value = null;
                    document.getElementById("email").value = null;
                    // console.log("If m ")
                    // this.props.history.push({
                    //     pathname: '/login',
                    //     state: { message: this.state.message }
                    // })
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
        var email_pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return (
                <div className="container-fluid" style={{backgroundColor:"#f5f5f5"}}>
                    <div className="login-div-center shadow p-3 mb-5 bg-white rounded" style={{border:"groove",borderWidth:"0.5px",backgroundColor:"white",padding:"30px"}}>
                        <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7"></img><hr></hr>
                        <div style={{width:"90%",marginLeft:"17px"}}>
                            <p style={{fontWeight:500,color:"#5e5e5e"}}>Register</p>
                            
                            <div class={this.state.alertClass} style={{display: this.state.first ? "none" : "block"}}>
                                <small>
                                   {this.state.message}
                                </small>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="name" placeholder="Name" onChange = {this.nameChangeHandler} required/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange = {this.passwordChangeHandler} required/>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" id="email" placeholder="Email" onChange = {this.emailChangeHandler} pattern={{email_pattern}} required/>
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
                                <button style={{backgroundColor:"#007dc1",color:"#fff"}} id="RegisterButton" className="form-control" onClick = {this.submitLogin}>Register</button>
                            </div>
                            <div className="form-group">
                                <label class="form-check-label" style={{fontSize:"16px"}}><Link to="/login">Login</Link></label>
                            </div>
                        </div>
                    </div>
                </div>
    )}
}

export default Register;