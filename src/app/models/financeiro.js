var {age, date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")


module.exports= {

    all(){
        return db.query(`
        SELECT profissionais. * 
        FROM  profissionais
        LEFT JOIN consultas ON (profissionais.id = consultas.profissional_id)
        GROUP BY profissionais.id
        `)
    },

     SumProfissional(){
       return db.query(`
       SELECT profissionais. * ,SUM(consultas.valor_profissional) AS valor_profissional
       FROM  profissionais
       LEFT JOIN consultas ON (profissionais.id = consultas.profissional_id)
       WHERE consultas.pagamento = 'P'
       GROUP BY profissionais.id`
        )
    },

    filter(filter){
        return db.query(`
         SELECT profissionais. * ,count(consultas) AS total_consultas
         FROM  profissionais
         LEFT JOIN consultas ON (profissionais.id = consultas.profissional_id)
         WHERE profissionais.nome ILIKE '%${filter}%'
         OR profissionais.especialidade ILIKE '%${filter}%'
         GROUP BY profissionais.id`
         )
     },

    create(data){
    var query =`
        INSERT INTO profissionais(
            nome,
            especialidade,
            created_at
        )VALUES($1,$2,$3)
        RETURNING id
    `

        var values= [
            data.nome,
            data.especialidade,
            date(Date.now()).iso
        ]
       return db.query(query,values)
    },

    find(id){
       return db.query(`
        SELECT  * FROM profissionais WHERE id = $1`,[id])
        
    },

    update(data){
        var query = `
        UPDATE profissionais SET
            nome = ($1),
            especialidade = ($2)
            WHERE id = $3
            `
        var values =[
            data.nome,
            data.especialidade,
            data.id
        ]
      return  db.query(query, values)
    },  

    delete(id){
      return  db.query(`DELETE  FROM profissionais WHERE id = $1`,[id])

    },

}    
    