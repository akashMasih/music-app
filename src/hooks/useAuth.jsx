import { useEffect, useState } from "react"

const { isBrowser, isEmpty } = require("@/utility/Utils")

export const USER = "Usbsbsmyhsbb63763y3h33g733g"
export const TOKEN = "dndndndbdbdhdtsdbdbdT"
const useAuth = () => {
    const [user, setUser] = useState({})
    const [token, setToken] = useState("")



    useEffect(() => {
        try {
            if (isEmpty(user)) {
                let data = localStorage.getItem(USER)
                let tokenData = localStorage.getItem(TOKEN)
                setUser(isEmpty(data) ? {} : JSON.parse(data))
                setToken(isEmpty(tokenData) ? "" : tokenData)
            }
        }
        catch (e) {
            console.log("Error in Auth", e)
        }
    }, [])

    const saveUser = (userData) => {
        if (!isEmpty(userData)) {
            localStorage.setItem(USER, JSON.stringify(userData))
            window.location.reload()
        }

    }

    const saveToken = (tokenData) => {
        if (!isEmpty(tokenData)) {
            localStorage.setItem(TOKEN, tokenData)
            return true
        }
    }
    const logout = () => {
        localStorage.removeItem(USER)
        window.location.reload()
    }
    const getUser = () => {
        let data = localStorage.getItem(USER)
        return isEmpty(data) ? {} : JSON.parse(data)
    }

    return { user, token, saveUser, saveToken, logout, getUser }
}

export default useAuth