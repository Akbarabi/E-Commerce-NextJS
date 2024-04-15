import { PreinitModuleOptions } from "react-dom"

type CollectionType = {
    _id: string
    title: string
    description: string
    image: string
}

type ProductType = {
    _id : string
    title: string
    description: string
    media: [string]
    category: string
    collections:string
    qty: number
    tags: [string]
    price: number
    updateAt : Date
    createdAt : Date
}

