describe('Add Notes', () => { 
  it('skip tutorial', async () => {
    await driver.pause(3000);
    await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]').click();

    await expect($('//*[@text="Add note"]')).toBeDisplayed();
  });

  it('Add note', async () => {
    await $('//*[@text="Add note"]').click();
    await $('//*[@text="Text"]').click();

    await expect($('//*[@text="Editing"]')).toBeDisplayed();
  });

});
