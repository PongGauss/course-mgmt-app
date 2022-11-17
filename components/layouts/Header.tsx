import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  selectProfileState,
  setProfileInitialState,
} from '../../stores/profileSlice';
import { selectAuthState, setAuthState } from '../../stores/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthenTokenFromStorage } from '../../apis/auth';
import { useRouter } from 'next/router';
import { ROLE_NAME } from '../../constant/role.const';

export const Header = () => {
  const profileState = useSelector(selectProfileState);
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(setAuthState(false));
    dispatch(setProfileInitialState(true));
    removeAuthenTokenFromStorage();
    router.push('/login');
  };

  const handleCreateCourse = () => {
    router.push('/create-course');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#" onClick={handleHome}>
          Course Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {authState ? (
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              {profileState && profileState.role === ROLE_NAME.INSTRUCTOR ? (
                <Nav.Link href="#" onClick={handleCreateCourse}>
                  <b>Create course</b>
                </Nav.Link>
              ) : (
                ''
              )}

              <NavDropdown
                title={profileState.firstName + ' ' + profileState.lastName}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#" onClick={handleProfile}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        ) : (
          ''
        )}
      </Container>
    </Navbar>
  );
};
