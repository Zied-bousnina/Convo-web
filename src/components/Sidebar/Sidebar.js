/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "Redux/actions/authActions";
import Logo from "components/Logo/logo";
import { Notifications } from "components/Navbars/Notifications";

var ps;

const Sidebar = (props) => {
  const dispatch = useDispatch()
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  const handleLogout=()=>{
    dispatch(LogOut())
  }
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  const profile = useSelector(state=>state?.profile?.profile)
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes?.map((prop, key) => {
      if (prop.layout === "/admin" && prop.path !== "/user-details/:id" && prop.path !== "/partner-details/:id" && prop.path !== "/AddPartner" && prop.path !== "/edit-Partner/:id" && prop.path !=='/partner-details/:id' && prop.path !=='/quote-details/:id'  && prop.path !=='/tech-assist-detail/:id' && prop.path !=='/contact-detail/:id' && prop.path !=='/AddRequest' && prop.path !=='/Add-Point-Bin' && prop.path !=='/bin-details/:id' && prop.path !=='/quote-details/:id'  && prop.path !=='/tech-assist-detail/:id' && prop.path !=='/contact-detail/:id' && prop.path !=='/AddRequest' && prop.path !=='/Add-Point-Bin' && prop.path !=='/edit-bin/:id' && prop.path !=='/point-bin-details/:id' && prop.path !=='/edit-Point-bin/:id'
      // && prop.path !=='/user-profile'
      && prop.path !=='/municipal-details/:id'&& prop.path !=='/Add-Point-Bin/:idQuote'&& prop.path !=='/Mapcomponent'&&
      prop.path !=='/request-details/:id'&&
      prop.path !=='/AddDriver' &&
      prop.path !=='/notifications' &&
      prop.path !=='/edit-Driver/:id'&&
      prop.path !=='/edit-mission/:id'&&
      prop.path !=='/driver-details/:id'&&
      prop.path !=='/SpecifiqueMission/:id'&&
      prop.path !=='/createDevis/:id'&&
      prop.path !=='/editdevis/:id' &&
      prop.path !=='/updateCategorie/:id'&&
      prop.path !=='/Edit-profile'&&
      !prop?.invisible
      // prop.path !=='/ListCategorie'
      ) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"

              data-toggle={
                prop?.collapse
                  ? "collapse"
                  : ""
              }

            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
            <Collapse isOpen={prop?.collapse
            ?
            activeRoute(prop.layout + prop.path)
            :
            false
            }>
              <Nav className="nav-sm flex-column">
                {createLinks(prop.views)}

              </Nav>
            </Collapse>
          </NavItem>
        );
      } else {
        return null;
      }
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      // to: logo.innerLink,
      tag: Link
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      // href: logo.outterLink,
      target: "_blank"
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light"
      expand="lg"
      id="sidenav-main"
      style={{ backgroundColor: '#F1F4FD' }}
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
          <Logo
  width= '50px' maxHeight= '50px'  objectFit= 'contain'

  />
          </NavbarBrand>
        ) : null}
        {/* User */}

        <Nav className="align-items-center d-md-none">
        <Notifications/>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
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
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem> */}
              {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem> */}
              {/* <DropdownItem to="/admin/user-profile" tag={Link}>
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
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          {/* <h6 className="navbar-heading text-muted">Documentation</h6> */}
          {/* Navigation */}
          {/* {/* <Nav className="mb-md-3" navbar> */}
            {/* <NavItem
            onClick={handleLogout}
            >

            <i  className="ni ni-user-run ml-2" />
                  <span >Logout</span>

            </NavItem> */}


          </Nav>
          {/* <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
              </NavLink>
            </NavItem>
          </Nav> */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
