import { createAnimation } from 'lib';

const svg: SVGSVGElement = document.querySelector('svg')!;

svg.style.width = '2500px';
svg.style.height = '500px';

const player = createAnimation(svg, [
  (b) => {
    b.select(1).circle((c) => c.centerX(100).centerY(100));
    b.select(1).circle((c) => c.radius(50));

    b.select(2).circle((c) => c.centerX(300).centerY(100).radius(50));

    b.select(1, 2)
      .fill('red')
      .opacity(0.3)
      .stroke('blue')
      .strokeWidth(10)
      .strokeOpacity(0.5);

    b.select(3)
      .fill('transparent')
      .strokeWidth(5)
      .cubicBezier((l) =>
        l
          .startX(100)
          .startY(100)
          .control1X(200)
          .control1Y(200)
          .control2X(250)
          .control2Y(200)
          .endX(300)
          .endY(100),
      )
      .stroke('purple')
      .zIndex(-1);

    b.select(4)
      .fill('orange')
      .circle((r) => r.radius(10));
  },
  (b) => {
    b.duration(0.8);
    b.select(1).fill('purple');
  },
]);

player.play();
