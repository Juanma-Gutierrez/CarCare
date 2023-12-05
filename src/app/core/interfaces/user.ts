export interface User {
    id?: number,
    users_permissions_user: number,
    username: string,
    email: string,
    name: string,
    surname: string,
}

export interface UserRegisterInfo {
    username: string,
    name: string,
    surname: string,
    email: string,
    password: string
    role: number
    userId: number
}