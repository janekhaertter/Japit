Japit
-----

<p align="center">
  <img src="assets/japit.gif" alt="Animated Japit Logo">
</p>

Japit is a library for animating SVGs. It makes it easy to express dependencies between different elements.

> [!CAUTION]
> Japit is still in early development. There are going to be breaking changes!

# Getting Started
Right now the easiest way to get started is by cloning the repository and making changes to `src/main.ts`.

```console
$ git clone https://github.com/janekhaertter/Japit # Clone the project
$ cd Japit
$ npm install # Install dependencies
$ npm run dev # Start the development server that previews the code in `src/main.ts`
$ $EDITOR src/main.ts # Edit `src/main.ts` with your favourite editor
```

# Examples

## Basic Usage
Create a red circle that changes its color to blue.

```TypeScript
const svg: SVGSVGElement = document.querySelector('svg')!; // Get SVG DOM element

// Set dimensions of SVG
svg.style.width = '500px';
svg.style.height = '500px';

// create a new animation with two steps
const player = createAnimation(svg, [
  // step 1:
  (b) => {
    b.select(0) // create an element with id 0
      .circle((c) => c.centerX(100).centerY(100).radius(50)) // give it the shape circle and specify its position and radius
      .fill('red'); // color it red
  },
  // step 2:
  (b) => {
    b.duration(1); // the transition from red to blue should take 1 second
    b.select(0).fill('blue'); // change color of element with id 0 to blue
  },
]);

player.play(); // start playing the animation

```

## Expressing Dependencies
We bind the start- and endpoint of a line to the centers of two circles. By moving the first circle around, we thus also move the startpoint of the line. Similarly, we bind the color of the second circle to the color of the first circle.

```TypeScript
const svg: SVGSVGElement = document.querySelector('svg')!;

svg.style.width = '500px';
svg.style.height = '500px';

const player = createAnimation(svg, [
  (b) => {
    // create the left black circle
    b.select(0)
      .fill('black')
      .circle((c) => c.centerX(100).centerY(100).radius(50));

    // create the right black circle
    b.select(1)
      .fill($fill(0)) // it has the same fill as the left circle
      .circle((c) => c.centerX(300).centerY(100).radius(50));

    // create the line between the two circles
    b.select('0-1')
      .zIndex(-10) // ensures that the line is behind the circles
      .stroke('black')
      .strokeWidth(20)
      .line(
        (l) =>
          l
            .start($center(0)) // the starting point of the line is the center of the left circle
            .end($center(1)), // the ending point of the line is the center of the right circle
      );
  },
  (b) => {
    b.duration(1);

    b.select(0)
      .fill('blue') // this also affects the color of circle 1 as its fill is equal to the fill of circle 0
      .circle((c) => c.radius(50).centerX(100).centerY(300)); // the line '0-1' follows the center of the circle
  },
]);

player.play();
```

## Parallel Animations
Create two animations in parallel. The first shifts circle `0` down; the second waits for two seconds, and then moves circle `1` to circle `0`.

```TypeScript
const svg: SVGSVGElement = document.querySelector('svg')!;

svg.style.width = '500px';
svg.style.height = '500px';

const player = createAnimation(svg, [
  (b) => {
    // create two circles next to each other
    b.select(0)
      .fill('black')
      .circle((c) => c.centerX(100).centerY(100).radius(50));

    b.select(1)
      .fill($fill(0)) // it has the same fill as the left circle
      .circle((c) => c.centerX(300).centerY(100).radius(50));
  },
  // the array of animations will be played in parallel
  [
    (b) => {
      // shift circle '0' down
      b.duration(5);
      b.select(0).circle((c) => c.radius(50).centerX(100).centerY(300));
    },

    // the array of animations will be played in sequence
    [
      (b) => b.duration(2), // wait for 2 seconds
      (b) => {
        // move circle '1' to circle '0'
        b.duration(1);
        b.select(1).circle((c) => c.radius(50).center($center(0)));
      },
    ],
  ],
]);

player.play();
```
