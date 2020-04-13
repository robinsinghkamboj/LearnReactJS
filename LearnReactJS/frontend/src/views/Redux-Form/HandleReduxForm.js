import React from "react";
import ReduxForm from "./ReduxForm";
import * as utility from "../../utility";
import $ from "jquery";
import DataTable from "datatables.net";
import { reset } from "redux-form";
import auth from "../../common/auth";
import { Card, CardHeader, CardBody } from "reactstrap";

class HandleReduxForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      rememberMe: false,
      usersArr: [],
      flashEdit: false,
      id: ""
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let userData = await utility.readLocalStorage("userData");
    if (userData != null) {
      this.setState({ usersArr: userData });
    }

    await this.setDataTable();
  };

  setDataTable = async () => {
    let modArr = [];

    await this.state.usersArr.forEach((ele, i) => {
      let obj = {
        name: ele["name"],
        email: ele["email"],
        password: ele["password"],
        rememberMe: ele["rememberMe"],
        edit: `<i id=${i} class="fa fa-edit" style="font-size:22px;color:#4469db"></i>`
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
    let userData = await utility.readLocalStorage("userData");

    let obj = {
      name: values["name"],
      email: values["email"],
      password: values["password"],
      rememberMe: values["rememberMe"]
    };

    if (this.state.flashEdit == true) {
      let ind = this.state.id;
      userData[ind] = obj;
      await utility.setItemLocalStorage("userData", userData);

      await this.setState({
        flashEdit: false,
        name: "",
        email: "",
        password: "",
        rememberMe: false,
        id: ""
      });
    } else if (this.state.flashEdit == false && userData == null) {
      let arr = [];
      arr.push(obj);
      utility.setItemLocalStorage("userData", arr);
    } else if (this.state.flashEdit == false && userData != null) {
      userData.push(obj);
      utility.setItemLocalStorage("userData", userData);
    }

    await dispatch(reset("ReduxForm"));
    await this.getData();
  };

  editUser = async ind => {
    let data = await this.state.usersArr[ind];

    await this.setState({
      id: ind,
      name: data.name,
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      flashEdit: true
    });
  };

  deleteUser = async () => {
    let ind = this.state.id;
    await this.state.usersArr.splice(ind, 1);
    await utility.setItemLocalStorage("userData", this.state.usersArr);

    await this.setState({
      flashEdit: false,
      name: "",
      email: "",
      password: "",
      rememberMe: false,
      id: ""
    });

    await this.getData();
  };

  payment = () => {
    utility.navigateTo(this.props, "/payment");
  };

  logout = async () => {
    await auth.logout(async () => {
      await utility.removeLocalStorageItem("loginData");
      await utility.navigateTo(this.props, "/login");
    });
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <div className="card-header-btn">
              <button
                className="btn btn-primary shadow-none"
                type="button"
                onClick={this.payment}
              >
                Payment
              </button>

              <button
                className="btn btn-primary shadow-none ml-4"
                type="button"
                onClick={this.logout}
              >
                Logout
              </button>
            </div>
          </CardHeader>
          <CardBody>
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
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default HandleReduxForm;
