var {age, date} =require("../lib/configs/utils")
const fs = require("fs")
var db = require("../lib/configs/db")


module.exports= {

    create({filename,path}){
        const query = `
            INSERT INTO files (
                name,
                path
               
            )VALUES($1, $2)
            RETURNING id
        `
      
        const values = [
            filename,
            path
           
        ]
        return db.query(query, values)
    },

    async delete(id){
        try {
            const result = await db.query(`SELECT * FROM files WHERE id = ${id}`);
            const file = result.rows[0];
            fs.unlinkSync(file.path); 

            await db.query(`DELETE FROM files WHERE id = ${id}`);
            return;

        } catch (err) {
            console.error(err);
        }
    }
}