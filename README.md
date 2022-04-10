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
- - ✅ every tile in the board must have an unique ID
- ✅ add initial style with `CSS`
- - ✅ add animations for on/off state
- ✅ The next buttons must be present:
- - ✅ new game
- - ✅ ~~restart game~~ Sandbox Mode
- - ✅ level select
- - ✅ random level
- - ✅ ask for confirmation before reseting the game
- ✅ player score
- - ✅ must update once a tile is clicked
- - ❌ lower score (less moves) is better
- ✅ which level is being played
- ❌ board size must always be 1:1

**Game logic:**
- ✅ make the tiles clickable
- - ✅ clicked tile must change ~~boolean~~ state
- - ✅ the adjacent tiles must change state too
- ✅ if all lights are off, player wins
- - ❌ a message will show announcing it
- - ❌ next level must be loaded or new random level will be generated

**Game modes:**
- ✅ random level
- - ✅ random tiles will be toggled _X_ number of times
- - ✅ adjacent tiles will change state too, to not soft lock the game
- ❌ premade levels
- - ❌ ~50 levels will be playable as a challenge
- - ❌ once a level is won, the next will be playable

**Other ideas, not promised:**
- ❌ draw rooms behind the tiles
- - ❌ randomize the walls and furniture
- ❌ different grid sizes
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