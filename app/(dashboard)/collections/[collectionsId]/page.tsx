"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import Loader from "@/components/custom ui/Loader"
import CollectionForm from "@/components/collections/CollectionForm"

interface collectionType {
    _id: string
    title: string
    description: string
    image: string
    createdAt: string
    updatedAt: string
}

const CollectionDetails = ({params}: {params: {collectionsId: string}}) => {
    const [loading, setLoading] = useState(true)
    const [CollectionDetails, setCollectionDetails] = useState<collectionType | null>(null)

    const getCollectionDetails = async() => {
        try {
            const res = await axios.get(`/api/collections/${params.collectionsId}`)
            setCollectionDetails(res.data.collection)
            setLoading(false)
        } catch (error) {
            console.log("[collectionsId_GET]", error);
            toast.error("Something went wrong!")
            setLoading(false)
        }
    }

    useEffect(() => {
        getCollectionDetails()
    }, [])

  return loading ? <Loader /> : (
    <CollectionForm initialData={CollectionDetails} />
  )
}

export default CollectionDetails