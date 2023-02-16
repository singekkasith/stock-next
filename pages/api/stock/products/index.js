import {connect, model, models, Schema} from "mongoose"

const connectionString = 'mongodb+srv://yaboi:U2P8sC52fce1IkSY@cluster0.6w6ymbz.mongodb.net/stock' //mongodb dir   "/blogs" not "/test"

export default async function handler(req, res){
    await connect(connectionString);   // you have to restart next.js
    console.log("req.method: ", req.method)

    if (req.method === 'GET'){
        const docs = await Product.find()
        res.status(200).json(docs)
    }
    else if (req.method === "POST"){
        console.log(req.body)
        const doc = await Product.create(req.body)
        res.status(201).json(doc)
    }
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const productSchema = new Schema({
    code: String,
    name: String,
    price: Number,
});

console.log("Mongoose Models", models)
const Product = models?.product || model('product', productSchema);