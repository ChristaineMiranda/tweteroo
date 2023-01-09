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
        res.status(201).send("OK");
        return;
    }

    res.status(400).send("Todos os campos são obrigatórios!");
})

server.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    const username = req.headers.user
    if (username && tweet) {
        const indiceUsuario = usuariosArmazenados.findIndex(usuario => usuario.nome === username);
        if (indiceUsuario === -1) {
            res.status(401).send("UNAUTHORIZED");
            return
        }
        const novoTweet = { username: usuariosArmazenados[indiceUsuario].nome, avatar: usuariosArmazenados[indiceUsuario].avatar, tweet: tweet };
        tweetsArmazenados.push(novoTweet);
        res.status(201).send("OK");
        return;
    }
    res.status(400).send("Todos os campos são obrigatórios!");
})

server.get("/tweets", (req, res) => {
    const exibirTweets = tweetsArmazenados.slice(-10)
    res.send(exibirTweets)
})





