import { app } from "../app";

export type UserModel = {
    type: 'public'|'private'
    id: string
    firstName: string
    lastName: string
    username: string
    profilePhoto: string
}

app.factory('UserModelFactory',()=>{
    class UserModel {
        type: 'public'|'private'
        id: string
        firstName: string
        lastName: string
        username: string
        profilePhoto: string
    }
    return UserModel
})