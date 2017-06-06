'use strict';

// Saab kõik märkmed ning lisab firebase võtme igale märkme objektile
const getAllNotes = () => {
  fetch(`${URL}/notes/.json`)
  .then((response) => response.json())
  .then(fbObj => {

    if (!fbObj) {
      getEl('.note-menu').classList.remove('hidden');
      return;
    }

    const values = Object.values(fbObj);
    const keys = Object.keys(fbObj);
    values.forEach((each, i) => each.key = keys[i]);
    return values;
  })
  .then(determineNoteState);
};
