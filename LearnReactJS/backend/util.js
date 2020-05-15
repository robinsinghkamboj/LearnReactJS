exports.processStatus = (response, res) => {
  try {
    res.status(response["status"]).json({
      success: response["status"] == 200 ? true : false,
      message: response["message"],
      data: response["data"] != undefined ? response["data"] : {}
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
