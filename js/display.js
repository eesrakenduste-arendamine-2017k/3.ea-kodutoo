'use strict';

// Kuvab arrayd märkmete objektidest firebase-s
const displayNoteList = (noteList) => {
  let html = "";
  getEl('.note-list').classList.remove('hidden');

  noteList.forEach((each) => {
    html += `
    <p class="note-item" id="${each.key}">${each.title}</p>
    `;
  })

  getEl('.note-list').innerHTML = html;
};

// Kuvab valitud märkme eraldi
const displaySelNote = (noteId) => {
  return fetch(`${URL}/notes/${noteId}.json`)
  .then(response => response.json())
  .then(noteObj => {
    getEl('.note-list').innerHTML = "";
    getEl('.note-text-div').classList.remove('hidden');
    getEl('.note-text-div textarea').value = noteObj.text;
    getEl('.note-title').value = noteObj.title;
    getEl('.time-p').innerHTML = 'Viimati salvestatud: ' + `<b>${noteObj.timeStamp}</b>`;

    createItemSaveAndExitButton(noteId);
    createDeleteButton(noteId);

    return noteId;
  })
};

window.onload = function()
{
    if (typeof localStorage['popup.width'] == 'undefined') {
        document.body.style.width = '300px';
    } else {
        document.body.style.width = localStorage['popup.width'] * 150 + 'px';
    }

};
