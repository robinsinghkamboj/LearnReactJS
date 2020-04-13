import React from "react";
import Popup from "reactjs-popup";

export default class InplaceConfirm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Popup
          trigger={
            <div>
              <i
                class="fa fa-trash-o"
                style={{ fontSize: "22px", color: "#4469db"}}
              ></i>
            </div>
          }
          position="left bottom"
        >
          <div>
            <p style={{fontSize: "16px"}}>Are you sure you want to delete?</p>

            <button className="delete-btn" onClick={this.props.delete} type="button">
              I'm sure.
            </button>
          </div>
        </Popup>
      </div>
    );
  }
}
