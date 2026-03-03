import { NavLink } from "react-router-dom";


const Header = () => {
    return (
        <div className="header">
            {/* Left Logo */}
            <div className="logo">
                <h2>Lugazi</h2>
            </div>

            {/* Navigation Menu */}
            <div className="nav-menu">
                <NavLink to="/" className="nav-item">
                    Dashboard
                </NavLink>

                <NavLink to="/users" className="nav-item">
                    User
                </NavLink>

                <NavLink to="/assign-duty" className="nav-item">
                    Assign Duty
                </NavLink>

                <NavLink to="/notification" className="nav-item">
                    Notification
                </NavLink>

                <NavLink to="/attendance" className="nav-item">
                    View Attendance
                </NavLink>

                <NavLink to="/patrolling" className="nav-item">
                    View Patrolling
                </NavLink>
            </div>

            {/* Right Profile */}
            <div className="profile">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="profile"
                    className="profile-img"
                />
            </div>
        </div>
    );
};

export default Header;