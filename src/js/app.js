import { Chatroom } from "./chat.js";
import { Lielements } from "./lielement.js";

//UI
const getchatrooms = document.querySelector(".chatrooms");
const getchatul = document.querySelector(".chat-ul");
const getchatform = document.querySelector(".chat-form");
const getuserform = document.querySelector(".user-form");
const msg = document.querySelector(".msg");
const roomtitle = document.querySelector(".roomtitle");

const getlocalname = localStorage.username ? localStorage.username : "Guest";

getuserform.username.placeholder = `username is ${getlocalname}`;

console.log(getuserform.username);

roomtitle.textContent = "General";

// Chatroom instance
const chatroom = Chatroom("general",getlocalname);
roomtitle.textContent = "General";

//Lielements instance
const domli = Lielements(getchatul);

//Start chat
getchatform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = getchatform.message.value.trim();
    chatroom.addChat(message)
    .then(()=>getchatform.reset())
    .catch(err=>console.log(err));
});


// Update username
getuserform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const newusername = getuserform.username.value.trim();
    chatroom.updateUsername(newusername);
    getuserform.reset();

    //show & hide msg
    msg.innerText = `New name updated to ${newusername}`;
    getuserform.username.placeholder = `username is ${newusername}`;

    setTimeout(()=>msg.innerHTML="",3000);
});

//Update chat room
getchatrooms.addEventListener("click",(e)=>{
    e.preventDefault();

    const getbtn = e.target.closest("button");
    // console.log(getbtn);

    if(getbtn){
        //reset li, clear all previous li
        domli.resetli();

        //get text for update room
        const getroomid = getbtn.getAttribute("id");
        // console.log(getroomid);

        //get text for room title
        const getroomtitle = getbtn.querySelector("h3").innerText;
        // console.log(getroomtitle);

        roomtitle.textContent = getroomtitle;

        //update chatroom
        chatroom.updateChatroom(getroomid);

        //fetch get chat
        chatroom.getChats((data)=>{
            // console.log(data);

            domli.newli(data);
        });

    }
});

//get chat
chatroom.getChats((data)=>{
    // console.log(data);

    domli.newli(data);
});