import { connect, model, models, Schema } from "mongoose"
//const connectionString = 'mongodb+srv://yaboi:U2P8sC52fce1IkSY@cluster0.6w6ymbz.mongodb.net/blogs'
const connectionString = process.env.MONGODB_URI

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)
    console.log("req.query.id", req.query.id)


    const id = req.query.id
    if (req.method === 'GET') {
        //Get only one document
        const doc = await Article.find({ _id: id}) //_id is the id in every docs so when call we can get 1 document not all
        res.status(200).json(doc)
    } else if (req.method === 'DELETE') {
        const deletedDoc = await Article.deleteOne({ _id: id})
        res.status(200).send(deletedDoc)
    } else if (req.method === 'PUT'){
        console.log('id',req.query.id)
        console.log(req.body)
        const updatedDoc = await Article.updateOne({ _id: id}, req.body)
        res.status(200).json(updatedDoc)
    } else {
        res.setHeader('Allow', ['GET', 'DELETE'])
        req.status(405).end(`Method ${req.method} Not Allowed`)
    }
}


const articleSchema = new Schema({
    title: String,
    content: String,
});

console.log("Mongoose Models", models)
const Article = models?.article || model('article' , articleSchema);
