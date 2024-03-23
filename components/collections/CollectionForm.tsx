"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { Separator } from "../ui/separator"
import ImageUpload from "../custom ui/imageUpload"

const CollectionForm = () => {
    const formSchema = z.object({
        title: z.string().min(2).max(50),
        description: z.string().min(2).max(500).trim(),
        image: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

    }

    return (
        <div className="p-10x w-10/12">
            <p className="text-3xl font-bold">Create Collection</p>

            <Separator className="my-4 mb-7 bg-gray-500" />
            {/* Untuk membuat Form yang berisi title deskripsi dan gambar */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        // Untuk mengambil control dari constata form yang sudah di deklarasi
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            // Penamaan form item
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type your title here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Type your description here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <ImageUpload
                                     value={field.value ? [field.value] : []}
                                     onChange={(url) => field.onChange(url)}
                                     onRemove={() => field.onChange("")}
                                     />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default CollectionForm