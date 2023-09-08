import "./Nav.css";
import { useSelector } from "react-redux";
import store from "../../features/auth/store";
import { Link } from "react-router-dom";
import { logoutUser } from "../../features/auth/authActions";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Nav = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <nav className="main-nav">
            <Link to={`/`} className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={require("../../assets/img/argentBankLogo.png")}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div className="main-nav-items">
                {
                    (user && user.hasOwnProperty("isLogged") && user.isLogged) ?
                    <>
                        <Link to={`/profile`} className="main-nav-item">
                            <FaUserCircle />
                            {user.firstName}
                        </Link>
                        <Link to={`/`} className="main-nav-item" onClick={() => store.dispatch(logoutUser())}>
                            <FaSignOutAlt />
                            Sign Out
                        </Link>
                    </> :
                    <Link to={`/login`} className="main-nav-item">
                        <FaUserCircle />
                        Sign In
                    </Link>
                }
            </div>
        </nav>
    )
};

export default Nav;