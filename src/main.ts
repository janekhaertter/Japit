import {
  $center,
  $centerX,
  $centerY,
  $fill,
  $stroke,
  $strokeWidth,
  AnimationBuilder,
  createAnimation,
  easeInCubic,
  easeInOutCubic,
  easeLinear,
  easeOutBounce,
  easeOutCubic,
} from 'lib';

import { $radius } from 'lib/request-functions/radius';

const svg: SVGSVGElement = document.querySelector('svg')!;

svg.style.width = '1700px';
svg.style.height = '500px';

const black = '#000000';
const purple = '#8a2be2';
const orange = '#ffa500';
const green = '#008000';
const red = '#ff0000';

//  9
//    OXXXXXX
//    X      X
// 11 O      X
//    X      X
//    XXXXXXX
//    X
//    X
//    O
//   10
const pAnimation: ((b: AnimationBuilder) => void)[] = [
  (b) => {
    b.select(9)
      .fill($fill(4))
      .circle((c) => c.radius($radius(4)).center($center(4)));
    b.select(10)
      .fill($fill(6))
      .circle((c) => c.radius($radius(6)).center($center(6)));
    b.select(11)
      .fill($fill(8))
      .circle((c) => c.radius($radius(8)).center($center(8)));
  },
  (b) => {
    b.duration(0.8);
    createLine(b, 9, 10);
    b.select('9 11')
      .fill('transparent')
      .stroke(black)
      .strokeWidth(25)
      .zIndex(-10)
      .cubicBezier((c) =>
        c
          .start($center(9))
          .end($center(11))
          .control1($center(9))
          .control2($center(11)),
      );
    b.select(9).circle((c) =>
      c.radius($radius(4)).centerX(800).centerY($centerY(4)),
    );
    b.select(10).circle((c) =>
      c.radius($radius(6)).centerX(800).centerY($centerY(6)),
    );
    b.select(11).circle((c) =>
      c.radius($radius(8)).centerX(800).centerY($centerY(8)),
    );
  },
  (b) => {
    b.duration(0.8);
    b.select('9 11').cubicBezier((c) =>
      c
        .start($center(9))
        .end($center(11))
        .control1X(1000, { easing: easeOutCubic })
        .control2X(1000, { easing: easeOutCubic })
        .control1Y(50)
        .control2Y($centerY(11)),
    );
  },
];

//        16
// 12 OXXXOXXXO 13
//        X
//        X
//        X
//        X
//        X
// 14 XXXXOXXXX 15
//        17
//
const iAnimation: ((b: AnimationBuilder) => void)[] = [
  (b) => {
    b.select(16, 17)
      .fill($fill(11))
      .circle((c) => c.center($center(11)).radius($radius(11)));
    createLine(b, 16, 17);
  },
  (b) => {
    b.duration(0.8);
    b.select(16, 17).circle((c) =>
      c.centerX(1150).centerY($centerY(11)).radius($radius(11)),
    );
  },
  (b) => {
    b.duration(0.8);
    b.select(16).circle((c) => c.centerX(1150).centerY(50).radius($radius(11)));
    b.select(17).circle((c) =>
      c.centerX(1150).centerY(400).radius($radius(11)),
    );
  },
  (b) => {
    b.select(12, 13)
      .fill($fill(16))
      .circle((c) => c.center($center(16)).radius($radius(16)));
    b.select(14, 15)
      .fill($fill(17))
      .circle((c) => c.center($center(17)).radius($radius(17)));
    createLine(b, 12, 13);
    createLine(b, 14, 15);
  },
  (b) => {
    b.duration(0.8);
    b.select(12).circle((c) =>
      c
        .centerX(1150 - 80)
        .centerY($centerY(16))
        .radius(20),
    );
    b.select(13).circle((c) =>
      c
        .centerX(1150 + 80)
        .centerY($centerY(16))
        .radius(20),
    );
    b.select(14).circle((c) =>
      c
        .centerX(1150 - 100)
        .centerY(400)
        .radius(20),
    );
    b.select(15).circle((c) =>
      c
        .centerX(1150 + 100)
        .centerY(400)
        .radius(20),
    );
  },
  (b) => {
    b.duration(0.8);
    b.select('16 17').line((l) =>
      l.start($center(16)).endX($centerX(16)).endY($centerY(17)),
    );
    b.select(16).circle((c) => c.radius(0).centerX(1150).centerY(50));
  },
];

//      21
// 18 OXXOXXO 19
//       X
//       X
//       X
//       X
//       O
//      20
//
const tAnimation: ((b: AnimationBuilder) => void)[] = [
  (b) => {
    b.select(18, 19, 21).fill($fill(17));
    b.select(18).circle((c) => c.center($center(14)).radius($radius(14)));
    b.select(19).circle((c) => c.center($center(15)).radius($radius(15)));
    b.select(21).circle((c) => c.center($center(17)).radius($radius(17)));
    createLine(b, 18, 19);
    createLine(b, 17, 21);
  },
  (b) => {
    b.duration(0.8);
    b.select(17).circle((c) => c.radius(20).centerX(1450).centerY(400));
    b.select(18).circle((c) =>
      c
        .radius(20)
        .centerX(1450 - 130)
        .centerY(50),
    );
    b.select(19).circle((c) =>
      c
        .radius(20)
        .centerX(1450 + 130)
        .centerY(50),
    );
    b.select(21).circle((c) =>
      c.radius($radius(17)).centerX($centerX(17)).centerY(50),
    );
  },
];

const createLine = (b: AnimationBuilder, i: number, j: number) => {
  b.select(`${i} ${j}`)
    .zIndex(-10)
    .stroke(black)
    .strokeWidth(25)
    .line((l) => l.start($center(i)).end($center(j)));
};

const player = createAnimation(svg, [
  (b) => {
    b.select(0)
      .fill(orange)
      .circle((c) => c.radius(0).centerX(50).centerY(50));
  },
  (b) => {
    b.duration(0.8);
    b.select(0, 2)
      .fill(orange)
      .circle((c) => c.radius(20).centerX(50).centerY(50));
  },
  (b) => {
    b.select(1)
      .fill($fill(0))
      .circle((c) => c.radius($radius(0)).center($center(0)));
    createLine(b, 0, 1);
  },
  (b) => {
    b.duration(0.8);
    b.select(1)
      .fill(orange)
      .circle((c) =>
        c.radius(20).centerX(300, { easing: easeInCubic }).centerY(50),
      );
  },
  (b) => {
    b.select(4)
      .fill($fill(1))
      .circle((c) => c.center($center(1)).radius($radius(1)));
  },
  [
    [
      (b) => {
        b.duration(0.8);
        b.select(2).circle((c) =>
          c
            .radius(20)
            .centerX(300, { easing: easeOutBounce })
            .centerY(300, { easing: easeOutBounce }),
        );
        createLine(b, 1, 2);
      },
      (b) => {
        b.duration(0.4);
        b.select(2)
          .fill(orange)
          .circle((c) => c.radius(20).centerX(300).centerY(400));
      },
      (b) => {
        b.select(3)
          .fill(orange)
          .circle((c) => c.radius(20).center($center(2)));
        b.select('23')
          .zIndex(-10)
          .stroke(black)
          .strokeWidth(25)
          .fill('transparent')
          .cubicBezier((c) =>
            c
              .start($center(2))
              .end($center(3))
              .control1($center(2))
              .control2($center(3)),
          );
      },
      (b) => {
        b.duration(0.8);
        b.select(3).circle((c) =>
          c
            .radius(20)
            .centerX(50, { easing: easeOutCubic })
            .centerY($centerY(2)),
        );
      },
      (b) => {
        b.duration(0.8);
        b.select('23')
          .stroke(black)
          .cubicBezier((c) =>
            c
              .start($center(2))
              .end($center(3))
              .control1X(250)
              .control1Y(500)
              .control2X(150)
              .control2Y(500),
          );
      },
    ],
    [
      (b) => {
        b.duration(0.8);
        b.select(4).circle((c) =>
          c
            .centerY($centerY(1))
            .centerX(550, { easing: easeOutCubic })
            .radius($radius(1)),
        );
      },
      (b) => {
        b.select(5, 6)
          .fill($fill(4))
          .circle((c) => c.center($center(4)).radius($radius(4)));
        createLine(b, 4, 5);
        createLine(b, 4, 6);
        b.select(7, 8)
          .fill($fill(4))
          .circle((c) =>
            c
              .centerX(550 - 150 / 2)
              .centerY(50 + (400 - 50) / 2)
              .radius(0),
          );
      },
      (b) => {
        b.duration(0.8);
        b.select(5).circle((c) =>
          c.centerX(400).centerY(400).radius($radius(4)),
        );
        b.select(6).circle((c) =>
          c
            .centerX(
              550 +
                Math.sqrt(
                  Math.pow(550 - (550 + 150), 2) + Math.pow(400 - 50, 2),
                ),
              { easing: easeInCubic },
            )
            .centerY($centerY(4))
            .radius($radius(4)),
        );
      },
      (b) => {
        createLine(b, 7, 8);
      },
      (b) => {
        b.duration(0.8);
        b.select(7, 8).circle((c) =>
          c
            .centerX(550 - 150 / 2)
            .centerY(50 + (400 - 50) / 2)
            .radius($radius(4)),
        );
        b.select(6).circle((c) =>
          c
            .centerX(700, { easing: easeOutBounce })
            .centerY(400, { easing: easeOutBounce })
            .radius($radius(4)),
        );
      },
      (b) => {
        b.duration(0.8);
        b.select(8).circle((c) =>
          c
            .centerX(550 + 150 / 2, { easing: easeOutCubic })
            .centerY(50 + (400 - 50) / 2)
            .radius($radius(4)),
        );
      },
    ],
  ],
  ...pAnimation,
  ...iAnimation,
  ...tAnimation,
]);

//player.seek(5.5);
player.play();
