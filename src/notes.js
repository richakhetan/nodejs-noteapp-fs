const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes();

    const checkDuplicate = notes.find((note) => note.title === title)
    if(!checkDuplicate){
        notes.push({
            title : title,
            body : body
        })
        saveNote(notes)
        return "Note added !!"
    } else{
        return "Note already taken !!"
    }
}

const saveNote = notes => {
    fs.writeFileSync('noteFile.json' ,JSON.stringify(notes))
}

const loadNotes = () => {
    try{
        const notes = fs.readFileSync('noteFile.json').toString();
        return JSON.parse(notes);
    }catch(err) {
        return [];
    }
}

const removeNote = title => {
    console.log(title)
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => {
        return note.title !== title;
    })

    if(notesToKeep.length === notes.length){
        return "Note not found !!"
    } else {
        saveNote(notesToKeep);
        return "Note Removed"
    }

    
}

const readNote = title => {
    const notes = loadNotes();
    const notesToRead = notes.find((note) => note.title === title)
    return notesToRead
}

const listAllNotes = () => {
    const notes = loadNotes();``
    return notes;
}

module.exports = {
    addNotes : addNotes,
    removeNote : removeNote,
    readNote : readNote,
    listAllNotes : listAllNotes
}