// CRUD operations are implemented with MySQL-server

import React from "react";
import ReduxForm from "../Redux-Form/ReduxForm";
import * as utility from "../../utility";
import $ from "jquery";
import DataTable from "datatables.net";
import axios from "axios";
import { reset } from "redux-form";
import { SomethingWentWrong } from "../SomethingWentWrong/SomethingWentWrong";

class CRUDWithMySQL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      rememberMe: false,
      usersArr: [],
      flashEdit: false,
      id: "",
      flashError: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/get-all-users");
      const { status } = response;

      if (status == 200) {
        await this.setState({ usersArr: response["data"] });
      }

      await this.setDataTable();
    } catch (err) {
      this.setState({ flashError: true });
    }
  };

  setDataTable = async () => {
    let modArr = [];

    await this.state.usersArr.forEach((ele, i) => {
      let obj = {
        name: ele["name"],
        email: ele["email"],
        password: ele["password"],
        rememberMe: ele["remember_me"] == 1 ? true : false,
        edit: `<i id=${ele["id"]} class="fa fa-edit" style="font-size:22px;color:#4469db"></i>`
      };
      modArr.push(obj);
    });

    let _this = this;
    await $(document).ready(async function() {
      var table = await $("#userDataTable").DataTable({
        columns: [
          { data: "name" },
          { data: "email" },
          { data: "password" },
          { data: "rememberMe" },
          { data: "edit" }
        ],
        data: modArr,
        stateSaveParams: function(settings, data) {
          data.search.search = "";
        },
        bAutoWidth: false,
        bDestroy: true,
        order: [[0, "asc"]],
        oLanguage: {
          sSearch: '<i class="fa fa-search"></i>'
        },
        language: {
          paginate: {
            previous: "Prev"
          }
        }
      });

      $("#userDataTable tbody").on("click", "tr td i", function() {
        _this.editUser(this.id);
      });

      $("#userDataTable_filter input").attr("placeholder", "Search...");
    });
  };

  handleSubmit = async (values, dispatch) => {
    try {
      let obj = {
        name: values["name"],
        email: values["email"],
        password: values["password"],
        remember_me: values["rememberMe"] == true ? 1 : 0
      };

      if (this.state.flashEdit == true) {
        const response = await axios.post(
          `http://localhost:4000/update-user/${this.state.id}`,
          obj
        );
        const { status } = response;
        if (status == 200) {
          utility.toastMsg(response["data"], "success");
          this.setState({
            flashEdit: false,
            name: "",
            email: "",
            password: "",
            rememberMe: false,
            id: ""
          });
        }
      } else {
        const response = await axios.post(
          "http://localhost:4000/save-user",
          obj
        );
        const { status } = response;
        if (status == 200) {
          utility.toastMsg(response["data"], "success");
        }
      }

      await dispatch(reset("ReduxForm"));
      await this.getData();
    } catch (err) {
      this.setState({ flashError: true });
    }
  };

  editUser = async id => {
    try {
      const response = await axios.get(`http://localhost:4000/get-user/${id}`);
      const { status } = response;

      if (status == 200) {
        const { data } = response;
        await this.setState({
          id: data[0]["id"],
          name: data[0]["name"],
          email: data[0]["email"],
          password: data[0]["password"],
          rememberMe: data[0]["remember_me"],
          flashEdit: true
        });
      }
    } catch (err) {
      this.setState({ flashError: true });
    }
  };

  deleteUser = async () => {
    try {
      let userId = this.state.id;

      const response = await axios.get(
        `http://localhost:4000/delete-user/${userId}`
      );
      const { status } = response;

      if (status == 200) {
        utility.toastMsg(response["data"], "success");
        this.setState({
          flashEdit: false,
          name: "",
          email: "",
          password: "",
          rememberMe: false,
          id: ""
        });
      }
      await this.getData();
    } catch (err) {
      this.setState({ flashError: true });
    }
  };

  render() {
    if (this.state.flashError == true) {
      return <SomethingWentWrong />;
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-md-5">
              <ReduxForm
                onSubmit={this.handleSubmit}
                initialValues={this.state}
                flashEdit={this.state.flashEdit}
                deleteUser={this.deleteUser}
              />
            </div>
            <div className="col-md-7">
              <div className="formContainer">
                <h2 className="users-table">Users Table</h2>
                <div id="users-table">
                  <table className="table" id="userDataTable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Remember Me</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CRUDWithMySQL;
