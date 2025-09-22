import "dotenv/config";
import { neon } from "@neondatabase/serverless";


//Cria a conexão sql com o banco de dados da aplicação
export const sql = neon(process.env.DATABASE_URL);

//iniciar o banco de dados
export async function initDB() {
    try{
        await sql `CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount Decimal(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`
        
        console.log("Databse is running");
        
    }catch(err){
        console.log("Erro initializing database", err);
        process.exit(1);
    }
}
