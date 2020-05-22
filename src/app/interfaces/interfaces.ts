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
    dependencies?: Dependency[],
    waiting?: Document[],
    documents?:Document[]
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
    updated_at?:Date,
    created_at?:Date,
    filePath?:string,
    status?:number,
    response?:Respuesta,
    dependency?:Dependency
}

export interface Respuesta{
    id?:number,
    description?:string,
    file?:File,
    filePath?:string,
    created_at?:Date,
    document_id?:any
}