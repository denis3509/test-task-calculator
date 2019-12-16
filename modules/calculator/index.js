const validatorRegExp = new RegExp(/(:?[^\^+\-*\/0-9\.]|[+\-*\/^\.]{2,}|^[+\-]|[+\-]$)/);
const powRegExp = new RegExp(/\d+(\.\d+)?(\^\d+(\.\d+)?)+/g);
const addendumRegExp = new RegExp(/[^\-\+]+/g);
const multDivRegExp = new RegExp(/[\*\/]\d+(\.\d+)?/g);
const plusMinusRegExp = new RegExp(/[\+\-]\d+(\.\d+)?/g);

const validate = (expression) => {
  if (typeof expression !== "string") return false;
  return !validatorRegExp.test(expression)
};

const powReplacer = (powString => {
    const numbers = powString.split('^');
    numbers.reverse();
    let result = numbers.reduce((accumulator, currentValue, index) => {
      if (!index) return currentValue;
      return Math.pow(currentValue, accumulator)
    });
    if (result===Infinity) throw new Error('Infinity Error');
    return result;
  }
);

const addendumReplacer = (addendumString) => {
  addendumString = addendumString.replace(powRegExp, powReplacer);

  let addendum = +addendumString.match(/\d+(\.\d+)?/)[0];
  const multDiv = addendumString.match(multDivRegExp);
  multDiv && multDiv.forEach(numStr => {
    if (numStr[0] === '*') {
      let num = +numStr.slice(1);
      addendum = addendum * num;
    } else {
      let num = +numStr.slice(1);
      addendum = addendum / num;
    }
  });
  if (addendum===Infinity) throw new Error('Infinity error');
  return addendum;
};
const calc = (expression) => {
  if (expression === '') return 0;

  if (!validate(expression)) throw new Error('invalidate string or type');

  expression = expression.replace(addendumRegExp, addendumReplacer);
  let sum = +expression.match(/\d+(\.\d+)?/)[0];

  const plusMinus = expression.match(plusMinusRegExp);
  plusMinus && plusMinus.forEach(numStr => {
    if (numStr[0] === '+') {
      let num = +numStr.slice(1);
      sum = sum + num;
    } else {
      let num = +numStr.slice(1);
      sum = sum - num;
    }
  });

  if (sum === Infinity) throw new Error('infinity Error');
  return sum;
};


module.exports = {
  calc,
};
