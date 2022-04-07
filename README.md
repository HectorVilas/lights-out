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
- ❌ shameless link to my Github profile
- ❌ draw a board in the center of the page
- - ❌ the blocks must be generated with `JS`
- - ❌ every block in the board must have an unique ID
- ❌ add style with `CSS`
- - ❌ add animations for on/off state
- ❌ The next buttons must be present:
- - ❌ new game
- - ❌ restart game
- - ❌ level select
- - ❌ random level
- ❌ player score
- ❌ which level is being played

**Game logic:**
- ❌ make the blocks clickable
- - ❌ clicked block must change boolean state
- - ❌ the adjacent blocks must change state too
- ❌ if all lights are off, player wins
- - ❌ a message will show announcing it
- - ❌ next level must be loaded or new random level will be generated

**Game modes:**
- ❌ random level
- - ❌ random blocks will be toggled _X_ number of times
- - ❌ adjacent blocks will change state too, to not soft lock the game
- ❌ premade levels
- - ❌ ~50 levels will be playable as a challenge
- - ❌ once a level is won, the next will be playable

**Other ideas:**
- ❌ draw rooms behind the blocks
- - ❌ randomize the walls and furniture
- ❌ different grid sizes