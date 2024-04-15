"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import { CollectionType, ProductType } from "@/lib/type";
import Delete from "../custom ui/Delete";
import Collection from "@/lib/models/Collection";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  qty: z.coerce.number().min(1),
  tags: z.array(z.string()),
  price: z.coerce.number().min(0.1),
});

interface ProductFormData {
  initialData?: ProductType | null;  /**Must have question mark to make it optional */
}

const ProductForm = ({ initialData }: ProductFormData) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? initialData :
      {
        title: "",
        description: "",
        media: [],
        category: "",
        collections: [],
        qty: 1,
        tags: [],
        price: 0.1,
      },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData ? `/api/products/${initialData._id}` : "/api/products";
      const res = await axios.post(url, values);
      if (res.status === 200) {
        setLoading(false);
        toast.success(`Products ${initialData ? "updated" : "created"}`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (err) {
      console.log("[Products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="pt-10 pr-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit products</p>
          <Delete id={initialData._id} />
        </div>
      ) : (
        <p className="text-heading2-bold">Create products</p>
      )}
      <Separator className="bg-gray-500 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} onKeyDown={handleKeyPress} />
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
                  <Textarea placeholder="Description" {...field} rows={5} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange(...field.value, url)}
                    onRemove={(url) => field.onChange(...field.value.filter((image) => image !== url))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="Ini adalah formfield">
            <FormField
              control={form.control}
              name="qty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantity" {...field} onKeyDown={handleKeyPress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} onKeyDown={handleKeyPress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Tags" {...field} onKeyDown={handleKeyPress} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="collections"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collections</FormLabel>
                  <FormControl>
                    <Multiselect />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;

