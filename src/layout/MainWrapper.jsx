import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';


const MainWrapper = ({ children }) => {
    return (
        <>
            {/* <Header />
            {children}
            <Footer /> */}
            <AdminHeader />
            <AdminSidebar />
            {children}
        </>

    )
}

export default MainWrapper