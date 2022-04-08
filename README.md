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
- ❌ "how to play" button that show/hide the game rules
- ✅ shameless link to my Github profile
- ✅ draw a board in the center of the page
- - ✅ the tiles must be generated with `JS`
- - ✅ every tile in the board must have an unique ID
- ✅ add initial style with `CSS`
- - ❌ add animations for on/off state
- ✅ The next buttons must be present:
- - ✅ new game
- - ✅ restart game
- - ✅ level select
- - ✅ random level
- - ❌ ask for confirmation before reseting the game
- ❌ player score
- - ❌ must update once a tile is clicked
- - ❌ lower score (less moves) is better
- ❌ which level is being played
- ❌ board size must always be 1:1

**Game logic:**
- ✅ make the tiles clickable
- - ✅ clicked tile must change ~~boolean~~ state
- - ✅ the adjacent tiles must change state too
- ❌ if all lights are off, player wins
- - ❌ a message will show announcing it
- - ❌ next level must be loaded or new random level will be generated

**Game modes:**
- ❌ random level
- - ❌ random tiles will be toggled _X_ number of times
- - ❌ adjacent tiles will change state too, to not soft lock the game
- ❌ premade levels
- - ❌ ~50 levels will be playable as a challenge
- - ❌ once a level is won, the next will be playable

**Other ideas, not promised:**
- ❌ draw rooms behind the tiles
- - ❌ randomize the walls and furniture
- ❌ different grid sizes
- ❌ undo button

## update 1
The page has been made as placeholder, but now I can start adding some `JS` code. Still no design in mind, starting without a drawn design was a mistake.

## update 2
Now the tiles are generated, the grid size may be customized. The tiles now change state to "turn on/off the light". The next step is to make the adjacent tiles toggle state.

## update 3
Now the adjacent tiles will turn on/off the lights. There's some code repetition, will fix later creating a function. Right now the game can be playable, but won't announce when you win and you must toggle some lights manually before starting.