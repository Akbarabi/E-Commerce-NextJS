import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";

export const GET = async (req: NextRequest, { params }: { params: { collectionsId: string } }) => {
    try {
        await connectToDB()
        const collection = await Collection.findById({
            _id: params.collectionsId
        })

        if (!collection) {
            return NextResponse.json({ message: "Collection not exist" }, { status: 404 });
        }

        return NextResponse.json({ collection }, { status: 200 })

    } catch (error) {
        console.log("[Collection_GET]", error);
        return NextResponse.json({ message: "Error fetching collection" }, { status: 400 })
    }
}

export const POST = async (req: NextRequest, { params }: { params: { collectionsId: string } }) => {
    try {
        await connectToDB()
        // to check if the user is logged in or authorized
        const { userId } = auth()

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        // to check if the collection exist
        let collection = await Collection.findById(params.collectionsId)

        if(!collection) {
            return NextResponse.json({ message: "Collection not exist" }, { status: 404 })
        }
        
        // to check if the title and image are provided
        const { title, description, image } = await req.json()

        if (!title || !image) {
            return NextResponse.json({ message: "Title and image are required" }, { status: 400 })
        }

        // to update the collection
        let updateCollection = await Collection.findByIdAndUpdate(
            {_id: params.collectionsId},
            {
                title,
                description,
                image
            },
            { new: true }
        )

        await updateCollection.save()

        return NextResponse.json({ message: "Collection updated successfully" }, { status: 200 })

    } catch (error) {
        console.log("[Collection_POST]", error);
        return NextResponse.json({ message: "Error updating collection" }, { status: 400 })
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { collectionsId: string } }) => {
    try {
        const { userId } = auth()
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        await connectToDB()

        await Collection.findOneAndDelete({
            _id: params.collectionsId
        })

        return NextResponse.json({ message: "Collection deleted successfully" }, { status: 200 })

    } catch (error) {
        console.log("[Colelction_DELETE]", error);
        return NextResponse.json({ message: "Error deleting collection" }, { status: 400 })
    }
}

