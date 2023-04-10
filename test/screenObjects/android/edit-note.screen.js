
class EditNoteScreen {
  get firstNote() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]');
  }
  get moreIcon() {
    return $('~More');
  }
  get deleteIcon() {
    return $('//*[@text="Delete"]');
  }
  get navIcon() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]');
  }
  get trashCanItem() {
    return $('//*[@text="Trash Can"]');
  }

}

export default new EditNoteScreen();
