import React from 'react';
import axios from 'axios';
import {connect} from "react-redux"
import { withRouter } from "react-router";
import SideBar from './Sidebar';

// react-bootstrap
import { Button,Modal } from 'react-bootstrap';

import validateToken from './Auth'
import {getMessage,write,getCourses,getCoursePeople,postMessage,postChainMessage} from "../actions/inboxActions"
import InboxConversationList from "./InboxConversationList"
import InboxConversationChainList from "./inboxConversationChainList"

class Inbox extends React.Component {
    constructor(){
        super();

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.courseChange = this.courseChange.bind(this);
        this.writeHandler = this.writeHandler.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.conversationOnClick = this.conversationOnClick.bind(this);
        this.sendChainMessage = this.sendChainMessage.bind(this);
    }

    componentDidMount(){
        this.props.getMessage();
        this.props.getCourses();
    }

    writeHandler = (e) => {
        let data = {
            [e.target.name] : e.target.value
        }
        this.props.write(data);
    }

    conversationOnClick = (e) => {
        let index = e.target.id
        // this.click_logic(index)
        this.props.write({
            converstion_clicked : index
        });
    }

    handleClose() {
        this.props.write({show: false})
    }

    handleShow() {
        this.props.write({show: true})
    } 
    
    courseChange(e) {
        this.props.getCoursePeople(e.target.value)
        this.props.write({"course":e.target.value});
    }

    sendChainMessage = (index) => {
        this.props.write({show_reply: false})

        let message_obj = this.props.inbox.conversations[index]

        let data = {}
        data["message_id"] = message_obj.id
        data["message"] = this.props.inbox.chain_message
        data["receiver"] = message_obj.sender.id + "," +  message_obj.receiver.id
        console.log("data",data)
        this.props.postChainMessage(data,() =>   {
            // this.click_logic(index)

            this.props.write({
                "chain_message" : null,
            })
        })
    }

    sendMessage = (e) => {
        this.props.write({show: false})
        let data = {}
        data["course"] = this.props.inbox.course
        data["receiver"] = this.props.inbox.receiver
        data["subject"] = this.props.inbox.subject
        data["message"] = this.props.inbox.message

        this.props.postMessage(data)

        // reseting data 
        document.getElementById("sendMessageForm").reset();
        this.props.write({
            course : null,
            receiver : null,
            subject : null,
            message : null,
        })
    }

    // courseClickHandler = (e) => {
    //     let course_id = e.target.id;
    //     this.props.history.push("/course/"+course_id);
    // }
    

    // createCourse = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         course_id : this.props.facultyLanding.course_id,
    //         course_name : this.props.facultyLanding.course_name,
    //         course_dept : this.props.facultyLanding.course_dept,
    //         course_desc : this.props.facultyLanding.course_desc,
    //         course_term : this.props.facultyLanding.course_term,
    //         course_room : this.props.facultyLanding.course_room,
    //         course_capacity : this.props.facultyLanding.course_capacity,
    //         course_waitlist_capacity : this.props.facultyLanding.course_waitlist_capacity,
    //     }
        
    //     this.props.postCourse(data);
    //     document.getElementById("add-course-form").reset();
    // }

    render() {
        // validateToken();

        let inbox = this.props.inbox || {}

        let vr_tag = {
            borderRight: "1px solid #bfbfbf",
            borderRightWidth: "1px",
            borderRightSyle: "solid",
            borderRightColor: "rgb(191, 191, 191)",
            height: "100%",
            overflow: "auto",
            position : "absolute",
        }


        let course_options = inbox.courses.map((course) => {
            return (
                <option value={course.id}>{course.name}</option>
            )
        })

        let course_people = null
        if (inbox.course_people !== undefined){
            course_people = inbox.course_people.map((people) => {
                return (
                    <option value={people.id}>{people.name}</option>
                )
            })
        }

        let conversations = inbox.conversations.map((elem,index) => {
            return (
                <InboxConversationList key={elem.id} elem={elem} index={index} conversationOnClick={this.conversationOnClick} />
            )
        })

        let conversation_chain  = null
        if (inbox.converstion_clicked){
            let index = inbox.converstion_clicked
            conversation_chain = (
                <InboxConversationChainList elem={this.props.inbox.conversations[index].message_chain} index={index} show_reply={this.props.inbox.show_reply} course={this.props.inbox.conversations[index].course} writeHandler={this.writeHandler} handleReplyShow={this.handleReplyShow} handleReplyClose={this.handleReplyClose} sendChainMessage={this.sendChainMessage} subject={this.props.inbox.conversations[index].subject} />
            )
        } 

        return (

            <div>
                {validateToken()}
                <SideBar />
                <div className="card profile-div-center shadow p-3 mb-5 bg-white rounded" style={{minHeight:"100%",overflowY:"auto",position:"absolute"}}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3" style={vr_tag}>
                                <div className="form-group">
                                    <Button variant="primary" onClick={this.handleShow} style={{backgroundColor:"#007dc1",color:"#fff",width:"90%"}}>
                                        New Message
                                    </Button>
                                </div>
                                {conversations}
                                <Modal  size="lg" show={inbox.show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <p>Compose Message</p>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form id="sendMessageForm">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <label style={{marginTop:"5px"}}>Course</label>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="form-group">
                                                        <select class="custom-select mb-3" name="course" onChange={this.courseChange} required>
                                                            <option value="" disabled selected>Select Course</option>
                                                            {course_options}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <label style={{marginTop:"5px"}}>To</label>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="form-group">
                                                        <select class="custom-select mb-3" name="receiver" onChange={this.writeHandler} required>
                                                            <option value="" disabled selected>Select</option>
                                                            {course_people}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <label style={{marginTop:"5px"}}>Subject</label>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="No Subject" name="subject" onChange={this.writeHandler} required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <textarea class="form-control" rows="3" placeholder="Message" name="message" onChange={this.writeHandler} required ></textarea>
                                            </div>
                                        </form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>
                                        Cancel
                                        </Button>
                                        <Button variant="primary" onClick={this.sendMessage}>
                                        Send
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className="col-md-9" style={{marginLeft:"27pc"}}>
                                {conversation_chain}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        inbox :  (state.inbox||{}).inbox,
    }
  }
  Inbox = connect(
    mapStateToProps,
    {getMessage,write,getCourses,getCoursePeople,postMessage,postChainMessage}
  )(Inbox)
  export default withRouter(Inbox);
