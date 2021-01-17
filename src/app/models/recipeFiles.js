var {age, date} =require("../lib/configs/utils")
var db = require("../lib/configs/db")

module.exports= {

    create({file_id,recipe_id}){
        const query = `
            INSERT INTO recipe_files (
                recipe_id,
                file_id
           
            )VALUES($1,$2)
            RETURNING id
        `
      
        const values = [
            recipe_id,
            file_id
        ]
        return db.query(query, values)
    },
    async delete(id) {
        try {
            const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = result.rows[0]
            fs.unlinkSync(file.path)
            // LOCAL DELETE

            await db.query(`DELETE FROM recipe_files WHERE recipe_files.file_id = $1`, [id])

            return db.query(`DELETE FROM files WHERE id = $1`, [id])
        } catch (err) {
            console.log(err)
        }
    }

}