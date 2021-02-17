var {date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")


module.exports= {

     all(){
       return db.query(`
        SELECT consultas.*,
        TO_CHAR(data, 'DD/MM/YYYY') AS data_formatada ,
        profissionais.especialidade AS prof_esp,
        profissionais.nome AS prof_nome
        FROM consultas
        LEFT JOIN profissionais ON(consultas.profissional_id = profissionais.id)
        ORDER BY created_at desc`
        )
    },

    filter(filter){
        return db.query(`
        SELECT consultas.*,
        TO_CHAR(data, 'DD/MM/YYYY') AS data_formatada ,
        profissionais.especialidade AS prof_esp,
        profissionais.nome AS prof_nome
        FROM consultas
        LEFT JOIN profissionais ON(consultas.profissional_id = profissionais.id)
        WHERE consultas.nome_paciente ILIKE '%${filter}%'
        OR profissionais.nome ILIKE '%${filter}%'
        ORDER BY created_at desc`
         )
     },

    create(data){
    var query =`
        INSERT INTO consultas(
            nome_paciente,
            data,
            hora,
            valor_consulta,
            valor_instituicao,
            valor_profissional,
            pagamento,
            observacao,
            profissional_id,
            created_at
        )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING id
    `
        var values= [
            data.nome_paciente,
            date(data.data).iso,
            data.hora,
            data.valor_consulta,
            data.valor_instituicao,
            data.valor_profissional,
            data.pagamento,
            data.observacao,
            data.profissionais,
            date(Date.now()).iso
        ]
       return db.query(query,values)
    },

    find(id){
       return db.query(`
        SELECT  * FROM consultas WHERE id = $1`,[id])
    },

    findBy(id){
        return db.query(`
        SELECT profissionais.*
        FROM profissionais
        LEFT JOIN consultas ON (profissionais.id = consultas.profissional_id)
        WHERE consultas.id = $1`,[id]) 
     },

    profissionaisSelect(){
        return db.query(`
        SELECT * FROM profissionais
        ORDER BY created_at ASC
        `)
     },
 
    update(data){
        var query = `
        UPDATE consultas SET
            nome_paciente = ($1),
            data = ($2),
            hora = ($3),
            valor_consulta = ($4),
            valor_instituicao = ($5),
            valor_profissional = ($6),
            pagamento = ($7),
            observacao = ($8),
            profissional_id = ($9)
            WHERE id = $10
            `
        var values =[
            data.nome_paciente,
            data.data =  new Intl.DateTimeFormat('pt-BR').format(data.data),
            data.hora,
            data.valor_consulta,
            data.valor_instituicao,
            data.valor_profissional,
            data.pagamento,
            data.observacao,
            data.profissionais,
            data.id
        ]
      return  db.query(query, values)
    },  

    delete(id){
      return  db.query(`DELETE  FROM consultas WHERE id = $1`,[id])
    },
   
    totalConsultas(){
        return db.query(`SELECT count(*) AS total  FROM consultas
        WHERE consultas.data = CURRENT_DATE  `)
    },

    totalConsultasDia(){
        return db.query(`
        SELECT consultas.* ,profissionais.especialidade AS prof_esp,
        profissionais.nome AS prof_nome
        FROM consultas
        LEFT JOIN profissionais ON(consultas.profissional_id = profissionais.id)
        WHERE consultas.data = CURRENT_DATE`)
    },

    piscicologia(){
        return db.query(`SELECT profissionais.especialidade ,count(consultas) AS total
        FROM  profissionais
        LEFT JOIN consultas ON (profissionais.id = consultas.profissional_id)
        WHERE profissionais.especialidade = 'Psicologia'
        GROUP BY profissionais.especialidade
        `)
    },

    totalPiscicologia(){
        return db.query(`
        SELECT consultas.* ,profissionais.especialidade AS prof_esp,
        profissionais.nome AS prof_nome
        FROM consultas
        LEFT JOIN profissionais ON(consultas.profissional_id = profissionais.id)
        WHERE profissionais.especialidade = 'Psicologia'
        `)
    },

   nutricao(){
        return db.query(`
        SELECT profissionais.especialidade ,count(consultas) AS total
        FROM  profissionais
        LEFT JOIN consultas ON (profissionais.id = consultas.profissional_id)
        WHERE profissionais.especialidade = 'Nutricao'
        GROUP BY profissionais.especialidade
       `)    
    },

    totalNutricao(){
        return db.query(`       
         SELECT consultas.* ,
        profissionais.especialidade AS prof_esp,
        profissionais.nome AS prof_nome
        FROM consultas
        LEFT JOIN profissionais ON(consultas.profissional_id = profissionais.id)
        WHERE profissionais.especialidade = 'Nutricao'
       `)    
    }
}    
    