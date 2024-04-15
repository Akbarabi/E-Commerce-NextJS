import { ProductType } from '@/lib/type';
import { connectToDB } from "@/lib/mongoDB"
import { auth } from "@clerk/nextjs"
import { NextApiRequest } from "next"
import { NextResponse } from "next/server"
import Product from '@/lib/models/Products';

export const POST = async(req: NextApiRequest) => {
    try {
        const { userId } = auth()
        if(!userId){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        await connectToDB()

        const { title, description, media, category, collections, qty, tags, price} = await req.json()

        if(!title || !description || !media || !category || !collections || !qty || !price){
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }

        const newProduct = await Product.create({
            title,
            description,
            media,
            category,
            collections,
            qty,
            tags,
            price
        })

        await newProduct.save()
        return NextResponse.json({ message: "Product created successfully" }, { status: 200 })

    } catch (error) {
        console.log("[Products_POST]", error)
        return NextResponse.json({ message: "Internal error" }, { status: 500 })
    }
}