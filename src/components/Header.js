import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaQuestion} from 'react-icons/fa';

import logo from '../images/Prim6 final logos/logo.png';
import { logout } from '../redux/features/auth';

const Header = () => {
    const { user } = useSelector((state) => state.loginAuth)
    const { propertyList } = useSelector((state) => state.property)

    const dispatch = useDispatch()
    const location = useLocation()

    // Add purple border at the bottom of header if the user is outside of any property
    const locationIsProperty = () => {
        if (propertyList.some(function(el) {
            return el._id === location.pathname.split("/")[1];
        })) {
            return false
        }

        return true
    }

    const handleLogOut = () => {
        dispatch(logout())
    }

    return (
        <div>
            {user && propertyList && !(location.pathname.split("/")[1] === "email-verification") ? (
                <nav className={`navbar navbar-expand-lg navbar-light ${locationIsProperty() && "navbar-bottom"}`}>
                    <div className="container-fluid">
                        <Link className="navbar-left logo" to="/"><img draggable="false" src={logo} alt="logo" className="img-fluid"/></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="row justify-content-end">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/support"><FaQuestion color="red"/></Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FaUser />
                                        </Link>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <li><div className="dropdown-item pb-0"><b>Welcome</b> {user.username}</div></li>
                                            <li><div className="dropdown-item pt-0">{user.email}</div></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><Link className="dropdown-item" to="/user-profile">My Profile</Link></li>
                                            <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><button className="dropdown-item" onClick={handleLogOut}>Log Out</button></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className="navbar navbar-expand-lg navbar-light navbar-bottom">
                    <div className="container-fluid">
                        <Link className="navbar-left logo" to="/"><img draggable="false" src={logo} alt="logo" className="img-fluid"/></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            )}
        </div>
    );
}
 
export default Header;