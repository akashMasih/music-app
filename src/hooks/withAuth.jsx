import { isEmpty, isEmptyArray } from "@/utility/Utils"
import useAuth from "./useAuth"
import { useRouter } from "next/router"



const withAuth = (WrappedComponent, roles = []) => {


    return (props) => {
        if (typeof window !== "undefined") {
            const { getUser } = useAuth()
            const user = getUser()
            const route = useRouter()
            if (!roles.includes(user?.role)) {
                route.replace('/users')
                return null;
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
};


export default withAuth