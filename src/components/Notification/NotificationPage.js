import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardFooter, CardHeader, Container, Row, Spinner } from "reactstrap";
import { socket } from "../../socket.js";
import "./styles/Notifications.css";
import { GetCurrentUser } from "Redux/actions/userAction";
import { addUnseenmsg } from "Redux/actions/Notification.action";
import { ByIdRemoveNotification } from "Redux/actions/userAction";
import UserHeader from "components/Headers/UserHeader";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [noti, setNoti] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.currentUser?.users?.user);
  const user = useSelector((state) => state.auth?.user);

  // Fetch current user and initialize notifications
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(GetCurrentUser());
      if (currentUser) {
        setNoti(currentUser?.Newsocket || []);
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch, currentUser]);

  // Listen for socket events
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (newMessage?.partner?._id === user?.id) {
        setNoti((prev) => [...prev, newMessage]);
        dispatch(addUnseenmsg(newMessage));
      }
    };

    socket.on("message received", handleNewMessage);
    socket.on("validate_me", handleNewMessage);

    socket.on("Admin notification", (doc) => {
      if (user?.role === "ADMIN") {
        setNoti((prev) => [...prev, doc]);
        dispatch(addUnseenmsg(doc));
      }
    });

    return () => {
      socket.off("message received", handleNewMessage);
      socket.off("validate_me", handleNewMessage);
      socket.off("Admin notification");
    };
  }, [socket, user, dispatch]);

  const handleNotificationClick = (el, url) => {
    const updatedNoti = noti.filter((item) => item._id !== el._id);
    setNoti(updatedNoti);
    dispatch(ByIdRemoveNotification(el._id));
    history.push(url);
  };

const renderNotificationItem = (el, index) => {

  return (
    <div
    key={index}
    onClick={() => handleNotificationClick(el, `/${
    user?.role === "ADMIN" ? "admin" : "partner"
    }/request-details/${el?._id}`)}
    style={{
        padding: "16px",
        borderBottom: "1px solid #e0e0e0",
        cursor: "pointer",
        transition: "0.3s",
        margin: "0",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
  >
    {el?.newMissionPartner ? (
      <>
        <strong className="notification-title">Nouvelle mission</strong>
        <div><strong>Nom du partenaire:</strong> {el?.user?.contactName}</div>
        <div><strong>Depart:</strong> {el?.postalAddress}</div>
        <div><strong>Destination:</strong> {el?.postalDestination}</div>
      </>
    ) : el?.validate_me ? (
      <>
        <strong className="notification-title">Demande de validation du document</strong>
        <div><strong>Conducteur:</strong> {el?.driver?.name}</div>
        <div><strong>Email:</strong> {el?.driver?.email}</div>
      </>
    ) : (
      <>
        <div><strong>Nom du partenaire:</strong> {el?.partner?.contactName}</div>
        <div><strong>Depart:</strong> {el?.mission?.postalAddress}</div>
        <div><strong>Destination:</strong> {el?.mission?.postalDestination}</div>
      </>
    )}
  </div>
  );
};

  return (
    <>
     <UserHeader />
         <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Liste de toutes les notifications</h3>
                            </CardHeader>
      {loading ? (
        <div style={{ padding: "16px", textAlign: "center" }}>
          <Spinner color="primary" />
          {/* <div>Please wait...</div> */}
        </div>
      ) : !noti?.length ? (
        <div style={{ padding: "16px", textAlign: "center" }}>No new messages.</div>
      ) : (
        <>

                            <div className="card">

                            </div>
                            <CardFooter

                             >
                                <nav aria-label="...">
                                    {/* Pagination logic here */}
                                   { noti.map(renderNotificationItem)
}                                </nav>
                            </CardFooter>


      </>

      )}
      </Card>
                    </div>
                </Row>
            </Container>
    </>
  );
};

export default NotificationsPage;