import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
// import { Avatar, Badge } from "@mui/material";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

// import { selectChat } from "./Redux/Chatting/action";
import { removeSeenMsg } from "Redux/actions/Notification.action";
import { makeSearchApi } from "Redux/actions/searching.action";
import { accessChat } from "Redux/actions/RecentChat.action";
import { makeRecentChatApi } from "Redux/actions/RecentChat.action";
import { selectChat } from "Redux/actions/chatting.action";
import { Badge, Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { Avatar } from "@chakra-ui/react";
import { socket } from "../../socket.js";
import { addUnseenmsg } from "Redux/actions/Notification.action.js";
import { GetCurrentUser } from "Redux/actions/userAction.js";
import { RemoveNotification } from "Redux/actions/userAction.js";
import { ByIdRemoveNotification } from "Redux/actions/userAction.js";
import { Link } from "react-router-dom";
// import { Avatar } from "@chakra-ui/react";
// import { Badge } from "reactstrap";
// import { makeRecentChatApi } from "Redux/actions/RecentChat.action";
// import { makeRecentChatApi } from "Redux/actions/RecentChat.action";
// import { removeSeenMsg } from "./Redux/Notification/action";
import { useHistory } from 'react-router-dom';
import { rejectDevis } from "Redux/actions/Demandes.Actions.js";
import './styles/Notifications.css'; // Path to your CSS file
export const Notifications = () => {

  const history = useHistory();
  const user = {
    _id: "6161c9b1c9e7a5b8b5b2b1e8",
    name: "Rahul",
    email: "ggg"
  }
  const token =  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9pZCI6IjYxNjFjOWIxYzllN2E1YjhiNWIyYjFlOCIsImlhdCI6MTYzNDQyNzI4Nn0.9G7mXZ8NQkQ6nJZ9qX9qH4Mx0jQ3j9q0W8rC3lq2z7o"
  }
  const [search, setSearch] = useState(false);
  const { search_result, loading, error } = useSelector(
    (store) => store.search
  );
  const { recent_chat, loading: chat_loading } = useSelector(
    (store) => store.recentChat
  );
  // const { user, token } = useSelector((store) => store.user);
  const { chatting } = useSelector((store) => store.chatting);


  const dispatch = useDispatch();

  const ref = useRef();
  const handleQuery = (e) => {
    let id;
    return function (e) {
      if (!e.target.value) {
        setSearch(false);
        return;
      }
      if (ref.current) clearTimeout(ref.current);
      setSearch(true);
      ref.current = setTimeout(() => {
        dispatch(makeSearchApi(e.target.value));
      }, 1000);
    };
  };

  return (
    <div className="mychat-cont">
      <div>
        <div className="notification">
     <Notificationcomp/>
        </div>

      </div>

    </div>
  );
};

export default function Notificationcomp() {
  const [isLoad, setisLoad] = useState(false)
  const [loadid, setLoadid] = useState(1)
  const currentUser = useSelector(state=>state?.currentUser?.users?.user?.Newsocket)
  const noti2 = useSelector(state=>state?.noti?.Noti)
  const unseen = useSelector(state=>state?.notification)
  useEffect(() => {
  const fetchData = async () => {
    await dispatch(GetCurrentUser());

    dispatch(removeSeenMsg([]));
    dispatch(addUnseenmsg(currentUser?.Newsocket));
  };

  fetchData();
}, [dispatch, currentUser?.length]);

useEffect(() => {
  dispatch(GetCurrentUser())
}, [noti2?.length])

const handleNotificationClick = () => {
    history.push({
      pathname: `/${
       user?.role === "ADMIN" ? "admin" : "partner"}/notifications`,
      state: { noti }, // Pass the notifications data
    });
  };

const [noti, setnoti] = useState([])
  useEffect(() => {
  setnoti(currentUser ? currentUser : []);
}, [currentUser]);




  // const user = useSelector(state=>state?.currentUser?.users?.user)
  const dispatch = useDispatch()
  const history = useHistory();

  const user = useSelector(state=>state?.auth?.user)
  useEffect(() => {
    socket.on('connect', () => {

    if (user) {
      // socket.current = io(host);
      // socket.emit("add-user", user.id);
    }

});
socket.on('error', (error) => {
    console.error('Socket error:', error);
});


    socket.on("message recieved", (newMessage) => {

if(newMessage?.partner?._id ==user?.id ){
  setnoti(
    [...noti, newMessage]
  )

  handleNotyfy(newMessage);
}

    });
    socket.on("validate_me", (newMessage) => {
      console.log("validate_me", newMessage)

      if(newMessage?.partner?._id ==user?.id ){
        setnoti(
          [...noti, newMessage]
        )

        handleNotyfy(newMessage);
      }

          });
    socket.on("Admin notification", (doc)=> {

      if(user?.role =="ADMIN") {


      }
      setnoti(
        [...noti, doc]
      )
      handleNotyfy(doc);
    })
  }, [socket]);
  const handleNotyfy = (newMessage) => {
    dispatch(addUnseenmsg(newMessage));
  };
  const { notification } = useSelector(
    (store) => store.notification
  );

  const { unseenmsg } = useSelector((store) => store.notification);
  // const unseenmsg = [
  //   {
  //     sender: {
  //       name: "Rahul",
  //     },
  //     content: "Hello",
  //   },
  //   {
  //     sender: {
  //       name: "Rahul",
  //     },
  //     content: "Hello",
  //   },
  //   {
  //     sender: {
  //       name: "Rahul",
  //     },
  //     content: "Hello",
  //   },
  // ]
  const [anchorEl, setAnchorEl] = useState(null);
  // const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (unseenmsg.length !== 0) dispatch(removeSeenMsg([]));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {user?.role === "PARTNER" ? (
        <div className="nav-link-icon" onClick={handleNotificationClick} style={{ cursor: 'pointer' }}>
          <NotificationsIcon style={{ color: '#44484EFF', fontSize: '24px' }} />
          {noti?.length > 0 && (
            <Badge color="danger" className="ml-1">
              {noti.length}
            </Badge>
          )}
        </div>
      ) : (
        <div className="nav-link-icon" onClick={handleNotificationClick} style={{ cursor: 'pointer' }}>
          <NotificationsIcon style={{ color: '#44484EFF', fontSize: '24px' }} />
          {noti?.length > 0 && (
            <Badge color="danger" className="ml-1">
              {noti.length}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
const ChatUserComp = ({
  isGroupChat,
  chatName,
  users,
  latestMessage,
  id,
  _id,
  index,
  chattingwith,
}) => {
  const dispatch = useDispatch();
  const handleSelectChat = () => {
    dispatch(
      selectChat({
        isGroupChat,
        index,
        user: users.find((el) => el._id != id),
        _id,
        chatName,
      })
    );
  };
  return (
    <div
      onClick={handleSelectChat}
      className={chattingwith == _id ? "user selectUser" : "user"}
    >
      <div className="history-cont">
        {isGroupChat ? (
          <div>{<Avatar>G</Avatar>}</div>
        ) : (
          <div>{<Avatar src={users.find((el) => el._id != id)?.pic} />}</div>
        )}
        <div>
          {isGroupChat ? (
            <p className="name">{chatName}</p>
          ) : (
            <p className="name">{users.find((el) => el._id != id)?.name}</p>
          )}
          <p className="chat">
            {latestMessage
              ? latestMessage.content.length > 8
                ? latestMessage.content.substring(0, 30) + " . . ."
                : latestMessage.content
              : ""}
          </p>
        </div>
      </div>
      <div>
        {latestMessage ? (
          <p className="time">
            {new Date(latestMessage?.updatedAt).getHours() +
              ":" +
              new Date(latestMessage?.updatedAt).getMinutes()}
          </p>
        ) : (
          ""
        )}
        {/* <p className="unseen-chat">5</p> */}
      </div>
    </div>
  );
};

export const SearchUserComp = ({
  _id,
  email,
  name,
  pic,
  token,
  recent_chat,
  setSearch,
}) => {
  const dispatch = useDispatch();
  const handleSubmitForAcceChat = () => {
    dispatch(accessChat(_id, token, recent_chat));
    setSearch(false);
  };
  return (
    <div onClick={handleSubmitForAcceChat} className="user">
      <div className="history-cont">
        <div>{<Avatar src={pic} />}</div>
        <div>
          <p className="name">{name}</p>
          <p className="chat">Email: {email}</p>
        </div>
      </div>
    </div>
  );
};
