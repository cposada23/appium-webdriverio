describe('Delete Note', () => { 

  it('add a note, save changes & verify note & delete it', async () => {
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]').click();

    await expect($('//*[@text="Add note"]')).toBeDisplayed();

    await $('//*[@text="Add note"]').click();
    await $('//*[@text="Text"]').click();
    await expect($('//*[@text="Editing"]')).toBeDisplayed();

    // add note title
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]')
      .addValue("Fav Anime List");

    // add note body
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]')
      .addValue("Naruto");

    // save the changes
    await driver.back();
    await driver.back();

    // assertion
    await expect($('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"]'))
      .toBeDisplayed();
    await expect($('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]'))
      .toHaveText("Naruto");
    
    await driver.pause(3000);

    await driver.back();
    await expect($('//*[@text="Fav Anime List"]')).toBeDisplayed();

    await $('//*[@text="Fav Anime List"]').click();

    await $('//android.widget.ImageButton[@content-desc="More"]').click();

    await expect($('//*[@text="Delete"]')).toBeDisplayed();

    await $('//*[@text="Delete"]').click();

    await $('//*[@resource-id="android:id/button1"]').click();
    // accept alert I can do this step like this too
    // await driver.acceptAlert();


    await expect($('//*[@text="Fav Anime List"]')).not.toExist();


  });


  it.only('add a note, save changes & verify note', async () => {

    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]').click();

    await expect($('//*[@text="Add note"]')).toBeDisplayed();

    await $('//*[@text="Add note"]').click();
    await $('//*[@text="Text"]').click();
    await expect($('//*[@text="Editing"]')).toBeDisplayed();

    // add note title
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]')
      .addValue("Fav Anime List");

    // add note body
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]')
      .addValue("Naruto\nOnePiece\nAOT");

    // save the changes
    await driver.back();
    await driver.back();

    // assertion
    await expect($('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"]'))
      .toBeDisplayed();
    await expect($('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]'))
      .toHaveText("Naruto\nOnePiece\nAOT");
    await driver.back();

    const note = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]').getText();

    // click on the note
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]').click();

    // click on more icon
    await $('~More').click();

    // click on Delete item
    await $('//*[@text="Delete"]').click();

    // accept alert
    await driver.acceptAlert();

    // click on nav icon
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]').click();

    // click on trash can item
    await $('//*[@text="Trash Can"]').click();

    // assertions
    const trashCanItem = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]'); 

    await expect(trashCanItem).toHaveText(note);
  });
});
