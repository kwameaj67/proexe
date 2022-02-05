import React, { Suspense } from 'react';
import { HomePage, EditPage } from '../pages/index'
import { Route, Routes } from 'react-router-dom'


 const ProexeRouter = () => {

    const Loader = () => {
        return (
            <div className="loader">
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <Suspense fallback={
           <Loader/>
        }>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/edit:id" element={<EditPage />} />
            </Routes>
        </Suspense>
    )
}

export default ProexeRouter;