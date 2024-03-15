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
import './styles/Notifications.css'; // Path to your CSS file
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

useEffect(() => {
  dispatch(GetCurrentUser())
}, [noti2?.length])

const handleNotificationClick = (notificationId, url) => {
    dispatch(ByIdRemoveNotification(notificationId));
    history.push(url);
  };
const renderNotificationItem = (notification, index) => (
    <DropdownItem key={index} className="dropdown-item" onClick={() => handleNotificationClick(notification._id, notification.url)}>
      <div><strong>Montant Proposé:</strong> {notification?.montant?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
      <div><strong>Depart:</strong> {notification?.mission?.postalAddress}</div>
      <div><strong>Destination:</strong> {notification?.mission?.postalDestination}</div>
    </DropdownItem>
  );
const [noti, setnoti] = useState([])
  useEffect(() => {
  setnoti(currentUser ? currentUser : []);
}, [currentUser]);



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
                        console.log("Accept devis", el)
                        socket.emit("accept devis",el);
                        click(1)
                        dispatch(
                  ByIdRemoveNotification(el._id )
                )
                const updatedNoti = noti.filter(item => item._id !== el._id);
                // const updatedNoti = noti.filter(item => item._id !== el._id);

// Update the state with the new array
setnoti(updatedNoti);

    dispatch(ByIdRemoveNotification(el._id));
    const url = `/partner/devisDetail/${el._id}`;
    history.push(url);

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
                        // const updatedNoti = noti.filter(item => item._id !== el._id);

// Update the state with the new array
setnoti(updatedNoti);

    dispatch(ByIdRemoveNotification(el._id));
    const url = `/partner/devisDetail/${el._id}`;
    history.push(url);

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
<strong
 style={{ marginBottom: '8px',
    color: '#fff',
    backgroundColor:'#5e72e4',
    borderRadius: '4px',
    padding: '4px 8px',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '1.5',
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
     }}
>Nouvelle mission
</strong>

  <div style={{ marginBottom: '8px' }}>
    <strong>Nom du partenaire:</strong>{' '}
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
          : el?.validate_me ?
          <>
          <DropdownItem
  onClick={() => {
    const updatedNoti = noti.filter(item => item._id !== el._id);

// Update the state with the new array
setnoti(updatedNoti);

    dispatch(ByIdRemoveNotification(el._id));
    const url = `/admin/driver-details/${el?._id}`;
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
    <strong
    style={{ marginBottom: '8px',
    color: '#fff',
    backgroundColor: '#5e72e4',
    borderRadius: '4px',
    padding: '4px 8px',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '1.5',
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
     }}

    >Demande de validation du document </strong>{' '}

  </div>
  <div style={{ marginBottom: '8px' }}>
    <strong>conducteur: </strong>{' '}
    {el?.driver?.name}
  </div>
  <div style={{ marginBottom: '8px' }}>
    <strong>Email: </strong> {el?.driver?.email}
  </div>

</DropdownItem>

          </>:
          <>
          <DropdownItem
  onClick={() => {

  }}
            >
                <hr className="my-0" />

  <Col md="2">
    {el?.PartnerAccepted === "Accepted" ? (
      <>
        <div style={{ marginBottom: '2px' }}>
          <strong></strong> <strong
    color="info"
    outline
    // disabled
    style={{ marginBottom: '8px',
    color: '#0B0F0F',
    backgroundColor: '#5EE4D7',
    borderRadius: '4px',
    padding: '4px 8px',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '1.5',
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    cursor: 'none',
     }}
  >
    Devis confirmée par le partenaire
  </strong>
        </div>

      </>
    ) : (
      <>
        <div style={{ marginBottom: '2px' }}>


          <strong
           style={{ marginBottom: '8px',
    color: '#fff',
    backgroundColor: '#E4605E',

    borderRadius: '4px',
    padding: '4px 8px',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '1.5',
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    // cursor: 'pointer',
    cursor: 'none',

     }}
  >
   Devis non confirmée par le partenaire
  </strong>
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
    <strong>Nom du partenaire:</strong>{' '}
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
