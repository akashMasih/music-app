// import SEOHeader from '@/components/common/SEOHeader'
import Dashboard from '@/components/users/dashboard/Dashboard'
import useAuth from '@/hooks/useAuth'
import { isEmpty } from '@/utility/Utils'
import React, { useEffect } from 'react'

function Login() {
    // const { user, token } = useAuth()


    return (
        <>
            <Dashboard />
        </>
    )
}

export default Login