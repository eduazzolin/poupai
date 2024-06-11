import express from "express";
import * as database from "../database.js";
import cors from "cors";

import dotenv from "dotenv-safe";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello aoba!");
});

app.get("/items", verifyJWT, async (req, res) => {
  const senhas = await database.getSenhasById(req.userId);
  res.send(senhas);
});

app.get("/item/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const senha = await database.getSenha(id, req.userId);
  res.send(senha);
});
app.delete("/item/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const senha = await database.removeSenha(id, req.userId);
  res.send(senha);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});

////////////////

app.post("/usuario", async (req, res) => {
  const { email, senha, nome, dt_nascimento } = req.body;
  const exists = await database.existsUsuarioEmail(email);
  if (exists) return res.status(409).send("Email já cadastrado");
  const novoUsuario = await database.insertUsuario(
    email,
    senha,
    nome,
    dt_nascimento
  );
  res.status(201).send(novoUsuario);
});

//authentication
app.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const usuario = await database.getUsuario(email, senha);
  if (!usuario) return res.status(401).send("No user found.");
  const id = usuario.id;

  const token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 1000 * 60 * 60 * 24,
  });

  return res.json({ auth: true, token: token });
});

app.post("/logout", function (req, res) {
  res.json({ auth: false, token: null });
});

function verifyJWT(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: err + " Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
}

app.post("/despesas", verifyJWT, async (req, res) => {
  const { descricao, valor, mes, ano, icone } = req.body;
  const novoDespesa = await database.insertDespesa(
    descricao,
    valor,
    mes,
    ano,
    req.userId,
    icone
  );
  res.status(201).send(novoDespesa);
});

app.get("/despesas/", verifyJWT, async (req, res) => {
  const { mes, ano } = req.query;
  if (!mes && !ano) {
    const despesas = await database.getDespesaByUsuario(req.userId);
    res.send(despesas);
  } else {
    const despesas = await database.getDespesaByUsuarioMesAno(
      req.userId,
      mes,
      ano
    );
    res.send(despesas);
  }
});

app.delete("/despesas/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const despesa = await database.removeDespesa(id);
  res.send(despesa);
});

app.put("/despesas/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const { descricao, valor, mes, ano, icone } = req.body;
  const despesa = await database.updateDespesa(
    id,
    descricao,
    valor,
    mes,
    ano,
    req.userId,
    icone
  );
  res.send(despesa);
});

app.get("/total/", verifyJWT, async (req, res) => {
  const { mes, ano } = req.query;
  const total = await database.getValorTotalById(mes, ano, req.userId);
  res.send(total);
})

app.get("/limites/", verifyJWT, async (req, res) => {
  const { mes, ano } = req.query;
  const limites = await database.getLimiteByUsuarioMesAno(req.userId, mes, ano);
  limites.valor = parseFloat(limites.valor)
  res.send(limites);
})

app.post("/limites/", verifyJWT, async (req, res) => {
  const { valor, mes, ano } = req.body;
  const novoLimite = await database.insertLimit(
    valor,
    mes,
    ano,
    req.userId
  );
  res.status(201).send(novoLimite);
})

app.delete("/limites/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const limite = await database.removeLimite(id);
  res.send(limite);
})

app.put("/limites/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const { valor, mes, ano } = req.body;
  const limite = await database.updateLimite(
    id,
    valor,
    mes,
    ano,
    req.userId
  );
  res.send(limite);
})
