import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import {connect} from "react-redux"

import CourseSideBar from "../components/CourseSideBar"
import {getPermissionCode,createPermissionCode} from "../actions/permissionCodeActions";

class PermissionCode extends React.Component {
    constructor(){
        super();
        
        this.permissionGenerateHandler = this.permissionGenerateHandler.bind(this);
    }

    componentDidMount(){
        this.props.getPermissionCode(this.props.match.params.course_id);
    }

    permissionGenerateHandler = (e) => {
        this.props.createPermissionCode(this.props.match.params.course_id);
    }

    render() {

        let permissionCode = this.props.permissionCode || {}
        let used_flag = null;
        const permission_codes = permissionCode.permission_list.map((elem) =>{
            if (elem.is_used == 0){
                used_flag = "No"
            }
            else{
                used_flag = "Yes"
            }
            return (
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            {elem.code_number}
                        </div>
                        <div className="col-md-4">
                            {moment(elem.created_on).format('MMMM Do YYYY, h:mm a')}
                        </div>
                        <div className="col-md-4">
                            {used_flag}
                        </div>
                    </div><hr></hr>
                </div>
            )
        });
        
        return (
            <div  className="card profile-div-center shadow p-3 mb-5 bg-white rounded">
                <CourseSideBar active="permission" />
                <div class="content" >  
                    <span>
                        <h4>Permission Code</h4><hr></hr>
                        <div className="form-group" style={{float:"right",marginTop:"-80px"}}>
                            <a href="javascript:void(0)"><button type="submit" className="btn btn-primary" style={{backgroundColor:"#007dc1",color:"#fff"}} onClick={this.permissionGenerateHandler}>Create New Code</button></a>
                        </div>
                    </span>
                    <div className="row text-muted">
                        <div className="col-md-4">
                            <span>Code</span>
                        </div>
                        <div className="col-md-4">
                            <span>Created On</span>
                        </div>
                        <div className="col-md-4">
                            <span>Used</span>
                        </div>
                    </div><hr></hr>
                    {permission_codes}
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        permissionCode :  (state.permissionCode||{}).permissionCode,
    //   error: (state.authReducer||{}).error,
    }
  }
  PermissionCode = connect(
    mapStateToProps,
    {getPermissionCode,createPermissionCode}
  )(PermissionCode)
  export default withRouter(PermissionCode);