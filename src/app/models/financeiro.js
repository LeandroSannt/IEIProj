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

    filter(filter){
        return db.query(`
         SELECT profissionais. * ,count(consultas) AS total_consultas,
         SUM(consultas.valor_profissional) AS valor_profissional,
         SUM(consultas.valor_instituicao) AS valor_instituicao
         FROM  profissionais
         LEFT JOIN consultas ON (profissionais.id = consultas.profissional_id)
         WHERE profissionais.nome ILIKE '%${filter}%'
         OR profissionais.especialidade ILIKE '%${filter}%'
         GROUP BY profissionais.id`
         )
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


   find(id){
    return db.query(`
     SELECT  * FROM profissionais WHERE id = $1`,[id])
 },

findConsultas(id){
    return db.query(`
    SELECT consultas. *,profissionais.*
    FROM consultas
    LEFT JOIN profissionais ON (consultas.profissional_id = profissionais.id)
    WHERE profissional_id = $1
    `,[id])
},

   totalValores(){
       return db.query(`
       SELECT SUM(consultas.valor_profissional) AS valor_profissional,
       SUM(consultas.valor_instituicao) AS valor_instituicao
       FROM  profissionais
       LEFT JOIN consultas ON (profissionais.id = consultas.profissional_id)
     `)
   },

   selectPagos(){
       return db.query(`
       SELECT consultas.*,profissionais.nome AS profissional_nome,
       profissionais.especialidade AS profissional_especialidade
       FROM consultas
       LEFT JOIN profissionais ON(consultas.profissional_id = profissionais.id)
       WHERE consultas.pagamento = 'P'`)  
   },

   totalPagos(){
       return db.query(`
       SELECT COUNT(consultas.pagamento) AS total_pagos
       FROM consultas
       WHERE consultas.pagamento = 'P'
`)
   },

   selectNpagos(){
    return db.query(`
    SELECT consultas.*,profissionais.nome AS profissional_nome,
    profissionais.especialidade AS profissional_especialidade
    FROM consultas
    LEFT JOIN profissionais ON(consultas.profissional_id = profissionais.id)
    WHERE consultas.pagamento = 'NP'`)  

   },

   totalNpagos(){
    return db.query(`
    SELECT COUNT(consultas.pagamento) AS total_n_pagos
    FROM consultas
    WHERE consultas.pagamento = 'NP'
`)
}
}    
        