import { isExpired, decodeToken } from "react-jwt";


export function verifyToken(token) {
    try 
    {  
        if (new Date() < new Date(decodeToken(token).exp)) return true
        throw new Error()
    } 
    catch 
    {
        logout()
        alert('Sesión caducada! Ingrese sus credenciales nuevamente por favor')
    }
    return false
}

export const logout = () => {
    sessionStorage.removeItem('token')
    window.location.href = '/'
}