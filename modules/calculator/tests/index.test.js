const {calc} = require('../index');
//const invalidate =  'invalidate string or type' ;
test('1+4-5^2 = -20 ', () => {
  expect(calc('1+4-5^2')).toBe(-20);
});
test('1+4-5^2*4+3.5^2 = -82.75 ', () => {
  expect(calc('1+4-5^2*4+3.5^2')).toBeCloseTo(-82.75);
});
test('empty string = 0', () => {
  expect(calc('')).toBe(0);
});

// test('1+4-5^2*4+3.5^^2 throws error because of ^^', () => {
//   expect(calc('1+4-5^2*4+3.5^^2')).toThrow(Error);
// });
// test('1+4-5^2**4+3.5^2 throws error because of **', () => {
//   expect(calc('1+4-5^2**4+3.5^2')).toThrow(invalidate);
// });
// test('1+4-5^2*4+3.5^*2 throws error because of ^*', () => {
//   expect(calc('1+4-5^2*4+3.5^*2')).toThrow('invalidate string or type');
// });
// test('1+4-5^2*4+3.5^ 2 throws error because of space', () => {
//   expect(calc('1+4-5^2*4+3.5^ 2')).toThrow('invalidate string or type');
// });
// test('1+4-5^2*4+3.5^ 2 throws error because of space', () => {
//   expect(()=>{throw new Error()}).toThrow();
// });
