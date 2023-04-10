class AddNoteScreen {
  get skipBtn() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]');
  }

  get addNoteTxt() {
    return $('//*[@text="Add note"]');
  }

  get textOption() {
    return $('//*[@text="Text"]');
  }

  get textEditing() {
    return $('//*[@text="Editing"]');
  }

  get noteHeading() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]');
  }

  get noteBody() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]');
  }

  get editBtn() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"]');
  }

  get viewNote() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]');
  }

  async saveNote() {
    await driver.back();
    await driver.back();
  }

  async skipTutorial() {
    await skipBtn.click();

    await expect(addNoteTxt).toBeDisplayed();
  }

  async addAndSaveNote(noteHeading, noteBody) {
    await addNoteTxt.click();
    await textOption.click();
    await expect(textEditing).toBeDisplayed();

    // add note title
    await noteHeading.addValue(noteHeading);

    // add note body
    await noteBody.addValue(noteBody);

    // save the changes
    await saveNote();

    // assertion
    await expect(editBtn).toBeDisplayed();
    await expect(viewNote).toHaveText(noteBody);
  }
}

export default new AddNoteScreen();
