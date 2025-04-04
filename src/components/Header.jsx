import { useDispatch, useSelector } from 'react-redux'
import logo from '/public/assets/argentBankLogo.png'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/authSlice'
import { clearUser } from '../redux/userSlice'
export function Header() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const firstName = useSelector((state) => state.user.firstName)

    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout())
        dispatch(clearUser())
    }
    return (
        <header className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {isAuthenticated ? (
                <nav>
                    <NavLink className="main-nav-item" to="/profile">
                        <i className="fa fa-user-circle"></i> {firstName}
                    </NavLink>
                    <NavLink
                        className="main-nav-item"
                        onClick={handleLogout}
                        to="/"
                    >
                        <i className="fa fa-sign-out"></i> Sign out
                    </NavLink>
                </nav>
            ) : (
                <NavLink className="main-nav-item" to="/login">
                    <i className="fa fa-user-circle"></i> Sign In
                </NavLink>
            )}
        </header>
    )
}
