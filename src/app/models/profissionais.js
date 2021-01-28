var {age, date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")


module.exports= {

     all(){
       return db.query(`
        SELECT *  FROM profissionais`
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
            date(Date.now()).iso,
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

/*    
    findBy(filter){
       return db.query(`
        SELECT recipes.*, chefs.name AS chefs_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        OR chefs.name ILIKE '%${filter}%'`) 
    },


    delete(id){
      return  db.query(`DELETE  FROM recipes WHERE id = $1`,[id])

    },
    /*

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
    }
    */
}    
    