"use client";

import { columns } from "@/components/collections/CollectionColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

import axios from "axios"

const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])

  const getCollections = async () => {
    try {
      const res = await axios.get("/api/collections")
      const data = await res.data
      setCollections(data)
      setLoading(false)

    } catch (err) {
      console.log("[Collection_GET]", err);

    }
  }

  useEffect(() => {
    getCollections()
  }, [])

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Collections</p>
          <Button className="bg-blue-500" onClick={() => router.push("/collections/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Collection
          </Button>
      </div>
      <Separator className="my-5" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  )
}

export default Collections