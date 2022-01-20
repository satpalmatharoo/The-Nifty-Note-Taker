const router = require ("express").Router()
const util = require ("util")
const fs = require ("fs")


const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


router.get ("/notes", async(req,res) => {
    const notes = await readFileAsync ("db/db.json", "utf-8")
    const parsednotes = [] .concat(JSON.parse(notes)) 

    console.log (notes)
    res.json (parsednotes) 
})
module.exports = router