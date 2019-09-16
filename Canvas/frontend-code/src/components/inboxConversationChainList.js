import React from 'react';
import moment from 'moment';

import { Button,Modal } from 'react-bootstrap';

class InboxConversationChainList extends React.Component {

    constructor(){
        super();

        this.state = {
            show: false,
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.replyMessage = this.replyMessage.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    replyMessage = e => {
        this.setState({ show: false });
        let index = e.target.id;
        this.props.sendChainMessage(index);
    }

    render() {
        let conversationChain = null
        conversationChain = this.props.elem.map((message) => {
            return (
                <div>
                    <div>
                        <div className="row">
                            <div className="col-md-2">
                            <img src={message.sender.profile_pic} alt="#" style={{borderRadius:"50%",width:"50%",height:"90%"}}></img>
                            </div>
                            <div className="col-md-10" style={{marginLeft:"-7%"}}>
                                <p>
                                    <span style={{fontWeight:"500"}}>{message.sender.name}</span>,{message.receiver.name}
                                    <span className="text-muted" style={{float:"right"}}>{moment(message.created_on).format('MMMM Do YYYY')} at {moment(message.created_on).format('h:mm a')}</span>
                                </p>
                                <p className="text-muted">{this.props.course.course_id} - {this.props.course.name}</p>
                            </div>
                        </div>
                        <div style={{marginTop:"2%"}}>
                            <p>
                                {message.message}
                            </p>
                        </div>
                    </div><hr></hr>
                </div>
            )
        })

        return (    
            <div style={{textAlign:"left"}}>
                <h5>    
                    {this.props.subject}
                    <span>
                        <Button variant="primary" onClick={this.handleShow} style={{backgroundColor:"#007dc1",color:"#fff",float:"right",marginTop:"-1%"}}>
                            Reply
                        </Button>
                        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <p>Reply Message</p>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <textarea class="form-control" rows="3" placeholder="Message" name="chain_message" onChange={this.props.writeHandler} required ></textarea>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                Close
                                </Button>
                                <Button variant="primary" id={this.props.index} onClick={this.replyMessage}>
                                Reply
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </span>
                </h5><hr></hr>
                {conversationChain}
            </div>
    )}
}

export default InboxConversationChainList;