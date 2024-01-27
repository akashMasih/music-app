import { useEffect, useState } from "react"

const { isBrowser, isEmpty } = require("@/utility/Utils")

const useAuth = () => {
    const [user, setUser] = useState({})
    const [token, setToken] = useState("")



    useEffect(() => {
        try {
            if (isEmpty(user)) {
                let data = ""
                let tokenData = ""
                setUser(isEmpty(data) ? {} : JSON.parse(data))
                setToken(isEmpty(tokenData) ? "" : tokenData)
            }
        }
        catch (e) {
            console.log("Error in Auth", e)
        }
    }, [])

    return { user, token }
}

export default useAuth