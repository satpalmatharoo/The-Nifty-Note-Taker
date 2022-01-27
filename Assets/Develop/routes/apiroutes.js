const router = require ("express").Router()
const util = require ("util")
const fs = require ("fs")
const uuid = require ("uuid")


const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


router.get ("/notes", async(req,res) => {
    const notes = await readFileAsync ("db/db.json", "utf-8")
    const parsednotes = [] .concat(JSON.parse(notes)) 

    console.log (notes)
    res.json (parsednotes) 
})


router.post ("/notes", async(req,res) => {
   
    const notes = await readFileAsync ("db/db.json", "utf-8")
    const parsednotes =JSON.parse(notes) 
    const newNote = {...req.body, id:uuid()}
    const newNotes = [...parsednotes,newNote];
    writeFileAsync("db/db.json", JSON.stringify(newNotes))
    res.json(newNotes)


 })

router.delete("/notes/:id", async(req,res) => {
    const notes = await readFileAsync ("db/db.json", "utf-8")
    const parsednotes =JSON.parse(notes)
    const filterNotes =parsednotes.filter(note => note.id !==req.params.id)
    writeFileAsync("db/db.json", JSON.stringify(filterNotes))
    res.json({ok:true})

})

module.exports = router


