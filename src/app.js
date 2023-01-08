import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());
const PORT = 5000;

const usuariosArmazenados = [];
const tweetsArmazenados = [];

server.listen(PORT, () => {
    console.log("Servidor está no ar!");
})

server.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;
    if (username && avatar) {
        const novoUsuario = { nome: username, avatar: avatar };
        usuariosArmazenados.push(novoUsuario);
        res.send("OK");
        return;
    }

    res.status(422).send("Por favor, preencha o campo usuário e avatar corretamente")
})





