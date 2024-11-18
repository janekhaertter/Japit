import { $center, $fill } from '../../../dist';

const setup = (b) => {
  b.select(1)
    .fill('green')
    .circle((c) => c.radius(100).centerX(300).centerY(150));

  b.select(2)
    .fill('purple')
    .rectangle((r) => r.topLeftX(700).topLeftY(50).width(100).height(200));

  b.select('1-2')
    .stroke($fill(1))
    .strokeWidth(5)
    .zIndex(-1)
    .line((l) => l.start($center(1)).end($center(2)));
};

const moveRectangle = (b) => {
  b.duration(1);
  b.select(2).circle((c) => c.centerY(375));
};

const changeColors = (b) => {
  b.duration(0.5);
  b.select(1).fill($fill(2));
};

export default [setup, moveRectangle, changeColors];
