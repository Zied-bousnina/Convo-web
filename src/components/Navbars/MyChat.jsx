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
// import { Avatar } from "@chakra-ui/react";
// import { Badge } from "reactstrap";
// import { makeRecentChatApi } from "Redux/actions/RecentChat.action";
// import { makeRecentChatApi } from "Redux/actions/RecentChat.action";
// import { removeSeenMsg } from "./Redux/Notification/action";
import { useHistory } from 'react-router-dom';
import { rejectDevis } from "Redux/actions/Demandes.Actions.js";
export const MyChat = () => {

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
  console.log("currentUser",noti2)
    const [noti, setnoti] = useState(
      noti2?
      noti2
      :[]
      )

    const click =  (id)=> {
        setLoadid(id)
        setisLoad(true)
        setTimeout(() => {
            setisLoad(false)
            const url = `/partner/factures/`; history.push(url);
        }, 1000);
    }
  // const user = useSelector(state=>state?.currentUser?.users?.user)
  const dispatch = useDispatch()
  const history = useHistory();

  const user = useSelector(state=>state?.auth?.user)
  useEffect(() => {
    socket.on('connect', () => {
    console.log('Connected to server');
    if (user) {
      // socket.current = io(host);
      // socket.emit("add-user", user.id);
    }

});
socket.on('error', (error) => {
    console.error('Socket error:', error);
});


    socket.on("message recieved", (newMessage) => {
      console.log("New message received",newMessage);
      // alert("gggg")
      console.log(user)
      console.log("test",newMessage?.partner ==user?.id, newMessage?.partner, user?.id)
if(newMessage?.partner?._id ==user?.id ){
  setnoti(
    [...noti, newMessage]
  )

  handleNotyfy(newMessage);
}

    });
    socket.on("Admin notification", (doc)=> {
      console.log("ADMIN")
      if(user?.role =="ADMIN") {

        console.log("Admin notification",doc)
        console.log("User++++++", user)
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
  console.log("notif", noti)
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
    {
      user?.role=="PARTNER"?


        <UncontrolledDropdown nav>
  <DropdownToggle

  onClick={()=> {
    if (noti?.length !== 0){
      //  dispatch(removeSeenMsg([]))
      // dispatch(RemoveNotification())
       };

  }}
  nav className="nav-link-icon">
    <i className="ni ni-bell-55" />
    <Badge color="danger" className="ml-1">{user?.role=="PARTNER"&&  noti?.length}</Badge> {/* Add a Badge with the notification count */}
  </DropdownToggle>
  <DropdownMenu
    aria-labelledby="navbar-default_dropdown_1"
    className="dropdown-menu-arrow"
    right
    style={{ maxHeight: '160px',
    maxWidth:"500px",

     overflowY: 'auto', zIndex: 9999 }}



  >
   {!noti?.length   ? (
          <DropdownItem sx={{ p: 2, width: 50 }}>No new messages.</DropdownItem>
        ) : (
          noti?.map((el, index) => (
            <>
            <DropdownItem
  onClick={() => {
    const updatedNoti = noti.filter(item => item._id !== el._id);

// Update the state with the new array
setnoti(updatedNoti);

    dispatch(ByIdRemoveNotification(el._id));
    const url = `/partner/devisDetail/${el._id}`;
    history.push(url);
  }}
  key={index}
  sx={{
    p: 2,
    maxWidth: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    maxHeight: '100px', // Set a max height for scrolling
    overflowY: 'auto', // Enable vertical scrolling
  }}
>
  <div style={{ marginBottom: '8px' }}>
    <strong>Montant Proposé:</strong>{' '}
    {el?.montant?.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    })}
  </div>
  <div style={{ marginBottom: '8px' }}>
    <strong>Depart:</strong> {el?.mission?.postalAddress}
  </div>
  <div>
    <strong>Destination:</strong> {el?.mission?.postalDestination}
  </div>
</DropdownItem>



            <DropdownItem

            >
                <hr className="my-0" />
                <Row>
                  <Col
                    md="2"
                  >
                    <button type="button" className="btn btn-outline-success"
                      onClick={() => {
                        socket.emit("accept devis",el);
                        click(1)
                        dispatch(
                  ByIdRemoveNotification(el._id )
                )
                const updatedNoti = noti.filter(item => item._id !== el._id);

// Update the state with the new array
setnoti(updatedNoti);

                      } }
                    >
                      {isLoad && loadid == 1 ? (
                        <div className="spinner-border text-light" role="status">
                          <span className="visually-hidden"></span>
                        </div>
                      ) : (
                        'Accepté'
                      )}

                      <i className="fa-solid fa-floppy-disk"></i>
                    </button></Col>
                  <Col
                    md="2">
                    <button
                      onClick={() => {
                        // socket.emit("reject devis",devsList);
                        click(2);
                        dispatch(rejectDevis(el?._id));
                        socket.emit("reject devis",el);

                        dispatch(
                  ByIdRemoveNotification(el._id )
                )
                const updatedNoti = noti.filter(item => item._id !== el._id);

// Update the state with the new array
setnoti(updatedNoti);

                      } }
                      type="button" className="btn btn-danger">
                      {isLoad && loadid == 2 ? (
                        <div className="spinner-border text-light" role="status">
                          <span className="visually-hidden"></span>
                        </div>
                      ) : (
                        'Rejeté'
                      )}

                      <i className="fa-solid fa-floppy-disk"></i>
                    </button></Col>
                </Row>
              </DropdownItem></>
          ))
        )}
  </DropdownMenu>
</UncontrolledDropdown>
:
<UncontrolledDropdown nav>
  <DropdownToggle

  onClick={()=> {
    if (noti?.length !== 0){
      //  dispatch(removeSeenMsg([]))
      // dispatch(RemoveNotification())
       };

  }}
  nav className="nav-link-icon">
    <i className="ni ni-bell-55" />
    <Badge color="danger" className="ml-1">{noti?.length}</Badge> {/* Add a Badge with the notification count */}
  </DropdownToggle>
  <DropdownMenu
    aria-labelledby="navbar-default_dropdown_1"
    className="dropdown-menu-arrow"
    right
    style={{ maxHeight: '160px',
    maxWidth:"500px",

     overflowY: 'auto', zIndex: 9999 }}



  >
   {!noti?.length   ? (
          <DropdownItem sx={{ p: 2, width: 50 }}>No new messages.</DropdownItem>
        ) : (
          noti?.map((el, index) => (
            <>
            {
              el?.newMissionPartner ?
              <>

            <DropdownItem
  onClick={() => {
    const updatedNoti = noti.filter(item => item._id !== el._id);

// Update the state with the new array
setnoti(updatedNoti);

    dispatch(ByIdRemoveNotification(el._id));
    const url = `/admin/request-details/${el?._id}`;
    history.push(url);
console.log("clicked 1")
  }}
  key={index}
  sx={{
    p: 2,
    maxWidth: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    maxHeight: '100px', // Set a max height for scrolling
    overflowY: 'auto', // Enable vertical scrolling
  }}
>
{/* <hr/> */}
<strong>New mission</strong>

  <div style={{ marginBottom: '8px' }}>
    <strong>Partner Name:</strong>{' '}
    {el?.user?.contactName}
  </div>
  <div style={{ marginBottom: '8px' }}>
    <strong>Depart:</strong> {el?.postalAddress}
  </div>
  <div>
    <strong>Destination:</strong> {el?.postalDestination}
  </div>
</DropdownItem>
          </>
          :
          <>
          <DropdownItem
  onClick={() => {
    console.log("clicked")
  }}
            >
                <hr className="my-0" />

  <Col md="2">
    {el?.PartnerAccepted === "Accepted" ? (
      <>
        <div style={{ marginBottom: '2px' }}>
          <strong></strong> <Button
    color="info"
    outline
    disabled
  >
    confirmée
  </Button>
        </div>

      </>
    ) : (
      <>
        <div style={{ marginBottom: '2px' }}>
          <strong></strong>

          <Button
    color="danger"
    outline
    disabled
  >
    non
          confirmée
  </Button>
        </div>

      </>
    )}
  </Col>


              </DropdownItem>
            <DropdownItem
  onClick={() => {
    const updatedNoti = noti.filter(item => item._id !== el._id);

// Update the state with the new array
setnoti(updatedNoti);

    dispatch(ByIdRemoveNotification(el._id));
    const url = `/admin/request-details/${el?.mission?._id}`;
    history.push(url);
console.log("clicked 1")
  }}
  key={index}
  sx={{
    p: 2,
    maxWidth: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    maxHeight: '100px', // Set a max height for scrolling
    overflowY: 'auto', // Enable vertical scrolling
  }}
>
  <div style={{ marginBottom: '8px' }}>
    <strong>Partner Name:</strong>{' '}
    {el?.partner?.contactName}
  </div>
  <div style={{ marginBottom: '8px' }}>
    <strong>Depart:</strong> {el?.mission?.postalAddress}
  </div>
  <div>
    <strong>Destination:</strong> {el?.mission?.postalDestination}
  </div>
</DropdownItem>
          </>
            }




            <DropdownItem>
                <hr className="my-0" />




              </DropdownItem>
              </>
          ))
        )}
  </DropdownMenu>
</UncontrolledDropdown>

    }
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
