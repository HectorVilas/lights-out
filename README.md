# Lights Out!

## Introduction
Lights Out is a classic, simple game: you have to turn off all the lights in the board, but every time you turn on/off a light, the adjacent lights will turn on/off too! Keep turning on and off those lights until all of them are off and you win.
***
## Play the game:
> # https://hectorvilas.github.io/lights-out/

## Roadmap
Here's all I want to do with this simple project. I'll be adding more once I come with some new ideas.

**Start:**
- ✅ describe the project and write a roadmap
- ✅ "how to play" button that show/hide the game rules
- ✅ shameless link to my Github profile
- ✅ draw a board in the center of the page
- - ✅ the tiles must be generated with `JS`
- - ✅ every tile in the board must have ~~an~~ unique ~~ID~~ attributes
- ✅ add initial style with `CSS`
- - ✅ add animations for on/off state
- ✅ The next buttons must be present:
- - ✅ new game
- - ✅ ~~restart game~~ Sandbox Mode
- - ✅ level select
- - ✅ random level
- - ~~ask for confirmation before reseting the game~~
- ✅ player score
- - ✅ must update once a tile is clicked
- - ~~lower score (less moves) is better~~
- ✅ which level is being played
- ✅ board size must always be 1:1

**Game logic:**
- ✅ make the tiles clickable
- - ✅ clicked tile must change ~~boolean~~ state
- - ✅ the adjacent tiles must change state too
- ✅ if all lights are off, player wins
- - ✅ a message will show announcing it
- - ~~next level must be loaded or new random level will be generated~~
- - ✅ beaten level darkened in the list

**Game modes:**
- ✅ random level
- - ✅ random tiles will be toggled _X_ number of times
- - ✅ adjacent tiles will change state too, to not soft lock the game
- ✅ premade levels
- - ✅ ~50 levels will be playable as a challenge
- - ~~once a level is won, the next will be playable~~

**Other ideas, not promised:**
- ❌ draw rooms behind the tiles
- - ❌ randomize the walls and furniture
- ✅ different grid sizes
- ❌ undo button
- ❌ electrical panel for challenges
- - ❌ the thermomagnetic switch has X amps
- - ❌ every single light on adds to the electric charge
- - ❌ if the max amp is reached, it's game over
- ❌ game mode: match lights on screen instead of turning off everything

## update 1
The page has been made as placeholder, but now I can start adding some `JS` code. Still no design in mind, starting without a drawn design was a mistake.

## update 2
Now the tiles are generated, the grid size may be customized. The tiles now change state to "turn on/off the light". The next step is to make the adjacent tiles toggle state.

## update 3
Now the adjacent tiles will turn on/off the lights. There's some code repetition, will fix later creating a function. Right now the game can be playable, but won't announce when you win and you must toggle some lights manually before starting.

Note: Even though the code works, it breaks if the grid is bigger tan 10. That's because I used a generated ID containing the _X_ and _Y_ coordinates and got those numbers by index. No problem with _x9y5_, `tile.id[1]` and `tile.id[3]` have the numbers I need, but what happens with _x10y5_? Now I get "y" for _Y_ instead of 5. This can be fixed with a little array method magic, but making some custom attributes for _X_ and _Y_ would be better. Time to adapt the code and take on this new challenge.

## update 4
The method to toggle adjacent light has been changed for a better one with custom attributes. Now any grid size will work. The solution was easier than i thought.

The lights now have a little transition when the lights are roggled.

As a little extra, now the "Random level" button randomizes the tiles. To prevent softlock, once it chooses a random tile, it also toggles the adyacent ones.

## update 5
Added a "click" sound. The randomization now have a little delay with deceleration for an animated look. Credits for the sound's author added to the page.

The board now can change size depending on the window size.

## update 6
The page now tries to stay in the visible area, to prevent the need of vertical scrolling. The buttons have been grouped so they can be hidden or shown when necessary (click on _New game_ and then you see the game modes).

Just for the sake of experimenting, I made a super basic function trying to shrink the code. For example:

```javascript
const tiles = document.querySelectorAll(".tile");
```
now is:
```javascript
const tiles = targets(".tile");
```
It made the code more "clean" to the view, but maybe it's unnecesary. If somebody want to understand the code, they first need to find the `targets` function declaration, so it's not very friendly. May restore later.

Note: I just restored it to the original text. I must get used to make my code friendly for other programmers.

## update 7
Every time the player clicks on a tile, the "moves" counter will add 1 to it. If the player starts a new game, it goes back to zero. Buttons without function will have a purple color for now.

A message has been aded to warn the player that, if they start a new game, the current progress will be lost.

Win condition has been added for random game mode. The win message is a temporal prompt.

## update 8
I just added two hidden menu for _How to Play_ and _About_. Those will be shown only when their current buttons are pressed. The screen is a little less cluttered now.

New functions has been added and modified to simplify the way the game modes are changed. The idea from update 6 has been reverted.

The game is playable right now, but only on random mode. The next step would be to create levels, store the design somewhere (on an array, maybe) and let the player go through them one by one, with the objective of turning off all lights first.

## update 9
The bigger the code, the harder to find that little bug that ruins the entire page. Great Scott, I'm glad I learned how to read error messages! After some issues and considering rewriting half the code, I found the problem. The order of the functions being called was pretty bad, but now it draws the board first, and _then_ draws a level.

So yeah, I wrote some code to make levels something possible. Now every level not only have some custom lights on, but also will have their custom board size! This is where the problem started, I didn't planned ahead the new board size, and some things got mixed in the code, but now everything is working just fine and my brain is swimming in dopamine.

The buttons are placeholders for now. Those are going to be generated with `JS` and their actions will be applied at the same time, like I did with the board generator.

Now the next step is to make those buttons clear the board, redraw the board with the new size and draw the level (already done, but have to make it an action for the buttons). I still don't know if I want to hide all the levels except the beaten and next to play, or just let the player choose and know which ones are beaten.

## update 10
After some little changes and some extra code, now the level menu will have a button to select any existing level. If the variable containing the levels only have, let's say, 10 levels, then 10 buttons that load it's respective level will be present. Placeholders has been removed.

The next step would be making custom levels. Maybe I'll play a little with some patterns and make a function to store the active lights, so I can just copy and paste the output for a level.

The page still needs a lot of styling. Except for the board, everything else looks too simple.

## update 11
I just made a helping function for level designs! I just run the function in the navigator console and it will generate a ready-to-copy array with all the active lights.

```javascript
function lightsToArray(){
  let activeLights = [];
  tiles.forEach(t => {
    if(t.classList.contains("active")){
      activeLights.push([parseInt(t.getAttribute("x")),parseInt(t.getAttribute("y"))]);
    };
  });
  console.log("["+activeLights.join("],[")+"]");
};
```

### how it works?
- first, it checks every single tile and store it's coordinates `X` and `Y` as an array inside another array.
- Once it finish checking all the tiles, it shows the array in the console, but converted to an array, adding the square brackets and commas in their respective places.
- now I just copy the console output and paste it inside the variable containing all the levels.

Now I only need to draw something playing normally, try to make some challenging designs and run this function to store the design as a level.

## update 12
I've been using that "tool" I made to turn designs while playing on levels. Now there's 15 playable levels. The more advanced, the bigger the grid.

## update 13

I've been moving divs around to adapt the page to something a little more intuitive and screwed something in the code. Now I know why I need to use proper names for everything. The problem has been fixed, by the way.

Now if a level is beaten, it's button will be darker. You can still replay the beaten level. I don't know anything about cookies and other stuffs to save the progress in the navigator, so if you refresh or close the page, the progress will be lost. Anyways, you don't need to beat the previous level to play the next one.

This project is still fun to develop, but I don't know what to add/adjust next. The levels are a little bland with those random designs, maybe I'll start making some pixel art, but I'm not sure if those will be beatable.

Note: 24 levels with random patterns has been drawn, now I want to make some pixel art, so the next levels will be that. I hope I find something good to make.

I also added a fanfare sound to play with the win message. Credits to the creator in "About".

## update 14
I just added 6 pixel art levels. Pretty iconic characters from Nintendo games drawn with just lights on or off. Now I just need to add... 18 more? Okay, anything for the project!

note: and all the pixel art I wanted is now present. I drawed all of them one pixel at a time with another "dev tool" I made to make the tiles just paint one. I made them looking at some Gameboy and NES sprites, but those have at least 3 different colors, so it was pretty hard to do with just two colors.

I'm not sure if those pixel art levels are beatable, just enjoy them, don't beat yourself if you cant beat them.

***

# final thoughts
This project was a lot of fun, I learned a lot, and if I had to do the same project again, now I know about some things that would do much better, like the arrays storing the levels. A simple 1D array would be enough, but I decided to store the X and Y coordinates of each lit light. This made the variable like 3 or 4 times bigger.

I also learned that I need to name things better, and maybe I need to be more specific with the `querySelector`. Adding more features to a project is fun, but planning those ahead would be much better, another thing to have in mind.

So this is the final version of this project. It's playable right now, has been tested and may come back in the future to make some changes or add new features.

See you in the next project!