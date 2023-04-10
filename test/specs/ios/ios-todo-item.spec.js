import listScreen from "../../screenObjects/ios/list.screen";
import itemScreen from "../../screenObjects/ios/item.screen";

describe('Todo Item', () => {
  before(async () => {
    // Create TODO List
    await listScreen.createListBtn.click();
    await listScreen.listNameInput.addValue("Things to do today");
    await listScreen.createBtn.click();
    await expect(await listScreen.listNameField("Things to do today")).toBeExisting();
    await listScreen.listNameField("Things to do today").click();
  });

  it('Create a Todo Item', async () => {
    // Create Todo Item
    await itemScreen.createItem.click();
    await itemScreen.title.addValue("Buy groceries");
    await itemScreen.dueDate.click();
    await itemScreen.datePicker.click();
    await itemScreen.getByAccessibility("Tuesday, November 30").click();
    await itemScreen.secondWindow.click();
    await itemScreen.createBtn.click();

    // assertion
    await expect(await itemScreen.getByAccessibility("Buy groceries")).toBeExisting();
    await expect(await itemScreen.getByAccessibility("Due November 30, 2021")).toBeExisting();
  });
});
