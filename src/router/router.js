import React, { Suspense } from 'react';
import { HomePage, EditUserPage, CreateUserPage } from '../pages/index'
import { Route, Routes } from 'react-router-dom'
import './router.css'

const ProexeRouter = () => {

    const Loader = () => {
        return (
            <div className="loader">
                <div>
                    <p>Proexe...</p>
                </div>

            </div>
        )
    }
    return (
        <Suspense fallback={
            <Loader />
        }>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/edit/:id" element={<EditUserPage />} />
                <Route path="/create-user" element={<CreateUserPage />} />
            </Routes>
        </Suspense>
    )
}

export default ProexeRouter;