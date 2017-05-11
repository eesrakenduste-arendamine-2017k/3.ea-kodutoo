'use strict';

// Salvestamise ja sulgemise nupp
const createItemSaveAndExitButton = (noteId) => {
  const b = document.createElement('input');
  b.setAttribute('id', noteId);
  b.setAttribute('class', 'save-exit-button');
  b.setAttribute('type', 'button');
  b.setAttribute('value', 'Salvesta');
  getEl('.note-text-div').append(b);
  b.addEventListener('click', saveCurrentNoteAndExit);
};

// Uuendab märget firebase-s
// Peale seda läheb märkmete listi
const saveCurrentNoteAndExit = (e) => {
  fetch(`${URL}/notes/${e.target.id}.json`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: getEl('.note-title').value,
      text: getEl('.note-text-div textarea').value,
      inUse: false,
      timeStamp: `${Date().slice(4,10)} ${Date().slice(16, 24)}`
    })
  })
  .then(() => {

    getEl('.note-title').value = "";
    getEl('.note-text-div textarea').value = "";
    getEl('.note-text-div').classList.add('hidden');
    getEl('.save-exit-button').remove();
    getEl('.delete-button').remove();
  })
  .then(() => getAllNotes())
  .catch(console.error);
};
