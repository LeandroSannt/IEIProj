var {age, date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")


module.exports= {

     all(){
       return db.query(`
       SELECT * FROM consultas`
        )
    },

    create(data){
    var query =`
        INSERT INTO consultas(
            nome_paciente,
            data,
            hora,
            especialidade,
            valor_consulta,
            valor_instituicao,
            valor_profissional,
            pagamento,
            observacao,
            created_at
        )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING id
    `

        var values= [
            data.nome_paciente,
            data.data,
            data.hora,
            data.especialidade,
            data.valor_consulta,
            data.valor_instituicao,
            data.valor_profissional,
            data.pagamento,
            data.observacao,
            date(Date.now()).iso,
        ]
       return db.query(query,values)
    },

    find(id){
       return db.query(`
        SELECT  * FROM consultas WHERE id = $1`,[id])
        
    },

    update(data){
        var query = `
        UPDATE consultas SET
            nome_paciente = ($1),
            data = ($2),
            hora = ($3),
            especialidade = ($4),
            valor_consulta = ($5),
            valor_instituicao = ($6),
            valor_profissional = ($7),
            pagamento = ($8),
            observacao = ($9)
            WHERE id = $10
            `
        var values =[
            data.nome_paciente,
            data.data,
            data.hora,
            data.especialidade,
            data.valor_consulta,
            data.valor_instituicao,
            data.valor_profissional,
            data.pagamento,
            data.observacao,
            data.id
        ]
      return  db.query(query, values)
    },  

    delete(id){
      return  db.query(`DELETE  FROM consultas WHERE id = $1`,[id])

    },

    
    findBy(filter){
       return db.query(`
        SELECT profissionais.*, profissionais.nome AS profissionais_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        OR chefs.name ILIKE '%${filter}%'`) 
    },

    profissionaisSelect(){
       return db.query(`SELECT * FROM profissionais`)
    },

    profissionaisConsultas(){
        return db.query(`SELECT nome_paciente FROM consultas`)
    },

    piscicologia(){
        return db.query(`SELECT especialidade, 
        count(consultas.especialidade) AS total_piscicologia from consultas
        WHERE consultas.especialidade = 'Piscicologia'
        GROUP BY especialidade`)
    },

   nutricao(){
        return db.query(`SELECT especialidade, 
        count(consultas.especialidade) AS total_nutricao from consultas
        WHERE consultas.especialidade = 'Nutricao'
        GROUP BY especialidade`)
    },

    totalConsultas(){
        return db.query(`SELECT count(*) FROM consultas`)
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
    