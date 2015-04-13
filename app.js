var http = require('http');
var content = '\
<!doctype html> \
<html> \
<head> \
  <title>Sliding Puzzle</title> \
  <style> \
  .picture { \
    border: 1px solid black; \
  } \
  </style> \
  <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" /> \
</head> \
<body> \
  <div id="title"> \
    <h2>Sliding Puzzle</h2> \
  </div> \
  <div id="slider"> \
    <form> \
      <label>Easy</label> \
      <input type="radio" checked="checked" name="scale" value="3"> \
      <input type="radio" name="scale" value="4"> \
      <input type="radio" name="scale" value="5"> \
      <label>Hard</label> \
    </form> \
    <br> \
  </div> \
  <div id="main" class="main"> \
    <canvas id="puzzle" width="480px" height="480px"></canvas> \
  </div> \
  <script src="https://rawgit.com/ryanmiao/puzzle/master/sliding.js"></script> \
</body> \
</html> \
'

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.write(content);
  res.end();
}).listen(process.env.VMC_APP_PORT || 1337, null);
