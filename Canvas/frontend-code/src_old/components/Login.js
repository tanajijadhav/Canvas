import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Login extends React.Component {
    constructor(){
        super();

        this.state = {
            email: "",
            password : "",
            message: null,
            alertClass : null,
            first : true,
            success : false,
            is_faculty : null,
        }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.facultyRadioClickHandler = this.facultyRadioClickHandler.bind(this);
        this.studentRadioClickHandler = this.studentRadioClickHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    usernameChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
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
            email : this.state.email,
            password : this.state.password,
            is_faculty : this.state.is_faculty,
        }
        // console.log("Submit function",data);
        //make a post request with the user data
        axios.post('http://18.191.237.120:3001/login',data)
            .then(response => {
                console.log("Response",response.data);
                if(response.status === 200){
                    console.log("Successfully Logged In.");
                    this.setState({
                        alertClass : "alert alert-success",
                        message : response.data.message,
                        first : false,
                        success : true,
                    })
                    localStorage.setItem("token",response.data.token);
                }else{
                    this.setState({
                        alertClass : "alert alert-danger",
                        message : response.data.message,
                        first : false,
                        success : false
                    })
                }
            })
            .catch(error => {
                console.log("Response",error.response.data);
                this.setState({
                    alertClass : "alert alert-danger",
                    message : error.response.data.message,
                    first : false,
                    success : false,
                })
                
            });
    }

    render() {
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

                            <div class={this.state.alertClass} style={{display: this.state.first ? "none" : "block"}}>
                                <small>
                                   {this.state.message}
                                </small>
                            </div>

                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Username" onChange = {this.usernameChangeHandler} pattern={{email_pattern}} required/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" onChange = {this.passwordChangeHandler} required/>
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

export default Login;