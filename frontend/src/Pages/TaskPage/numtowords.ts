var ones: Array<string> = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
var tens: Array<string> = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
var teens: Array<string> = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const convert_millions = (n: number): string => {
  if (n >= 1000000)
    return (
      convert_millions(Math.floor(n / 1000000)) +
      " million " +
      convert_thousands(n % 1000000)
    );
  else return convert_thousands(n);
};
const convert_thousands = (n: number): string => {
  if (n >= 1000)
    return (
      convert_hundreds(Math.floor(n / 1000)) +
      " thousand " +
      convert_hundreds(n % 1000)
    );
  else return convert_hundreds(n);
};
const convert_hundreds = (n: number): string =>
  n > 99
    ? ones[Math.floor(n / 100)] + " hundred " + convert_tens(n % 100)
    : convert_tens(n);

function convert_tens(n: number): string {
  if (n < 10) return ones[n];
  else if (n >= 10 && n < 20) return teens[n - 10];
  else return tens[Math.floor(n / 10)] + " " + ones[n % 10];
}

const convert = (n: number): string => (n === 0 ? "zero" : convert_millions(n));

// function main() {
//   var cases = [
//     0, 1, 2, 7, 10, 11, 12, 13, 15, 19, 20, 21, 25, 29, 30, 35, 50, 55, 69, 70,
//     99, 100, 101, 119, 510, 900, 1000, 5001, 5019, 5555, 10000, 11000, 100000,
//     199001, 1000000, 1111111, 190000009,
//   ];
//   for (var i = 0; i < cases.length; i++) {
//     console.log(cases[i] + ": " + convert(cases[i]));
//   }
// }

// main();

export default convert;
