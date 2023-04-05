import AddNoteScreen from "../../screenObjects/android/add-note.screen";
import editNoteScreen from "../../screenObjects/android/edit-note.screen";

describe('Delete Note', () => {
  before(async () => {
    await AddNoteScreen.skipTutorial();
    await AddNoteScreen.addAndSaveNote("TV shows", "Friends\nBreakingBad\nPeakyBlinders");
    await driver.back();
  });

  it('Delete a note & check the note in trash can', async () => {
    const note = await editNoteScreen.firstNote.getText();

    // click on the note
    await editNoteScreen.firstNote.click();

    // click on more icon
    await editNoteScreen.moreIcon.click();

    // click on Delete item
    await editNoteScreen.deleteIcon.click();

    // accept alert
    await driver.acceptAlert();

    // click on nav icon
    await editNoteScreen.navIcon.click();

    // click on trash can item
    await editNoteScreen.trashCanItem.click();

    // assertions
    const trashCanItem = await editNoteScreen.firstNote;

    await expect(trashCanItem).toHaveText(note);
  });
});
