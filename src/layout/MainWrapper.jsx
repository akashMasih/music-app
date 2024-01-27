import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { isEmpty } from '@/utility/Utils';
import UsersLayout from '@/components/users/layout/UsersLayout';
import useAuth from '@/hooks/useAuth';


const MainWrapper = ({ children }) => {
    const { user } = useAuth()
    return (

        <>
            {!isEmpty(user) ?
                <div>
                    <Header />
                    <div className="mt-[5rem]">
                        {children}
                    </div>
                    <Footer />
                </div>
                :
                <UsersLayout>
                    {children}
                </UsersLayout>

            }
        </>

    )
}

export default MainWrapper