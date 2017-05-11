'use strict';

const createDeleteButton = (noteId) => {
  const b = document.createElement('input');
  b.setAttribute('id', noteId);
  b.setAttribute('class', 'delete-button');
  b.setAttribute('type', 'button');
  b.setAttribute('value', 'Kustuta');
  getEl('.note-text-div').append(b);
  b.addEventListener('click', deleteCurrentNote);
};

const confirmNoteDeletion = (e) => {
  let currentNoteTitle = getEl('.note-title').value;

  if (confirm(`Delete note '${currentNoteTitle}'?`)) {
    deleteCurrentNote(e);
  };
};

// Kustutab valitud märkme firebase-st
const deleteCurrentNote = (e) => {
  fetch(`${URL}/notes/${e.target.id}.json`, {
    method: 'DELETE'
  })
  .then(() => {
    getEl('.note-text-div').classList.add('hidden');
    getEl('.note-title').value = "";
    getEl('.time-p').innerHTML = "";
    getEl('.note-text-div textarea').value = "";
    getEl('.save-exit-button').remove();
    getEl('.delete-button').remove();
    getAllNotes();
  })
  .catch(console.error);
};
