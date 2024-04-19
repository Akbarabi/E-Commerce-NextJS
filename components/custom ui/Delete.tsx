"use client"

import { Trash,} from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { toast } from "react-hot-toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios"

interface DeleteProps {
  item: string
  id: string
}

const Delete: React.FC<DeleteProps> = ({ id, item }) => {
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    try {
      setLoading(true)
      const itemType = item === "product" ? "products" : "collections"
      const res = await axios.delete(`/api/${itemType}/${id}`)

      if(res.status === 200) {
        setLoading(false)
        window.location.href = `/${itemType}`;
        toast.success(`${item} deleted successfully`)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }

  return (
    <div className="flex justify-center">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="bg-red-600">
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

  )
}

export default Delete