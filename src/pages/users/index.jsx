import SEOHeader from '@/components/common/SEOHeader'
import UserLogin from '@/components/users/auth/UserLogin'
import Dashboard from '@/components/users/dashboard/Dashboard'
import { isEmpty } from '@/utility/Utils'
import React, { useEffect } from 'react'
import useAuth from '@/hooks/useAuth'

function Login() {
    const { user, token } = useAuth()


    if (isEmpty(user) && isEmpty(token))
        return (
            <>
                <SEOHeader />
                <UserLogin />
            </>
        )
    else
        return (
            <>
                <SEOHeader />
                <Dashboard />
            </>
        )
}

export default Login