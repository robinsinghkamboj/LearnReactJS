const DBConnection = require("./DBConnection");

exports.GetAllUsers = callback => {
  DBConnection.MySQLConnection(sequilize => {
    var query = `SELECT * FROM user_details`;

    sequilize
      .query(query, {
        type: sequilize.QueryTypes.SELECT
      })
      .then(res => {
        callback(res);
      })
      .catch(err => {
        callback(err.message);
      });
  });
};

exports.GetUserById = async (userId, callback) => {
  DBConnection.MySQLConnection(sequilize => {
    var query = `SELECT * FROM user_details  WHERE (id = "${userId}")`;

    sequilize
      .query(query, {
        type: sequilize.QueryTypes.SELECT
      })
      .then(res => {
        callback(res);
      })
      .catch(err => {
        callback(err.message);
      });
  });
};

exports.SaveUser = async (name, email, password, rememberMe, callback) => {
  await DBConnection.MySQLConnection(sequilize => {
    var query = `INSERT INTO user_details( name, email, password, remember_me ) VALUES( "${name}", "${email}", "${password}", "${rememberMe}")`;

    sequilize
      .query(query, {
        type: sequilize.QueryTypes.INSERT
      })
      .then(res => {
        callback("Data Saved Successfully.");
      })
      .catch(err => {
        callback(err.message);
      });
  });
};

exports.UpdateUser = async (
  userId,
  name,
  email,
  password,
  rememberMe,
  callback
) => {
  await DBConnection.MySQLConnection(sequilize => {
    let query = `UPDATE user_details SET name = "${name}", email = "${email}", password = "${password}", remember_me = "${rememberMe}" WHERE (id = "${userId}")`;

    sequilize
      .query(query, {
        type: sequilize.QueryTypes.UPDATE
      })
      .then(res => {
        callback("Data Updated Successfully.");
      })
      .catch(err => {
        callback(err.message);
      });
  });
};

exports.DeleteUser = async (userId, callback) => {
  await DBConnection.MySQLConnection(sequilize => {
    let query = `DELETE FROM user_details WHERE (id = "${userId}")`;

    sequilize
      .query(query, {
        type: sequilize.QueryTypes.DELETE
      })
      .then(res => {
        callback("Data Deleted Successfully.");
      })
      .catch(err => {
        callback(err.message);
      });
  });
};
