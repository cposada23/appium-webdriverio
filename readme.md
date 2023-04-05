
# APPIUM ( With WebDriverIO )

## What is Appium 
- Open source automation framework for native, hybrid and mobile web apps in Android, iOS and Windows apps
- Wraps the vendor provider framework into a WebDriver api
- iOS: XCUITest
- Android: UIAutomator
- Windows: WinAppDriver

***What is  WebDriverIO***? is a Javascript automation framework, that lets you automate web apps in different browsers and OS. It also supports automation for mobile applications in iOS and Android. Is really easy to get started with it, you just need node js installed and run the following commands:

    npm i -D @wdio/cli
    npx wdio config --yes
    npx wdio run
   
   

## Installing All the things

####  NodeJS:
>recomended using a tool like nvm, if you are using mac follow the steps here: https://github.com/nvm-sh/nvm

> Verify that you have the following in you bash profile or zshrc file. TO know what type of profile you are using, in a terminal run ***echo $0***
> if your terminal echoed zsh the file that you need to look is  **_~/.zshrc_**, if you don't have it, create it and paste what you see down below
> If your terminal is bash then the file you should look is -   **_~/.bash_profile_**

    export NVM_DIR="$HOME/.nvm"
	[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
	[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

> Recommended using the LTS version of node

Useful commands for nvm

    // Install the lts version
    nvm install node
    // List all node version taht you have
    nvm list
    // Use a version of node
    nvm use <node version>

#### Install Java JDK
> You can use this page to download the latests sdks: https://adoptium.net/
> Follow this page for more details on how to setup java in mac: https://mkyong.com/java/how-to-set-java_home-environment-variable-on-mac-os-x/

After you installed the sdk, you need to set the JAVA_HOME variable in your profile ( if mac in your .zshrc or .bash_profile (read nvm installation ) or windows in your env variables )

> On mac to check where is java installed you can run the following command **_ /usr/libexec/java_home _**. You'll need this to set JAVA_HOME variable

Mac users: on your .zshrc file add the following:

    export JAVA_HOME=$(/usr/libexec/java_home)

> Now, check the java installation by running ***java --version*** on your terminal

#### Install Android Studio
> Download it from here: https://developer.android.com/studio

> Setup ANDROID_HOME 

Setting up ANDROID_HOME depend again on the Operating system and type of terminal you are using, On windows take not of the installation path of android studio and set up the environment variables) 
On mac add the following to your terminal profile (.zshrc or .bash_profile )

    export ANDROID_HOME=/Users/$USER/Library/Android/sdk
    export PATH=$ANDROID_HOME/platform-tools:$PATH
    export PATH=$ANDROID_HOME/tools:$PATH
    export PATH=$ANDROID_HOME/tools/bin:$PATH
    export PATH=$ANDROID_HOME/emulator:$PATH
    export ANDROID_SDK=/Users/$USER/Library/Android/sdk
    export ANDROID_SDK_ROOT=/Users/$USER/Library/Android/sdk/
    export PATH=$ANDROID_SDK/emulator:$ANDROID_SDK/tools:$PATH

Then in a terminal ( make sure you source the file ***source ~/.zshrc*** ) run the following command to test that everything got installed correctly: ***adb devices*** - should return list of devices attached

#### Setup android emulator
- Open android studio and open the device manager
- Create new device 
- Select the system image ( This will be the android version )
- Give it a name
- Start the simulator ( with the play like button ) to make sure that everything is set up correctly

#### Appium 

> To install version 2: ***npm i -g appium@next***
> More info here: https://www.npmjs.com/package/appium
> Check the version with: ***appium -v***

Install Appium drivers
> appium driver install xcuitest
> appium driver install uiautomator2

check the drivers installation with ***appium driver list*** 

#### Appium Server
> Install it from here https://github.com/appium/appium-desktop/releases/tag/v1.22.3-4


#### Appium Inspector
The inspector is a tool to get the selector of the elements to be able to interact with them, something similar on using the Chrome or Firefox inspection tool to get the web Elements identifiers
> Download it from here: https://github.com/appium/appium-inspector/releases

>1.  **Remote Port:** Update port to  `4724`  and run Appium on the same port as well by doing  `appium -p 4724`
>2.  **Remote Path:** Set the path to  `/wd/hub/`  instead of  `/`


#### Appium Doctor
>This tool helps us verify if everything is setup correctly, install it by running: ***npm i -g appium-doctor***

Run ***appium-doctor --android*** to check all the installation

#### WebDriverIO setup

Create a new folder for the project and in the root run ***npm init wdio*** 

>use the following configuration when prompted
>
    ? Where should your tests be launched? local - for e2e testing of web and mobile applications
    ? Where is your automation backend located? On my local machine
    ? Which framework do you want to use? Mocha (https://mochajs.org/)
    ? Do you want to use a compiler? No!
    ? Do you want WebdriverIO to autogenerate some test files? No
    ? Which reporter do you want to use? spec
    ? Do you want to add a service to your test setup? appium
    ? Do you want me to run `npm install` Yes
    
All configuration can be found here: ***wdio.conf.js***
> WebDriverIO Config for Android:

> To run the test, you'll need the apk for you app, in this framework we will put the apk in this folder **app/android/ApiDemos-debug.apk**

In the wdio.conf.js do the following 
Add the import for the node module path: 

    const  path = require('path');

Look for the capabilities section and replace it with the following:

    capabilities: [{
	    'appium:platformName':  'Android',
	    'appium:platformVersion':  '12.0', // this is the version that you choose when creating the emulator
	    'appium:deviceName':  'Pixel 4 API 30', // The AVD name that you used when creating the device
	    'appium:automationName':  'UIAutomator2',
	    'appium:app':  path.join(process.cwd(), 'app/android/ApiDemos-debug.apk') // This is the path to the APK File
    }],


# Common Assertions and Actions

## Assertions
> ***Element is displayed:*** `expect($('<element selector'>)).toBeDisplayed();`

> ***Element to have text:*** `expect($('<element selector'>)).toHaveText("<replace expected text>");`

> ***Array to Equal Array:*** `await  expect(actualList).toEqual(expectedList);`

> ***Element to exist:*** `expect($('<element selector'>)).toBeExisting();`


## Actions
> ***Finding an element***:  `$('<replace Element selector>');`

> ***Finding multiple elements***:  `$$('<replace common Elements selector>');`

> ***Click On element***:  `$('<replace Element selector>').click();`

> ***Filling an input***:  `$('<replace Element selector>').setValue('<replace with value>');`

> ***Add Value to a textField***:  `$('<replace Element selector>').addValue('<replace with value>');`

> ***Start activity:*** `await  driver.startActivity(currentPackage,${currentPackage}${currentActivity});`

>***Get Alert text:*** `await  driver.getAlertText() `

>***Accept Alert:*** `await  driver.acceptAlert() `

>***Dismiss Alert:*** `await  driver.dismissAlert() `

>***Go back:*** `await  driver.back() `


# Android

## Running test on Android ( remember to add the capabilities listed in the previous step )


> Things to take in consideration: install appium at project level and the drivers, same commands than in the appium section but this time at project level ( in the root of the famework )

Create a new sample spec to test that everything works correctly: ***test/specs/sample.js***  and paste the following:

    describe('Sample', () => {
	    it('Sample test', async () => {
		    await  driver.pause();
	    });
    });

Run the sample test ( Remember to have the emulator open and running ) ***npx wdio***
>If you get an error similar to this -
`The file is being treated as ES module...`
You can resolve that by making the following changes -
>1.  remove  `"type:module"`  from the package.json file
>2.  change  `export const config`  to  `exports.config`  in wdio.conf.js

> If you get an error like this: 
> Error: "ts-node/esm/transpile-only 'resolve'" did not call the next hook in its chain and did not explicitly signal a short circuit.
> Run this : ***npm i -D typescript ts-node***

> If you get an error like this:
> Unable to find an active device or emulator with OS 12.0
> There is a problem in the capabilities, review them according to what you picked up while creating the emulator

## Using Appium Inspector
1. make sure you have installed Appium Server and Appium Inspector

> Suggestion: Create a new virtual device for manual testing with a different android version than the one that you use in the automation, that's because WebDriverIO looks for the Android version and sometimes it will use this new emulator instead of the other one

2. in the Appium Inspector change the port to a different one from the one you use in the automation, change it to ***4724*** and click start server
3. In the Appium inspector make sure that in the ***Remote Path*** you have ***/wb/hub/*** and in the port the port that you set up in the previous step for the Appium server In my case: ***4724***
4. In the Appium Inspector you need to add the capabilities to connect to the emulator: 

    {
	     "platformName": "Android",
	     "appium:platformVersion": "< Replace with the android version that you chose when creating the emulator >",
	     "appium:deviceName": "< The device name you chose when creating the emulator >",
	     "appium:automationName": "UiAutomator2",
	     "appium:app": "< Replace with the full path to the APK that you are using >"
    }

5. Click Start Session. you should see in the Appium inspector the application that is running in the emulator. There you can inspect the elements to get the proper id to interact with them in the automation.



## Finding Elements and interacting with Elements

You can fin elements by different types of attributes

- Xpath
- Accessibility ID ( This is the preferred option to go with because you can use the same one in both Android and iOS )
- Id
- Resource Id
- index
- Class
- Text


#### Finding and interacting with elements by Accessibility id
To find an element by accessibility id you use the **~** symbol

> Example code: finding an element, then click on it and then assert that an element is visible

    describe('Android ELements Tests', () => {
	    it('Find element by accessibility id', async () => {
		    // Find element by accessibility id
		    const  appOption = await  $('~App');
		    // Click on the element
		    await  appOption.click();
		    // Assertion
		    const  actionBar = await  $('~Action Bar');
		    await  expect(actionBar).toBeExisting();
	    });
    });

#### Finding and interacting with elements by class Name

    it.only('Find element by class Name', async () => {
	    const  className = await  $('android.widget.TextView');
	    console.log(className);
	    await  expect(className).toHaveText("API Demos")
    });

#### Finding and interacting with elements by X-Path

    it('Find elements by Xpath', async () => {
	    // xpath - (//tagname[@attribute=value])
	    await  $('//android.widget.TextView[@content-desc="Alert Dialogs"]').click();
	    // find by resourceId
	    await  $('//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]').click();

	    // find by text
	    await  $('//android.widget.TextView[@text="Command two"]').click();
	    // find by class - assertion
	    const  textAssertion = await  $('//android.widget.TextView');
	    await  expect(textAssertion).toHaveText("You selected: 1 , Command two");
    });

#### Finding Elements with UiAutomator

More info Here:
- https://webdriver.io/docs/selectors/#android-uiautomator
- https://developer.android.com/reference/androidx/test/uiautomator/UiSelector
- https://appium.io/docs/en/writing-running-appium/android/uiautomator-uiselector/


    it('Find elements by UIAutomator', async () => {
        // find by text contains
        await $('android=new UiSelector().textContains("Alert")').click();
    });

#### Finding multiple elements


you use $ to find single element and $$ to find multiple elements

    it('Find multiple elements', async () => {
        const  expectedList = [
		    'API Demos', "Access'ibility",
		    'Accessibility', 'Animation',
		    'App', 'Content',
		    'Graphics', 'Media',
		    'NFC', 'OS',
		    'Preference', 'Text',
		    'Views'
	    ]
	    const  actualList = []
	    // find multiple elements
	    const  textList = await  $$('android.widget.TextView');
	    // loop through them
	    for (const  element  of  textList) {
		    actualList.push(await  element.getText());
	    }
	    // assert the list
	    await  expect(actualList).toEqual(expectedList);
    });

#### Working with text fields

    it.only('Working with text field', async () => {
	    // access the auto complete screen
	    await  $('~Views').click();
	    await  $('//*[@text="Auto Complete"]').click();
	    await  $('//*[@content-desc="1. Screen Top"]').click();
	    // enter the country name
	    const  textField = await  $('//*[@resource-id="io.appium.android.apis:id/edit"]');
	    await  textField.addValue('Canada');
	    // verify the country name
	    await  expect(textField).toHaveText('Canada');
    });

## App Package and app Activity
- appPackage: technical name of the app, provided by the developers (Top level package under which the app code resides) . Ex: 'com.google.android.youtube'
- appActivity: Certain screen or functionality of the application. EX: MainActivity, AlertDialog

***Why take this in consideration ?*** 
1.	 Access a Screen directly
2.	Save time in the automation script by not going through multiple pages, this decrease the change of having flaky tests

#### How to go directly to a particular activity:
1. You have to know the activity name, for this:
	- In the Appium inspector, go to the page that you want ( In the app that we are woking in this repository, lets say we wan to start our test in the App / Alert Dialogs screen )
	- Once you are in the correct page, in Appium inspector in the middle upper section, click commands. Then click where it says "***Select Action Group***" and select ***Device***. In the new select that gets added after you click Device, click it and select ***Android Activity***. Once you clicked it, a popup will appear with the current activity name.... In our case is " ***.app.AlertDialogSamples*** "
	- I need also the package name combined with the activity name to be able to access that screen. To get the package name, close the popup that was opened in the previous step, and click in the button that says ***current package***. In this example the package is: " ***io.appium.android.apis*** " 

Example code:

    it.only('Access an Activity directly', async () => {
	    // access activity
	    await  driver.startActivity("io.appium.android.apis", "io.appium.android.apis.app.AlertDialogSamples");
	    // pause 3s
	    await  driver.pause(3000);
	    // assertion
	    await  expect($('//*[@text="App/Alert Dialogs"]')).toExist();
    });

## Scrolling (Android)

We can make use of `UiAutomator` driver to do this kind of actions
> UiScrollable is a `[UiCollection]` and provides support for searching for items in scrollable layout elements. This class can be used with horizontally or vertically scrollable controls.
> See: https://developer.android.com/reference/androidx/test/uiautomator/UiScrollable

>We need to make sure that the element is scrollable or not, this line takes care of it: `UiScrollable(new UiSelector().scrollable(true))` then we can perform different actions on the scrollable elements like the ones below

#### Scroll to end
Scrolls to the end of a scrollable layout element. The end can be at the bottom-most edge in the case of vertical controls, or the right-most edge for horizontal controls

>  `await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)');`


#### Scroll text in into view
Performs a forward scroll action on the scrollable layout element until the text you provided is visible, or until swipe attempts have been exhausted 
> `await  $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")')`

#### Horizontal Scroll
You use the `.setAsHorizontalList()` method
> Horizontal Scrolling `await  $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');`

### Scrolling Exercise 
With the App from the repo, do the following
- Access the date widget
	- view -> Date Widgets -> Dialog ( You can use the activity name to access to it )
- Get the current date
- Click on "Change the date"
- Scroll Horizontally to the right
- Pick the 10th date from the month
- Click Ok Button 
- Assert the date is updated

Solution:

    it.only('Scrolling in date pickers', async () => {
	    const  currentActivity = '.view.DateWidgets1';
	    const  currentPackage = 'io.appium.android.apis';
	    // Start the activity
	    await  driver.startActivity(currentPackage, `${currentPackage}${currentActivity}`);
	    // Get the current date
	    const  currentDate = await  $('//*[@resource-id="io.appium.android.apis:id/dateDisplay"]').getText();
	    console.log(`Current date: "${currentDate}`);
	    // Click the change the date button using accesibility id
	    const  changeDateButton = await  $('~change the date');
	    await  changeDateButton.click();
	    // Horizontal scrolling
	    await  $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');
	    // Select the 10th day
	    await  $('//*[@text="10"]').click();
	    await  $('//*[@resource-id="android:id/button1"]').click();
	    // Assert
	    const  updatedDate = await  $('//*[@resource-id="io.appium.android.apis:id/dateDisplay"]').getText();
	    console.log(`Updated Date: ${updatedDate}`);
	    await  expect(updatedDate).not.toEqual(currentDate);
    });

## Handle Permissions 

Sometimes the app needs some permissions to access some of the devices functionality, like the camera or access to the gallery... This is one way to handle those.  ( To follow this change the APK to: ` 'appium:app':  path.join(process.cwd(), 'app/android/ColorNote+Notepad.apk') ` in the ***wdio.conf.js*** )

> In the example app for this section, when you first open the app, it will prompt you to allow for access to Photos, media and files on your device.

Add this line in the capabilities to handle the permissions: `'appium:autoGrantPermissions':  true`

## Page Objects
Page object is a design patter that creates an object repository to store all the web elements selectors, this to reduce code duplication and improving the maintainability of the tests.
In this case the page object is a simple class where we save all the elements of a page 

Ex: Edit Note Page 

    class  EditNoteScreen {
	    get  firstNote() {
		    return  $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]');
	    }
	    get  moreIcon() {
		    return  $('~More');
	    }
	    
	    get  deleteIcon() {
		    return  $('//*[@text="Delete"]');
	    }
	    
	    get  navIcon() {
		    return  $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]');
	    }
	    
	    get  trashCanItem() {
		    return  $('//*[@text="Trash Can"]');
	    }
    }
    module.exports = new  EditNoteScreen();


