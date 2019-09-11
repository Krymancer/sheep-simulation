# Sheep Simulation

After see this [video](https://www.youtube.com/watch?v=r_It_X7v-1E) i make a attempt to reproduce some environment.

A choose a simple one, we have a fild fill with grass, place some sheeps, them eat, reproduce and mutate.

This can be improved in many ways, but the idea is to keep it simple as a basis and inspiration for future projects.

## Behaviour

- Sheeps moves randomly.
- Sheeps have energy, them spend energy to do actions, like move arround and reproduce
- If a sheep reaches 0 of energy, it dies.
- Sheeps can use a large ammout of energy to reproduce and make a new sheep.
- Every time a new sheep is created, has a small chance of mutation (for now the only change is this color).

- Once a block of grass has eated, turns into a dirt block and after some ammout of time, grass grow again. (to prevent a geometric progression of population)