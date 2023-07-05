import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Preloader from './features/preloader/Preloader';
import Page from './components/Page';
import PrivateRoute from './components/PrivateRoute';
import { MainPage } from './pages/MainPage';
import { ThanksPage } from './pages/ThanksPage';
import { LoginPage } from './pages/LoginPage';
import routes from './constants/routes';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<Page />}>
                    <Route element={<PrivateRoute />}>
                        <Route index element={<MainPage />} />
                        <Route path={routes.thanks} element={<ThanksPage />} />
                    </Route>
                    <Route path={routes.login} element={<LoginPage />} />
                    <Route path="*" element={<Navigate to={routes.home} replace />} />
                </Route>
            </Routes>
            <Preloader />
        </div>
    );
}

export default App;
