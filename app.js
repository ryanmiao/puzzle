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
</head> \
<body> \
  <div id="title"> \
    <h2>Sliding Puzzle</h2> \
  </div> \
  <div id="slider"> \
    <form> \
      <label>Easy</label> \
      <input type="range" id="scale" value="4" min="3" max="5" step="1"> \
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
