export interface Usuario {
    id?:number,
    name?:string,
    email?:string,
    created_at?:Date,
    role?:Role,
    dependency?:Dependency
    role_id?:number,
    dependency_id?:number,
    position?:string,
    password?:string,
    password_confirmation?:string
}

export interface Role{
    id?:number,
    name?:string,
    usuarios?:Usuario[]
}

export interface GeneralInformation{
    users?: Usuario[],
    dependencies?: Dependency[]
}

export interface Dependency{
    id?:number
    name?: string,
    users?: Usuario[],
    created_at?: Date
}

export interface errorUsuario{
    name?:string,
    email?:string,
    role_id?:string,
    dependency_id?:string,
    position?:string,
    password?:string,
}

export interface Document{
    id?:number,
    name?:string,
    description?:string,
    created_at?:Date,
    filePath?:string,
    status?:number
}