var {age, date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")


module.exports= {

    all(){
        return db.query(`
        SELECT profissionais. * ,SUM(consultas.valor_profissional) AS valor_profissional,
        SUM(consultas.valor_instituicao) AS valor_instituicao,
        COUNT(consultas) as total_consultas
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

   findBy(id){
       return db.query(`
       SELECT consultas. * , profissionais.nome
       FROM consultas
       LEFT JOIN profissionais ON (consultas.profissional_id = profissionais.id)
       WHERE profissional_id = $1`,[id])
   },

   totalValores(){
       return db.query(`
       SELECT SUM(consultas.valor_profissional) AS valor_profissional,
       SUM(consultas.valor_instituicao) AS valor_instituicao
       FROM  profissionais
       LEFT JOIN consultas ON (profissionais.id = consultas.profissional_id)
     `)
   }
}    
    