'use strict';

const URL = 'https://simple-notes-23614.firebaseio.com';

const getEl = (selector) => document.querySelector(selector);

const getElList = (selector) => document.querySelectorAll(selector);

const activateNoteList = () => {
  getEl('.note-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('note-item')) {
      let noteId = e.target.id;
      getEl('.note-menu').classList.add('hidden');

      displaySelNote(noteId)
      .then(activateNoteInUse)
      .catch(console.error)
    }
  })
};

// saab märkmed, listi menüü
getAllNotes();
activateNoteList();

// event listener, listi div
getEl('.new-note-div').addEventListener('click', () => {
  getEl('.note-menu').classList.add('hidden');
  getEl('.note-title-div').classList.remove('hidden');
});


getEl('.new-note-button').addEventListener('click', createNewNote);
