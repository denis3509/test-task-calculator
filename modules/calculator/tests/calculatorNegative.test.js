const {calc} = require('../calculatorNegative');
const invalidate =  'invalidate string or type' ;
test('1+4-5^2 = -20 ', () => {
  expect(calc('1+4-5^2')).toBe(-20);
});
test('1+4-5^2*-4+3.5^2 = -82.75 ', () => {
  expect(calc('1+4-5^2*-4+3.5^2')).toBeCloseTo(117.25);
});
test('empty string = 0', () => {
  expect(calc('')).toBe(0);
});
