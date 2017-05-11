'use strict';

const determineNoteState = (noteArray) => {
  if (!noteArray) {
    return;
  }

  const activeNote = noteArray.filter(each => each.inUse);

  if (activeNote.length === 1) {
    // kuvab kasutusel olevad märkmed
    displaySelNote(activeNote[0].key);
  } else {
    getEl('.note-menu').classList.remove('hidden');
    displayNoteList(noteArray);
  }
};

// Muudab lahti oleva märkme kasutusel olevaks märkmeks
const activateNoteInUse = (noteId) => {
  return fetch(`${URL}/notes/${noteId}.json`, {
    method: 'PATCH',
    body: JSON.stringify({ inUse: true })
  })
};
