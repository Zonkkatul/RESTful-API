import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`Server is running in http://localhost:${PORT}`);
});

let users = [
    {
        id: 1, name: "1984", surname: "kjslkdjfksld"
    },
    {
        id: 2, name: "gdfgdfg", surname: "gdfgf"

    },
];

app.get("/users", (req,res) => {
    res.json(users);
});

app.post("/users", (req,res) => {
const newUser = {
    id: users.length +1,
    name: req.body.name,
    surname: req.body.surname,
};
users.push(newUser);
res.json({message: "New user added succesfully!", user: newUser})
});


app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((b) => b.id === userId);
    if(!user) {
        return res.status(404).json({message: "user not found"});
    }
    user.name = req.body.name || user.name;
    user.surname = req.body.surname || user.surname;
    res.json({message: "user updated succesfully", user});
});

app.delete("/users/:id", (req,res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((b) => b.id !== userId);
    res.json({message: "User deleted succesfully!"});
});