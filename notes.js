const fs = require('fs');
const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note){
        return note.title === title;
    });

    if(duplicateNotes.length === 0){
        notes.push ({
        title: title,
        body: body
    });
    saveNotes(notes);
    console.log('New note added');
    }
    else{
        console.log('Note title taken');
    }
    
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const removeNote = function (title) {
    const notes = loadNotes();
    const newNotes = notes.filter(function(note){
        return note.title != title;
    });
    saveNotes(newNotes);
    console.log(JSON.stringify(newNotes));
}

module.exports = {
    getNotes: getNotes,
    addNote : addNote,
    removeNote: removeNote
}