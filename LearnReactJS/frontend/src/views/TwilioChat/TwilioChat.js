import React from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import * as service from "../../service";
import * as utility from "../../utility";
import moment from "moment";

class TwilioChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      haveData: false,
      AllChannels: [],
      channelName: "",
      ChannelMessages: [],
      channelSelected: false,
      channelId: "",
      message: "",
      username: "",
      isConnected: false
    };
  }

  componentDidMount() {}

  getAllChannels = async () => {
    let response = await service.GetAllChannels();
    let resData = await utility.processStatus(response);
    await this.setState({ AllChannels: resData, haveData: true });
  };

  openChannelChat = async channelId => {
    this.setState({ channelId: channelId });
    let response = await service.GetChannelMessages(channelId);
    let resData = await utility.processStatus(response);
    await this.setState({ ChannelMessages: resData, channelSelected: true });
  };

  addChannel = async () => {
    if (this.state.channelName == "") {
      return;
    }

    await this.setState({ haveData: false });
    let obj = {
      friendlyName: this.state.channelName,
      uniqueName: this.state.channelName
    };
    await this.setState({ channelName: "" });

    let response = await service.SaveChannel(obj);
    let resData = await utility.processStatus(response);
    await this.getAllChannels();
  };

  sendMessage = async () => {
    if (this.state.message == "") {
      return;
    }

    let obj = {
      from: this.state.username,
      message: this.state.message
    };

    let response = await service.SendMessageToChannel(
      this.state.channelId,
      obj
    );
    let resData = await utility.processStatus(response);
    let messageRes = await service.GetChannelMessages(this.state.channelId);
    let messageResData = await utility.processStatus(messageRes);
    await this.setState({
      ChannelMessages: messageResData,
      channelSelected: true,
      message: ""
    });
  };

  connect = async () => {
    if (this.state.username == "") {
      return;
    }
    await this.setState({ isConnected: true });
    await this.getAllChannels();
  };

  render() {
    return (
      <div>
        <h1 className="col text-center">
          <b>Twilio Programmable Chat</b>
          &nbsp; &nbsp;
          <small>
            {this.state.isConnected
              ? `Logged in as ` + this.state.username
              : null}
          </small>
        </h1>
        <br />
        {!this.state.isConnected ? (
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control col text-center"
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
                placeholder="Username..."
                required={true}
              ></input>
              <button
                type="button"
                className="btn btn-primary w-100 mt-1"
                onClick={this.connect}
              >
                Connect
              </button>
            </div>
            <div className="col-md-3"></div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-3">
              {this.state.haveData ? (
                <ListGroup
                  className="mb-1"
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  {this.state.AllChannels.map(channel =>
                    channel["sid"] == this.state.channelId ? (
                      <ListGroupItem
                        tag="a"
                        key={channel["sid"]}
                        style={{ textAlign: "center", cursor: "pointer" }}
                        onClick={() => this.openChannelChat(channel["sid"])}
                        active={true}
                      >
                        {channel["friendlyName"]}
                      </ListGroupItem>
                    ) : (
                      <ListGroupItem
                        tag="a"
                        key={channel["sid"]}
                        style={{ textAlign: "center", cursor: "pointer" }}
                        onClick={() => this.openChannelChat(channel["sid"])}
                      >
                        {channel["friendlyName"]}
                      </ListGroupItem>
                    )
                  )}
                </ListGroup>
              ) : (
                <p style={{ textAlign: "center" }}>Loading...</p>
              )}

              <input
                type="text"
                onChange={e => {
                  this.setState({ channelName: e.target.value });
                }}
                value={this.state.channelName}
                placeholder="Type channel name..."
                className="form-control mb-1"
                required
              />
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={this.addChannel}
              >
                Add Channel
              </button>
            </div>
            {this.state.channelSelected ? (
              <div className="col-md-9">
                <ListGroup
                  className="mb-2"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  {this.state.ChannelMessages.length > 0 ? (
                    this.state.ChannelMessages.map(message => (
                      <ListGroupItem key={message["sid"]}>
                        <ListGroupItemHeading className="d-flex w-100 justify-content-between">
                          <small>
                            <b>{message["from"]}</b>
                          </small>
                          <small>
                            {moment(message["dateUpdated"]).format(
                              "MMM D - hh:mma"
                            )}
                          </small>
                        </ListGroupItemHeading>
                        <ListGroupItemText>{message["body"]}</ListGroupItemText>
                      </ListGroupItem>
                    ))
                  ) : (
                    <p>Not Message Found!</p>
                  )}
                </ListGroup>

                <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                    this.setState({ message: e.target.value });
                  }}
                  value={this.state.message}
                  placeholder="Type your message here..."
                  required
                ></input>
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-1"
                  onClick={this.sendMessage}
                >
                  Send
                </button>
              </div>
            ) : (
              <h1>Home</h1>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default TwilioChat;
