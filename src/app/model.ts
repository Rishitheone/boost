export interface user{
    email:string;
    id:number;
    jwtToken:string;
    exp:number;
}
export interface Datum{
    status:number;
    user:user;
}

export interface createUser{
    name:string;
    password:string;
    email:string;
}