import React from 'react';
import moment from 'moment';

class InboxConversationList extends React.Component {

    render() {
        return (    
            <div>
                <a href="javascript:void(0)" onClick={this.props.conversationOnClick} style={{color:"black"}}>
                    <div className="row" id={this.props.index} style={{textAlign:"left",marginLeft:"2px"}}>
                        <div className="col-md-12" id={this.props.index} style={{marginBottom:"-25px"}}>
                            <p style={{fontWeight:"500"}} id={this.props.index}>{this.props.elem.sender.name}</p>
                        </div>
                        <div className="col-md-12" id={this.props.index}>
                            <p className="text-muted" style={{fontSize:"x-small",marginBottom:"0px"}} id={this.props.index}>{moment(this.props.elem.message_chain[0].created_on).format('MMMM Do YYYY')}</p>
                        </div>
                        <div className="col-md-12" id={this.props.index}>
                            <p style={{fontSize:"small",marginTop:"15px"}} id={this.props.index}>{this.props.elem.subject}</p>
                        </div>
                        <div className="col-md-12" style={{marginBottom:"-25px"}} id={this.props.index}>
                            <p className="text-muted" style={{fontSize:"small",marginTop:"0px"}} id={this.props.index}>{this.props.elem.message_chain[this.props.elem.message_chain.length-1].message}</p>
                        </div>
                    </div> <hr></hr>
                </a>
            </div>
    )}
}

export default InboxConversationList;