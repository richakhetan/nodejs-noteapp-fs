const express = require('express')
const path = require('path')
const hbs = require('hbs')
const note = require('./notes.js')
const { title } = require('process')

const app = express()
console.log()
app.use(express.static(path.join(__dirname,"../public")))

app.set('view engine','hbs')
app.set('views', __dirname +'/templates/view')
hbs.registerPartials(__dirname+'/templates/partials')

app.get('', (req, res) => {
    res.render('index', {
        title: 'Note App',
        message: ''
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        message:"This is a help page which provides no help",
        title: "Help Page"
    })
})

app.get('/addNote',(req, res)=>{

    if(!req.query.title || !req.query.notebody){
        return  res.send({
            message : 'Provide title and notebody to add new note' 
        })
    }
    const message = note.addNotes(req.query.title,req.query.notebody)
    
    res.send({
        message 
    })
})

app.get('/removeNote',(req, res)=>{
    
    if(!req.query.title){
        return res.send({
            message : 'Provide title to remove Note' 
        })
    }
    const message = note.removeNote(req.query.title)
    
    res.send({
        message : "Note Removed !!!"
    })
})

app.get('/readNote',(req, res)=>{
   
    if(!req.query.title){
        return  res.send({
            message : 'Provide title to read Note' 
        })
    }

    let message = note.readNote(req.query.title)
    res.send({
        message
    })
})

app.get('/listNote',(req, res)=>{

    let notes = note.listAllNotes()  
    res.send({
        message : notes 
    })
})


app.get('/',(req, res)=>{
    res.render('about',{
        title:"About Application",
        message: "This is a ugly note taking application"
    })
})


app.listen(3000,()=>{
    console.log('Server is up and running at port 3000')
})