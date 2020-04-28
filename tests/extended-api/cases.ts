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