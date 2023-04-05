describe('Android Native Feature Tests', () => {
  it('Access an Activity directly', async () => {
    // access activity
    await driver.startActivity("io.appium.android.apis", "io.appium.android.apis.app.AlertDialogSamples");

    // pause 3s
    await driver.pause(3000);

    // assertion
    await expect($('//*[@text="App/Alert Dialogs"]')).toExist();
  });

  it('Working with Dialog Boxes', async () => {
    // access activity
    await driver.startActivity("io.appium.android.apis", "io.appium.android.apis.app.AlertDialogSamples");

    // click on first dialog
    await $('//*[@resource-id="io.appium.android.apis:id/two_buttons"]')
      .click();

    // accept Alert
    // await driver.acceptAlert();

    // dismiss Alert
    // await driver.dismissAlert();

    // get alert text
    console.log('ALERT TEXT -->', await driver.getAlertText());

    // click on the OK button
    await $('//*[@resource-id="android:id/button1"]').click();

    // assertion - alert box is no longer visible
    await expect($('//*[@resource-id="android:id/alertTitle"]')).not.toExist();
  });

  it('Vertical scrolling', async () => {
    await $('~App').click();
    await $('~Activity').click();

    // scroll to the end (not stable if element gets moved)
    // await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)');

    // scrollTextIntoView - more stable
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")').click();

    // await $('~Secure Surfaces').click();

    // assertion 
    await expect($('~Secure Dialog')).toExist();
  });

  it("Horizontal Scrolling", async () => {
    await driver.startActivity(
      "io.appium.android.apis",
      "io.appium.android.apis.view.Gallery1"
    );

    // Horizontal scrolling
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()');

    await driver.pause(3000);
  });

//   ### Scrolling Exercise 
// With the App from the repo, do the following
// - Access the date widget
// 	- view -> Date Widgets -> Dialog ( You can use the activity name to access to it )
// - Get the current date
// - Click on "Change the date"
// - Scroll Horizontally to the right
// - Pick the 10th date from the month
// - Click Ok Button 
// - Assert the date is updated

  it.only('Scrolling in date pickers', async () => {
    const currentActivity = '.view.DateWidgets1';
    const currentPackage = 'io.appium.android.apis';

    // Start the activity
    await driver.startActivity(currentPackage, `${currentPackage}${currentActivity}`);

    // Get the current date
    const currentDate = await $('//*[@resource-id="io.appium.android.apis:id/dateDisplay"]').getText();
    console.log(`Current date: "${currentDate}`);
    // Click the change the date button using accesibility id
    const changeDateButton = await $('~change the date');
    await changeDateButton.click();
    // Horizontal scrolling
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');

    await $('//*[@text="10"]').click();
    await $('//*[@resource-id="android:id/button1"]').click();

    const updatedDate = await $('//*[@resource-id="io.appium.android.apis:id/dateDisplay"]').getText();
    console.log(`Updated Date: ${updatedDate}`);
    await expect(updatedDate).not.toEqual(currentDate);


  });

  it('Working with a date picker', async () => {
    // access the date picker
    await driver.startActivity(
      "io.appium.android.apis",
      "io.appium.android.apis.view.DateWidgets1"
    )

    // get current date
    const date = await $('//*[@resource-id="io.appium.android.apis:id/dateDisplay"]');
    const currentDate = await date.getText();

    // click on change the date button
    await $('~change the date').click();

    // scroll right to the next month
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');

    // select the 10th date
    await $('//*[@text="10"]').click();

    // click on ok button
    await $('//*[@resource-id="android:id/button1"]').click();

    // verify the updated date
    await expect(await date.getText()).not.toEqual(currentDate);
  });

});
