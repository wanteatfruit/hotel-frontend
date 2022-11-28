// const url = "http://120.25.216.186:8888";
// let stompClient;
// let selectedUserOrGrup = "10000000000000000";
// let newMessages = new Map();
//
//
// function connectToChat(userName) {
//     console.log("connecting to chat...")
//     let socket = new SockJS(url + '/ws');
//     // let socket=new WebSocket("wss://localhost:8080/ws")
//     stompClient = Stomp.over(socket);
//     stompClient.connect({"X-Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVQmppQkZXYmM4NnpBaER0M1QtTUJ6cnl3R3FnYkF5QlFxYjRjN0w3VHpNIn0.eyJleHAiOjE2MzE1ODc4NzksImlhdCI6MTYzMDM3ODI3OSwianRpIjoiODAyZGQyYzAtNjlhYi00Yjk2LTllZjgtODA5YWY3MWJmNmFmIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1kZXYuZ2l0c29sdXRpb25zLmlkL2F1dGgvcmVhbG1zL2dpdCIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiJhYTkzMzMxMi0wMjhkLTQ3MzQtYTlhNC1hMGYxNmNlZDY5ZTEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnaXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjM5YTRhNzFhLTJmZWYtNDkwMS1hNjdlLTYwYTViNjI0YjllNyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctYXBwbGljYXRpb25zIiwidmlldy1jb25zZW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJkZWxldGUtYWNjb3VudCIsIm1hbmFnZS1jb25zZW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJnaXRzY29wZSIsInRlbmFudF9pZCI6WyI1ZDEyNWI2OS05YzcxLTRhYzktODVhNi1lMWQ4NGU3ZDFiNWIiXSwiZ3JvdXBfbmFtZSI6IklEU3RhciIsInVzZXJfbmFtZSI6ImZyZWR5LmZlcm5hbmRvIiwiaW5zdGFuY2VfdXJsIjpbImh0dHBzOi8vZGV2LmdpdHNvbHV0aW9ucy5pZCJdLCJpbnN0YW5jZV9hcGkiOlsiaHR0cHM6Ly9hcGktZGV2LmdpdHNvbHV0aW9ucy5pZCJdLCJlbXBfaWQiOiJlYmEyYjQ2Yi05MjljLTExZWItOTdjZS0wYWRiY2M5ZWFhYTgifQ.SAW95PiA3DZFwjOCeY3-aLzHPKkH9J_ucbZQ6rV9b8QjZ8zbzW_0F2yrYa7GpKjFNmZ7cL1mFm46wepnGwZvqUIb08EDN0wIqgf20XUsnck7Ji8av4HVEgAuLseiOwoHKHSjRGY8Rj-AeOQ3clbmYz_wy0RtlRResmr0_M59X-iYBtIaWxIDnfarqKvAWHz1Sus0y1abPvRyahLTjtAeKYNITmVhYQb66vWomttJiEDvKmCcNpQtJjW2WkJi7SiojxrsjFOo9R_PiPnYV3vMjsZMRfa8n3PXeG1g-cRst6nYZ0YYoarhAS_aLv-cCzEty5-rgEOMPGWPtyYGtKbJbg"}, function (frame) {
//         console.log("connected to: " + frame);
//
//
//         stompClient.subscribe("/topic/messages/" + userName, function (response) {
//             let data = JSON.parse(response.body);
//             if (selectedUserOrGrup === data.fromLogin) {
//                 let messageTemplateHTML = "";
//                 messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-end mb-4">' +
//                     '<div id="child_message" class="msg_cotainer_send">' + data.message +
//                     '</div>' +
//                     '</div>';
//                 $('#formMessageBody').append(messageTemplateHTML);
//             } else {
//                 newMessages.set(data.fromLogin, data.message);
//                 $('#userNameAppender_' + data.fromLogin).append('<span id="newMessage_' + data.fromLogin + '" style="color: red">+1</span>');
//
//                 let messageTemplateHTML = "";
//                 messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-end mb-4">' +
//                     '<div class="msg_cotainer_send">' + data.message +
//                     '</div>' +
//                     '</div>';
//             }
//         }, {});
//
//
//         $.get(url + "/getallgroup/" + userName, function (response) {
//             let groups = response;
//             for (let i = 0; i < groups.length; i++) {
//                 stompClient.subscribe("/topic/messages/group/" + groups[i]["id"], function (response) {
//                     let data = JSON.parse(response.body);
//                     if (selectedUserOrGrup === data.groupId) {
//                         let messageTemplateHTML = "";
//                         messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-end mb-4">' +
//                             '<div id="child_message" class="msg_cotainer_send">' + data.message +
//                             '</div>' +
//                             '</div>';
//                         $('#formMessageBody').append(messageTemplateHTML);
//                     } else {
//                         newMessages.set(data.groupId, data.message);
//                         $('#userGroupAppender_' + data.groupId).append('<span id="newMessage_' + data.groupId + '" style="color: red">+1</span>');
//                     }
//                 })
//             }
//         });
//     }, onError);
// }
//
// function onError() {
//     console.log("Disconed from console")
// }
//
// window.onload = function () {
//
//     if (localStorage.getItem("userId") === null) {
//         window.location.href = "index.html";
//         return false;
//     }
//
//     fetchAll();
//     connectToChat(localStorage.getItem("userId"));
//
// };
//
// function fetchAll() {
//
//     var userId = localStorage.getItem("userId");
//
//     console.log("userId :" + userId);
//
//     $.get(url + "/getallcustomer", function (response) {
//         let users = response;
//         let usersTemplateHTML = "";
//         for (let i = 0; i < users.length; i++) {
//             console.log(users[i]['name'])
//             usersTemplateHTML = usersTemplateHTML + '<li class="active" id="child_message" onclick="formMessageLauch(' + users[i]['customerid'] + ',\'' + users[i]['name'] + '\',\'user\')" data-userid="' + users[i]['customerid'] + '" data-type="user">' +
//                 '<div class="d-flex bd-highlight">' +
//                 '<div class="img_cont">' +
//                 '<img src="https://p.turbosquid.com/ts-thumb/ld/AoBc75/hstIvEbx/fm_ts2/png/1547194201/1200x1200/fit_q99/a58481f4ebe3123befdaa31e4dfb835ad07343b4/fm_ts2.jpg" class="rounded-circle user_img">' +
//                 '<span class="online_icon"></span>' +
//                 '</div>' +
//                 '<div class="user_info" id="userNameAppender_' + users[i]['customerid'] + '">' +
//                 '<span>' + users[i]['name'] + '</span>' +
//                 '<p>' + users[i]['name'] + ' is online</p>' +
//                 '</div>' +
//                 '</div>' +
//                 '</li>';
//         }
//         $('#usersList').html(usersTemplateHTML);
//     });
//
//
//     $.get(url + "/getallgroup/" + userId, function (response) {
//         let groups = response;
//         let groupsTemplateHTML = "";
//         for (let i = 0; i < groups.length; i++) {
//             console.log("groups[i]['group_name']" + groups[i]['group_name'])
//             groupsTemplateHTML = groupsTemplateHTML + '<li class="active" id="child_message" onclick="formMessageLauch(' + groups[i]['groupid'] + ',\'' + groups[i]['group_name'] + '\',\'group\')" data-groupid="' + groups[i]['groupid'] + '" data-type="group">' +
//                 '<div class="d-flex bd-highlight">' +
//                 '<div class="img_cont">' +
//                 '<img src="https://p.turbosquid.com/ts-thumb/Br/kBbgFq/v1/sixpack002_searchimage1200/png/1655066120/1920x1080/fit_q99/3ab7bd1003a7e533d389abc10f6928b9eda6c1cd/sixpack002_searchimage1200.jpg" class="rounded-circle user_img">' +
//                 '<span class="online_icon"></span>' +
//                 '</div>' +
//                 '<div class="user_info" id="userGroupAppender_' + groups[i]['groupid'] + '">' +
//                 '<span>' + groups[i]['group_name'] + '</span>' +
//                 '<p>' + groups[i]['group_name'] + ' is active</p>' +
//                 '</div>' +
//                 '</div>' +
//                 '</li>';
//         }
//         $('#groupList').html(groupsTemplateHTML);
//
//     });
// }
//
//
// function sendMsgUser(from, text) {
//     console.log("stompClientSendReady")
//     console.log("selectedUserOrGrup: " + selectedUserOrGrup)
//     stompClient.send("/app/chat/" + selectedUserOrGrup, {}, JSON.stringify({
//         fromLogin: from,
//         message: text
//     }));
//     console.log("stompClientSendFinish")
// }
//
// function sendMsgGroup(from, text) {
//     stompClient.send("/app/chat/group/" + selectedUserOrGrup, {}, JSON.stringify({
//         fromLogin: from,
//         message: text
//     }));
// }
//
// function sendMessage(type) {
//     let username = $('#userName').attr("data-id");
//     let message = $('#message-to-send').val();
//     var userId = localStorage.getItem("userId");
//     selectedUserOrGrup = username;
//     console.log("type :" + type)
//     if (type === "user") {
//         sendMsgUser(userId, message);
//     } else if (type === "group") {
//         sendMsgGroup(userId, message);
//     }
//
//
//     let messageTemplateHTML = "";
//     messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-start mb-4">' +
//         '<div id="child_message" class="msg_cotainer">' + message +
//         '</div>' +
//         '</div>';
//     $('#formMessageBody').append(messageTemplateHTML);
//     console.log("append success")
//
//     document.getElementById("message-to-send").value = "";
//
// }
//
// function formMessageLauch(id, name, type) {
//
//     let buttonSend = document.getElementById("buttonSend");
//     if (buttonSend !== null) {
//         buttonSend.parentNode.removeChild(buttonSend);
//     }
//
//     let nama = $('#formMessageHeader .user_info').find('span')
//
//     nama.html("Chat With " + name);
//     nama.attr("data-id", id);
//     let isNew = document.getElementById("newMessage_" + id) !== null;
//     if (isNew) {
//         let element = document.getElementById("newMessage_" + id);
//         element.parentNode.removeChild(element);
//
//
//     }
//     let username = $('#userName').attr("data-id");
//     selectedUserOrGrup = username;
//
//     let isHistoryMessage = document.getElementById("formMessageBody");
//     if (isHistoryMessage !== null && isHistoryMessage.hasChildNodes()) {
//         isHistoryMessage.innerHTML = "";
//
//     }
//
//
//     var userId = localStorage.getItem("userId");
//     if (type === "user") {
//         console.log("id = " + id)
//         $.get(url + "/listmessage/" + userId + "/" + id, function (response) {
//             let messages = response;
//             let messageTemplateHTML = "";
//             for (let i = 0; i < messages.length; i++) {
//                 if (messages[i]['messagefromid'] === userId) {
//                     messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-start mb-4">' +
//                         '<div id="child_message" class="msg_cotainer">' + messages[i]['content'] +
//                         '</div>' +
//                         '</div>';
//                 } else {
//                     messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-end mb-4">' +
//                         '<div id="child_message" class="msg_cotainer_send">' + messages[i]['content'] +
//                         '</div>' +
//                         '<p>' + messages[i]['messagefromname'] + '</>' +
//                         '<p>' + messages[i]['messagetime'] + '</>' +
//                         '</div>';
//                 }
//
//             }
//             $('#formMessageBody').append(messageTemplateHTML);
//         });
//
//     } else if (type === "group") {
//
//         console.log("id = " + id)
//         $.get(url + "/listmessage/group/" + id, function (response) {
//             let messagesGroup = response;
//             let messageGroupTemplateHTML = "";
//             for (let i = 0; i < messagesGroup.length; i++) {
//                 console.log(messagesGroup[i]['user_id'])
//                 if (messagesGroup[i]['user_id'] === userId) {
//                     messageGroupTemplateHTML = messageGroupTemplateHTML + '<div id="child_message" class="d-flex justify-content-start mb-4">' +
//                         '<div id="child_message" class="msg_cotainer">' + messagesGroup[i]['content'] +
//                         '</div>' +
//                         '</div>';
//                 } else {
//                     messageGroupTemplateHTML = messageGroupTemplateHTML + '<div id="child_message" class="d-flex justify-content-end mb-4">' +
//                         '<div id="child_message" class="msg_cotainer_send">' + messagesGroup[i]['content'] +
//
//                         '</div>' +
//                         '<p>' + messagesGroup[i]['name'] + '</>' +
//                         '<p>' + messagesGroup[i]['messagetime'] + '</>' +
//                         '</div>';
//                 }
//
//             }
//             $('#formMessageBody').append(messageGroupTemplateHTML);
//         });
//
//     }
//
//
//     let dataType = type;
//
//     let submitButton = '<div class="input-group-append" id="buttonSend">' +
//         '<button class="input-group-text send_btn" onclick="sendMessage(\'' + dataType + '\')"><i class="fas fa-location-arrow"></i></button>' +
//         '</div>';
//     $('#formSubmit').append(submitButton)
//
// }
//
//
// function logout(userName) {
//     stompClient.disconnect();
//     localStorage.removeItem("userId");
//     window.location.href = "index.html";
//
//     return false;
//
// }
