
import { LogOut } from "Redux/actions/authActions";
import {  useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,

  Navbar,
  Nav,
  Container,
  Media,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge
} from "reactstrap";
import { Notifications } from "./Notifications";
import classNames from "classnames";

const AdminNavbar = (props) => {
  const user = useSelector(state=>state?.auth?.user)
  const profile = useSelector(state=>state?.profile?.profile)
 const dispatch = useDispatch()
  const handleLogout = ()=>{
    dispatch(LogOut())


  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <span
            className="h4 mb-0  text-black text-uppercase d-none d-lg-inline-block"
            // to="/"
          >
            {props.brandText}
          </span>
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          {/* NOtifications */}
          {/* <Notifications/> */}

          <Nav className="align-items-center d-none d-md-flex indent-100" navbar>
          <Notifications/>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        profile?.avatar ?
                        profile?.avatar :
                       'https://www.gravatar.com/avatar/05b6d7cc7c662bf81e01b39254f88a49?d=identicon'
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-dark font-weight-bold">
  {user?.name}
</span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Mon profil</span>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem> */}
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem> */}
                {/* <DropdownItem to="/" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem> */}
                <DropdownItem divider />
              <DropdownItem  onClick={handleLogout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
