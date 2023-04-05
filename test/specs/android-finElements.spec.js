describe('Android ELements Tests', () => {
  it('Find element by accessibility id', async () => {
    // Find element by accessibility id
    const appOption = await $('~App');
    // Click on the element
    await appOption.click();
    // Assertion
    const actionBar = await $('~Action Bar');
    await expect(actionBar).toBeExisting();
  });
  
  it('Find element by class Name', async () => {
    const className = await $('android.widget.TextView');

    console.log(className);

    await expect(className).toHaveText("API Demos")
  });

  it('Find elements by Xpath', async () => {
    // xpath - (//tagname[@attribute=value])
    await $('//android.widget.TextView[@content-desc="Alert Dialogs"]').click();

    // find by resourceId
    await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]').click();

    // find by text
    await $('//android.widget.TextView[@text="Command two"]').click();

    // find by class - assertion
    const textAssertion = await $('//android.widget.TextView');
    await expect(textAssertion).toHaveText("You selected: 1 , Command two");
  });


  it('Find multiple elements', async () => {
    const expectedList = [
      'API Demos', "Access'ibility",
      'Accessibility', 'Animation',
      'App', 'Content',
      'Graphics', 'Media',
      'NFC', 'OS',
      'Preference', 'Text',
      'Views'
    ]
    const actualList = []

    // find multiple elements
    const textList = await $$('android.widget.TextView');

    // loop through them
    for (const element of textList) {
      actualList.push(await element.getText());
    }

    // assert the list
    await expect(actualList).toEqual(expectedList);
  });

  it.only('Find elements by UIAutomator', async () => {
    // find by text contains
    await $('android=new UiSelector().textContains("Animation")').click();
  });

  it('Working with text field', async () => {
    // access the auto complete screen
    await $('~Views').click();
    await $('//*[@text="Auto Complete"]').click();
    await $('//*[@content-desc="1. Screen Top"]').click();

    // enter the country name
    const textField = await $('//*[@resource-id="io.appium.android.apis:id/edit"]');
    await textField.addValue('Canada');

    // verify the country name
    await expect(textField).toHaveText('Canada');
  });

});