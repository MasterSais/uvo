export const rightEmails = [
  'mkyong@yahoo.com', 'mkyong-100@yahoo.com', 'mkyong.100@yahoo.com', 'mkyong111@mkyong.com', 'mkyong-100@mkyong.net', 'mkyong.100@mkyong.com.au', 'mkyong@1.com', 'mkyong@gmail.com.com', 'mkyong+100@gmail.com', 'mkyong-100@yahoo-test.com'
];

export const wrongEmails = [
  'mkyong', 'mkyong@.com.my', 'mkyong123@gmail.a', 'mkyong123@.com', 'mkyong123@.com.com', '.mkyong@mkyong.com', 'mkyong()*@gmail.com', 'mkyong@%*.com', 'mkyong..2002@gmail.com', 'mkyong.@gmail.com', 'mkyong@mkyong@gmail.com', 'mkyong@gmail.com.1a'
];

export const rightUrls = [
  'http://foo.com/blah_blah', 'http://foo.com/blah_blah_(wikipedia)_(again)', 'http://www.example.com/wpstyle/?p=364', 'https://www.example.com/foo/?bar=baz&inga=42&quux', 'http://userid@example.com:8080/', 'http://userid:password@example.com', 'http://142.42.1.1:8080/', 'http://223.255.255.254', 'http://foo.bar/?q=Test%20URL-encoded%20stuff'
];

export const wrongUrls = [
  'http://', 'http://??/', 'http:// shouldfail.com'
];

export const clampCases: Array<any> = [
  [[0, 5], 2, 2],
  [[0, 5], 0, 0],
  [[0, 5], 5, 5],
  [[0, 5], -1, 0],
  [[0, 5], 6, 5],
  [[0, 5], '2', '2'],
  [[0, 5], '-1', 0],
  [[0, 5], '6', 5],
  [[0, 5], -Infinity, 0],
  [[0, 5], Infinity, 5],
  [['b', 'e'], 'c', 'c'],
  [['b', 'e'], 'b', 'b'],
  [['b', 'e'], 'e', 'e'],
  [['b', 'e'], 'a', 'b'],
  [['b', 'e'], 'f', 'e'],
  [[false, true], false, false],
  [[false, true], true, true],
  [[false, true], -1, false],
  [[false, true], 2, true]
];

export const eraseCases: Array<any> = [
  [[], 'Abc', null],
  [[], 12, null],
  [[], false, null]
];

export const toLowercaseCases: Array<any> = [
  [[], 'Abc', 'abc'],
  [[], 'ABC', 'abc'],
  [[], 'abc', 'abc']
];

export const lowercaseCases: Array<any> = [
  [[], 'Abc', null],
  [[], 'ABC', null],
  [[], 'abc', 'abc']
];

export const trimCases: Array<any> = [
  [[], ' abc ', 'abc'],
  [['left'], ' abc ', 'abc '],
  [['right'], ' abc ', ' abc']
];

export const toUppercaseCases: Array<any> = [
  [[], 'Abc', 'ABC'],
  [[], 'ABC', 'ABC'],
  [[], 'abc', 'ABC']
];

export const uppercaseCases: Array<any> = [
  [[], 'Abc', null],
  [[], 'ABC', 'ABC'],
  [[], 'abc', null]
];

export const roundCases: Array<any> = [
  [[], 10, 10],
  [[], 10.2, 10],
  [[], 10.5, 11],
  [[], 10.7, 11],
  [['floor'], 10, 10],
  [['floor'], 10.2, 10],
  [['floor'], 10.5, 10],
  [['floor'], 10.7, 10],
  [['ceil'], 10, 10],
  [['ceil'], 10.2, 11],
  [['ceil'], 10.5, 11],
  [['ceil'], 10.7, 11]
];