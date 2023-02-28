const express = require('express');
const router = express.Router();

const {signup, thankMail} = require('../apis/signup');
const {login} = require('../apis/login');
const {sendOtp} = require('../apis/otp');
const {getUserInfo, getAllUsersInfo} = require('../apis/getUserInfo');
const {setComplaint, getAllComplaintsByUser, getAllComplaints} = require('../apis/complaints');
const {addBlog, deleteBlog, editBlog, getBlog} = require('../apis/blogs');
const {changeAccountType} = require('../apis/changeAccountType');
const {updateProfilePhoto, updateBackgroundProfilePhoto, updateProfileName} = require('../apis/editProfile');
const {sendFriendRequest, getRequestsSent} = require('../apis/sendFR');
const {getOtherPeopleRequests, getWholeData, getFriendList} = require('../apis/getFR');
const {acceptRequestAddFriendInList} = require('../apis/acceptFR');
const {deleteFriendRequest, removeFromFriend} = require('../apis/deleteFR');
const {addChatMsg, getChatMsg} = require('../apis/chatting');

router.post('/signup', signup);
router.post('/thanks', thankMail);
router.post('/login', login);
router.post('/otp', sendOtp);
router.post('/getUserInfo', getUserInfo)
router.get('/getAllUsersInfo',getAllUsersInfo);
router.post('/addComplaint', setComplaint);
router.post('/getAllComplaintsByUser', getAllComplaintsByUser);
router.get('/getAllComplaints', getAllComplaints);
router.post('/addBlog', addBlog);
router.delete('/deleteBlog/:username/:blogId', deleteBlog);
router.patch('/editBlog/:blogId', editBlog);
router.get('/getBlog/:blogId', getBlog);
router.patch('/changeAccountType/:userId', changeAccountType);
router.patch('/updateProfileName',updateProfileName);
router.patch('/updateProfilePhoto/:userId', updateProfilePhoto);
router.patch('/updateBackgroundProfilePhoto/:userId', updateBackgroundProfilePhoto);
router.post('/sendFriendRequest/:fromUserName', sendFriendRequest);
router.get('/getRequestsSent/:ourName',getRequestsSent);
router.post('/getOtherPeopleRequests', getOtherPeopleRequests);
router.post('/getWholeData',getWholeData);
router.patch('/acceptRequestAddFriendInList/:name', acceptRequestAddFriendInList);
router.get('/getFriendList/:username', getFriendList)
router.patch('/deleteFriendRequest/:NameUser',deleteFriendRequest);
router.patch('/removeFromFriend/:deleteName', removeFromFriend)
router.post('/addChat/:nameUser', addChatMsg);
router.post('/getChatMsg/:nameUser', getChatMsg);

module.exports = router;