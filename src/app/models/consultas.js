var {date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")


module.exports= {

     all(){
       return db.query(`
        SELECT consultas.* ,profissionais.especialidade AS prof_esp,
        profissionais.nome AS prof_nome
        FROM consultas
        LEFT JOIN profissionais ON(consultas.profissional_id = profissionais.id)
        ORDER BY hora ASC`
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
        date(data.data).format
        var values= [
            data.nome_paciente,
            data.data,
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
            data.data,
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
        WHERE profissionais.especialidade = 'Piscicologia'
        GROUP BY profissionais.especialidade
        `)
    },

    totalPiscicologia(){
        return db.query(`
        SELECT consultas.* ,profissionais.especialidade AS prof_esp,
        profissionais.nome AS prof_nome
        FROM consultas
        LEFT JOIN profissionais ON(consultas.profissional_id = profissionais.id)
        WHERE profissionais.especialidade = 'Piscicologia'
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

/*
    paginate(params){
        const {filter,limit,offset,callback} = params

        let query ="",
            filterQuery ="",
            totalQuery=`(
            SELECT count(*) FROM recipes
        ) AS total `

            if(filter){
                filterQuery =`
                WHERE recipes.title ILIKE '%${filter}%'
                 OR chefs.name ILIKE '%${filter}%'
                `
                totalQuery =`(
                    SELECT count (*) FROM recipes
                     ${filterQuery}
                ) as total`
            }

            queryFind =`
            `

            query =`
            SELECT recipes. *, ${totalQuery}, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${filterQuery}
            LIMIT $1 OFFSET $2`

            db.query(query,[limit,offset],function(err,results){
                if(err) throw "Database error"

                callback(results.rows)
            })
        },

    files(id){
        return db.query(`
        SELECT files.*, recipe_files.file_id AS file_id
        FROM files 
        LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
        WHERE recipe_files.recipe_id = $1
      `,[id]);
    },
    async recipeFiles(id) {
        const query = `
        SELECT *, (
            SELECT files.path
            FROM files
            LEFT JOIN recipe_files 
            ON (files.id = recipe_files.file_id)
            WHERE recipe_files.recipe_id = $1
            LIMIT 1
            ) 
        FROM recipes 
        LEFT JOIN recipe_files ON 
        (recipes.id = recipe_files.recipe_id)
        WHERE recipes.id = $1
        LIMIT 1
        `

        const results = await db.query(query, [id])

        return results.rows
    }
    */
}    
    