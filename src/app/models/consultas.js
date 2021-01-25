var {age, date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")


module.exports= {

     all(){
       return db.query(`
        SELECT *  FROM consultas`
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
/*
    find(id){
       return db.query(`
        SELECT  recipes.*, chefs.name AS chef_recipes 
        FROM recipes 
        LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
        WHERE  recipes.id = $1`,[id])
        
    },
    
    findBy(filter){
       return db.query(`
        SELECT recipes.*, chefs.name AS chefs_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        OR chefs.name ILIKE '%${filter}%'`) 
    },

     update(data){
        var query = `
        UPDATE recipes SET
            title = ($1),
            ingredients = ($2),
            preparation = ($3),
            information = ($4),
            chef_id = ($5)
            WHERE id = $6
            `
        var values =[
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            data.id
        ]
      return  db.query(query, values)
    },  

    delete(id){
      return  db.query(`DELETE  FROM recipes WHERE id = $1`,[id])

    },

    chefSelectOptions(){
       return db.query(`SELECT name,id FROM chefs`)
    },

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
    }*/
}    
    