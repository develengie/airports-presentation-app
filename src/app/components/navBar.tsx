import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/slices/authSlice';

const NavBar = () => {
    const dispatch = useAppDispatch();
    const { isAuth, email } = useAppSelector(state => state.authReducer);

    const handleLogout = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        dispatch(authSlice.actions.logout());
    };

    return (
        <nav className="flex justify-between items-center h-[50px] px-5 bg-gray-300 shadow-md">
            <Link to="/">Airport</Link>
            {!isAuth && <Link to="/auth">Auth</Link>}
            {isAuth && (
                <>
                    <span className="font-bold">{email.split('@')[0]}</span>
                    <a href="#" onClick={handleLogout}>
                        Logout
                    </a>
                </>
            )}
        </nav>
    );
};

export default NavBar;
