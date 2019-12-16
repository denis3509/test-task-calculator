const validatorRegExp = new RegExp(/(:?[^\^+\-*\/0-9]|(?<![*\/\^])([+\-*\/^.]{2,})|^[\-]|[+\-]$)/);
const powRegExp = new RegExp(/-?\d+(\.\d+)?(\^-?\d+(\.\d+)?)+/g);
//const addendumRegExp = new RegExp(/[^\-\+]+/g);
const multDivRegExp = new RegExp(/[\*\/]-?\d+(\.\d+)?/g);
//const plusMinusRegExp = new RegExp(/[\+\-]\d+(\.\d+)?/g);

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
  let addendum = +addendumString.match(/-?\d+(\.\d+)?/)[0];
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
  if (expression[0]==='-') expression = '0'+expression;
 // if (!validate(expression)) throw new Error('invalidate string or type'); //валидация не работает
  const addendums = expression.split(/(?<![*\/\^])[\+\-]/);
  const signs = expression.match(/(?<![*\/\^])[\+\-]/g);
  const addendumsNumbers= addendums.map((addendum,index)=>{
    if (index>0 && index<addendums.length) {
      if (signs[index-1]==='+') {
        return addendumReplacer(addendum);
      } else {
        return (-1)*addendumReplacer(addendum);
      }
    }
    return addendumReplacer(addendum);
  });
  let sum = addendumsNumbers.reduce((accumulator,currentValue)=>accumulator+currentValue);
  if (sum === Infinity) throw new Error('infinity Error');
  return sum;
};

console.log(calc('-5+4^2-8+5*-3+3^-2^2'));

module.exports = {
  calc,
};
