import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { socket } from "../../socket.js";
import { addUnseenmsg } from "Redux/actions/Notification.action.js";
import { GetCurrentUser } from "Redux/actions/userAction.js";

export default function Notificationcomp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [noti, setNoti] = useState([]);
  const user = useSelector(state => state?.auth?.user);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(GetCurrentUser());
    };

    fetchData();

    socket.on("message received", (newMessage) => {
      if (newMessage?.partner?._id === user?.id) {
        setNoti((prevNoti) => [...prevNoti, newMessage]);
        dispatch(addUnseenmsg(newMessage));
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [dispatch, user?.id]);

  const handleIconClick = () => {
    history.push("/notifications");
  };

  return (
    <div>
      <Badge badgeContent={noti.length} color="secondary">
        <NotificationsIcon onClick={handleIconClick} style={{ cursor: 'pointer' }} />
      </Badge>
    </div>
  );
}