# Abercrombie Skill Assessment-exercise-2

***

## Description

The assessment is a simple keyboard-accessible task tracker app that keeps you up-to-date with the to-do list.
***

## Setup 

1. Install git, node and npm on your computer and verify its installation by running the following commands in command line 

### `git --version`
### `node -v`
### `npm -v`

<br />

2. Clone this repository

### `git clone https://github.com/shahvaishali/AbercrombieSkillAssessment-exercise-2.git`

<br />

3. Double-click on `index.html` in your project directory to run the project


To use Sass, 

    a. In your project directory, install all the necessary node modules

        npm install

    b. In you project directory, you can run 

        npm run css-builder
        
        It will launch sass and generate new style.css with every changes saved in style.sass

***

## Exercise 2: Task Tracker Enhancement
[Task Tracker](./exercise-2/index.html)

The above link is to a simple task-tracker app. The JS has many errors and inefficiencies that need to be fixed. There is also additional functionality that has to be added.  This is an open-ended assessment meant to measure your skill in key areas like javascript, CSS, HTML, and accessibility.

Solve the problems presented in whatever way you deem most appropriate and in keeping with today's standards, with the following caveats/limitations:

    * Vanilla JS only, no jQuery or frameworks. This test is to see if you understand javascript, so no shortcuts.
    * Do not use any JS plugins. Same reason as above.
    * Use Sass for any styles.

#### Fixes
1. Break the contents of the HTML file into pieces that follow a logical separation of concerns for the browser.
2. Fix any invalid HTML
3. Fix any JS errors / inefficiencies.
5. Utilize closures to prevent pollution of the global object with app code

#### Features
1. Make the form keyboard-accessible
2. Add support for localStorage such that refreshing the page does not reset your task list
3. Add form validation such that an empty task cannot be submitted.
4. Convert float-based layouts to flexbox-based layouts. The visuals should not change, just the CSS that handles the layout.
5. Make the design responsive, such that -
    * The form fills 100% width of the screen up until 375px wide
    * The form becomes centered in the page after 375px
    * There should be no horizontal scroll bars present at any width

***
