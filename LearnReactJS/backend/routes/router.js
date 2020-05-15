var express = require("express");
var router = express.Router();
let channelCtrl = require("../controllers/channelCtrl");
let messageCtrl = require("../controllers/messageCtrl");
let userCtrl = require('../controllers/userCtrl');
let roleCtrl = require("../controllers/roleCtrl");
let memberCtrl = require("../controllers/memberCtrl")

/* CHANNELS */
router.get("/api/Channels/GetAll", channelCtrl.GetAllChannels);
router.get("/api/Channels/GetChannel/:id", channelCtrl.GetChannelById);
router.post("/api/Channels/Save", channelCtrl.SaveChannel);
router.post("/api/Channels/Update/:id", channelCtrl.UpdateChannelById);
router.delete("/api/Channels/Delete/:id", channelCtrl.DeleteChannelById);

/* MESSAGES */
router.get("/api/:channel_id/Messages/GetAll", messageCtrl.GetAllMessages);
router.get("/api/:channel_id/Messages/GetMessage/:id", messageCtrl.GetMessageById);
router.post("/api/:channel_id/Messages/Save", messageCtrl.SaveMessage);
router.post("/api/:channel_id/Messages/Update/:id", messageCtrl.UpdateMessageById);
router.delete("/api/:channel_id/Messages/Delete/:id", messageCtrl.DeleteMessageById);

/* USERS */
router.get("/api/Users/GetAll", userCtrl.GetAllUsers);
router.get("/api/Users/GetUser/:id", userCtrl.GetUserById);
router.post("/api/Users/Save", userCtrl.SaveUser);
router.post("/api/Users/Update/:id", userCtrl.UpdateUserById);
router.delete("/api/Users/Delete/:id", userCtrl.DeleteUserById);

/* ROLES */
router.get("/api/Roles/GetAll", roleCtrl.GetAllRoles);
router.get("/api/Roles/GetRole/:id", roleCtrl.GetRoleById);
router.post("/api/Roles/Save", roleCtrl.SaveRole);
router.post("/api/Roles/Update/:id", roleCtrl.UpdateRoleById);
router.delete("/api/Roles/Delete/:id", roleCtrl.DeleteRoleById);

/* MEMBERS */
router.get("/api/:channel_id/Members/GetAll", memberCtrl.GetAllMembers);
router.get("/api/:channel_id/Members/GetMember/:id", memberCtrl.GetMemberById);
router.post("/api/:channel_id/Members/Save", memberCtrl.SaveMember);
router.post("/api/:channel_id/Members/Update/:id", memberCtrl.UpdateMemberById);
router.delete("/api/:channel_id/Members/Delete/:id", memberCtrl.DeleteMemberById);

module.exports = router;
