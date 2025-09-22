import { sql } from "../config/db.js";

export const pegarTransacaoPorUserID = async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await sql `SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`
        res.status(200).json(transactions); 

    } catch (error) {
        console.log("Erro ao pegar transacao", error);
        res.status(500).json({ mensagem: "Erro ao criar transação"}); 
    } 
}

export const inserirTransacoes = async (req, res) => {
    //titulo, quantidade, categoria, usuario_id
    try {
        const { title, amount, category, user_id } = req.body;

        if(!title || !amount || !category || !user_id) return res.status(400).json({ mensagem: "Campos obrigatórios não foram preenchidos"});

        const transactions = await sql `INSERT INTO transactions (title, amount, category, user_id) VALUES (${title}, ${amount}, ${category}, ${user_id}) RETURNING *`

        console.log(transactions);
        res.status(201).json(transactions[0]);

    } catch (error) {
        console.log("Erro ao criar transacao", error);
        res.status(500).json({ mensagem: "Erro ao criar transação"});    
    }
}

export const deletarTransacao = async (req, res) => {
    try {
        const { id } = req.params;

        if(isNaN(parseInt(id))) return res.status(400).json({ mensagem: "ID inválido"});

        const transaction = await sql `DELETE FROM transactions WHERE id = ${id} RETURNiNG *`;

        if(transaction.length === 0) return res.status(404).json({ mensagem: "Transação não encontrada"});

        res.status(200).json({message:'Transação deletada com sucesso'});

    } catch (error) {
        console.log("Erro ao deletar a transacao", error);
        res.status(500).json({ mensagem: "Erro ao criar transação"});   
    }
}

export const resumoTransacoes = async (req, res) => {
    try {
        const { userId } = req.params;

        const balanceResult = await sql `SELECT 
            COALESCE(SUM(amount),0) AS balance
            FROM transactions 
            WHERE user_id = ${userId}
        `;

        const IncomeResult = await sql `SELECT 
            COALESCE(SUM(amount),0) AS income
            FROM transactions 
            WHERE user_id = ${userId} AND amount > 0
        `;

        const expenseResult = await sql `SELECT 
            COALESCE(SUM(amount),0) AS expense
            FROM transactions 
            WHERE user_id = ${userId} AND amount < 0
        `;

        res.status(200).json({
            balance: balanceResult[0].balance,
            income: IncomeResult[0].income,
            expense: expenseResult[0].expense
        });
    }
    catch (error) {
        console.log("Erro ao pegar o resumo", error);
        res.status(500).json({ mensagem: "Erro ao criar transação"});   
    }
}