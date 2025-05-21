import express from "express";
const app = express();
import http from "node:http";
const createServer = http.createServer(app);
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import userModel from "./src/models/userModel.js";
import cors from 'cors';


app.use(cors({
  origin: ['https://f1-wiki-frontend.onrender.com', 'http://localhost:4200'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.disable("x-powered-by")



app.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(403).json({ error: "Preencha todos os campos obrigatórios." });
  }

  try {
    const usuarioEmail = await userModel.findOne({ email });
    if (usuarioEmail) {
      return res.status(403).json({ error: "Esse email já foi cadastrado!" });
    }

    const hash = await bcrypt.hash(password, 10);
    await userModel.create({
      fullname,
      email,
      password: hash,
    });

    res.status(201).json({ msg: `Usuário criado com sucesso!` });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível receber os dados necessários. ${error.message}` });
  }
});



app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ error: "Preencha todos os campos obrigatórios" });
  }

  try {
    const usuarioExistente = await userModel.findOne({ email });
    if (!usuarioExistente) {
      return res.status(403).json({ error: "Esse email não foi registrado!" });
    }

    const verificarSenha = await bcrypt.compare(password, usuarioExistente.password);
    if (!verificarSenha) {
      return res.status(403).json({ error: "Senha inválida" });
    }

    res.status(200).json({ 
      msg: `Login feito com sucesso!`, 
      fullname: usuarioExistente.fullname,
      email: usuarioExistente.email
    });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível receber os dados necessários. ${error.message}` });
  }
});


const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://marcoau4564:1234@web.chnsiby.mongodb.net/", {
    dbName:"LoginUser"
}).then(()=>{
    console.log("Banco de Dados sincronizado com sucesso!");
}).catch((error)=>{
    console.log(`Não foi possivel sincronizar o banco de dados. ${error.message}`);
})

createServer.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});

