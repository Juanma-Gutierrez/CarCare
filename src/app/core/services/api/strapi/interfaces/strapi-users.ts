import { StrapiData } from "./strapi-data";

export interface StrapiUser {
    id: number,
    username: string,
    email: string
}

export type StrapiMe = StrapiUser;


/**
* Jwt Response
*/
export interface JwtResponse {
    jwt: string
    user: User
}
/**
 * User
 */
export interface User {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
}

/**
 * List of users
 */
export type UserList = User[]

/**
 * PostUser
 */
export interface PostUser {
    username: string
    email: string
    password: string
    role: number
}


/**
 * PostUserResponse
 */
export interface PostUserResponse {
    data: any
    error: Error
}

/**
* PostUserResponse error
*/
export interface Error {
    status: number
    name: string
    message: string
    details: Details
}

/**
* PostUserResponse Details
*/
export interface Details { }


export interface StrapiRegisterPayload {
    email: string,
    password: string,
    username: string
}

export interface StrapiOwner {
    id?: number,
    name: string,
    surname: string,
    user_id: number,
}


export interface PostStrapiRegister {
    data: {
        id?: number,
        name: string,
        surname: string,
        users_permissions_user: number,
    }
}