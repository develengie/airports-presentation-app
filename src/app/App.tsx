import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/navBar';
import AirportPage from './pages/airportPage';
import AuthPage from './pages/authPage';
import MainPage from './pages/mainPage';
import { useAppDispatch } from './hooks/redux';
import { fetchHandbooks } from './store/actionCreators';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchHandbooks());
    }, [dispatch]);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/airport/:_id?" element={<AirportPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<MainPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <ToastContainer position="top-center" />
        </>
    );
}

export default App;
