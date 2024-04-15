import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : String,
    description : String,
    media : [String],
    category : String,
    collections : [{type : mongoose.Schema.Types.ObjectId, ref : "Collection"}],
    qty : Number,
    tags : [String],
    price : {type : mongoose.Schema.Types.Decimal128, get: (v : mongoose.Schema.Types.Decimal128) => parseFloat(v.toString())},
    createdAt : Date,
    updatedAt : Date
})
const Product =mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
