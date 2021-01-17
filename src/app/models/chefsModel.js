var {age, date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")


module.exports= {

    all(){
        return db.query(` 
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            GROUP BY chefs.id`)
    },

    create(data){
    var query =`
        INSERT INTO chefs(
            name,
            avatar_url,
            created_at
        )VALUES($1,$2,$3)
        RETURNING id
    `
        var values= [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]
       return db.query(query,values)
    },

    find(id){
       return  db.query(`
        SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`,[id])
    },

    findRecipes(id){
       return db.query(`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE chef_id = $1`, [id])
    },

    update(data){
        var query = `
        UPDATE chefs SET
            name = ($1),
            avatar_url = ($2)
            WHERE id = $3
            `
        var values =[
            data.name,
            data.avatar_url,
            data.id
        ]
      return  db.query(query, values)
    },

    delete(id){
      return  db.query(`DELETE  FROM chefs WHERE id = $1`,[id])
    }
  
}