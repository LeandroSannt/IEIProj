var {date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")
const {hash} = require ('bcryptjs')

module.exports= {

     async findOne(filters){
         let query = "SELECT * FROM users"

         Object.keys(filters).map(key =>{
             query = `
             ${query}
             ${key}
             `
             Object.keys(filters[key]).map(field =>{
                query = `${query} ${field} = '${filters[key][field]}'`
             })
         })
         const results = await db.query(query)
         return results.rows[0]
     },

    async  create(data){
        try{
            var query =`
            INSERT INTO users(
                nome,
                email,
                senha,
                cpf_cnpj,
                created_at
            )VALUES($1,$2,$3,$4,$5)
            RETURNING id
        `   
        
        const values= [
                data.nome,
                data.email,
                senhaHash = await hash(data.senha, 8),
                data.cpf_cnpj.replace(/\D/g,""),
                date(Date.now()).iso
            ]
           const results = await db.query(query,values)
           return results.rows[0].id

            }catch(err){
                console.error(err)
            }
        },
    }    
    