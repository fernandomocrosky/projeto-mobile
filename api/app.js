const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
    .connect("mongodb+srv://fernandobm:636322159a@cluster0.amktk8o.mongodb.net/fictions?retryWrites=true&w=majority")
    .then(() => app.emit("pronto"))
    .catch((e) => console.log(e))
;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./model/FictionModel");

const newFiction = {
    title: "Fiction 2",
    description: "Ola sou outra fiction",
    image: "./images/images.png",
    grade: 0.0,
    author: "Author teste 2",
    chapters: [{
        title: "Chapter 1",
        text: "Text test"
    },{
        title: "Chapter 2",
        text: "Text test",
    }],
}

app.get("/fictions",  async (req, res) => {
    const fictions = await db.find();
    res.send(fictions);
});

app.post("/fictions", async (req, res) => {
    const newFiction = req.body;
    let user = await db.create(newFiction);
    return user;
})

app.delete("/fictions/:id", async (req, res) => {
    let user = await db.deleteOne({_id: req.params.id});
    return user;
})

app.put("/fictions/:id", async (req, res) => {
    let user = await db.findOneAndUpdate(req.params.id, req.body, {new: true});
    return user;
});

app.on("pronto", () => {
   app.listen(3000, () => {
        console.log("Acessar localhost:3000");
        console.log("Servidor executado na porta 3000");
   });
});
