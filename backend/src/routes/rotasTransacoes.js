import express from "express";
import { deletarTransacao, inserirTransacoes, pegarTransacaoPorUserID, resumoTransacoes } from "../controllers/transacoesController.js";

const router = express.Router();


router.get("/:userId", pegarTransacaoPorUserID);

router.post("/", inserirTransacoes);

router.delete("/:id", deletarTransacao)

router.get("/summary/:userId", resumoTransacoes)

export default router;