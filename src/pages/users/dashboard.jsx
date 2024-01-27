import Dashboard from '@/components/users/dashboard/Dashboard'
import withAuth from '@/hooks/withAuth'
import { isEmpty } from '@/utility/Utils'

function DashboardD() {
    return (
        <>
            <Dashboard />
        </>
    )
}

export default withAuth(DashboardD, ["1"])