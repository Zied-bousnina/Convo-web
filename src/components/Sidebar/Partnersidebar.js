import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
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
  Container,
  Row,
  Col
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "Redux/actions/authActions";
import Logo from "components/Logo/logo";
import { Notifications } from "components/Navbars/Notifications";

const Partnersidebar = (props) => {
  const dispatch = useDispatch();
  const [collapseOpen, setCollapseOpen] = useState();

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const handleLogout = () => {
    dispatch(LogOut());
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const profile = useSelector(state => state?.profile?.profile);

  const createLinks = (routes) => {
    return routes?.map((prop, key) => {
      if (prop.layout === "/partner"
      && prop.path !== "/user-details/:id"
      && prop.path !== "/partner-details/:id"
      && prop.path !== "/AddPartner"
      && prop.path !== "/notifications"
      && prop.path !== "/edit-Partner/:id"
      && prop.path !=='/partner-details/:id'
      && prop.path !=='/quote-details/:id'
      && prop.path !=='/tech-assist-detail/:id'
      && prop.path !=='/contact-detail/:id'
      // && prop.path !=='/AddRequest'
      && prop.path !=='/quote-details/:id'
      && prop.path !=='/tech-assist-detail/:id'
      && prop.path !=='/contact-detail/:id'
      // && prop.path !=='/AddRequest'
      // && prop.path !=='/user-profile'
      && prop.path !=='/Mapcomponent'&&
      prop.path !=='/request-details/:id'&&
      prop.path !=='/AddDriver' &&
      prop.path !=='/edit-Driver/:id'&&
      prop.path !=='/driver-details/:id'&&
      prop.path !=='/devisDetail/:id'&&
      prop.path !=='/edit-mission/:id'&&
      prop.path !=='/devis/:id'&&
      prop.path !=='/Edit-profile'
      &&
      !prop?.invisible
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
      tag: Link
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      target: "_blank"
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light"
      expand="lg"
      id="sidenav-main"
      style={{ backgroundColor: '#F1F4FD' }} // Change this color to your desired background color
    >
      <Container fluid>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <Logo width="50px" maxHeight="50px" objectFit="contain" />
          </NavbarBrand>
        ) : null}
        <Nav className="align-items-center d-md-none">
          <Notifications />
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={profile?.avatar ? profile?.avatar : 'https://www.gravatar.com/avatar/05b6d7cc7c662bf81e01b39254f88a49?d=identicon'}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/partner/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <Logo width="50px" height="auto" />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <Logo width="50px" height="auto" />
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
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Partnersidebar.defaultProps = {
  routes: [{}]
};

Partnersidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired
  })
};

export default Partnersidebar;