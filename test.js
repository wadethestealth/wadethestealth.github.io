var url = 'https://api.github.com';
var response;
var request = new XMLHttpRequest();
request.open('GET', url);
request.onload = function() {
  response = request.response;
  console.log(response);
};
