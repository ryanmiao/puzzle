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
      main { \
        float: none; \
      } \
      body { \
        background-color: hsl(0,0%,20%); \
      } \
      div { \
        float: none; \
      } \
      label { \
        width: 72px; \
        height: 72px; \
      } \
      input { \
        -webkit-appearance: none; \
        display: block; \
        float: left; \
        width: 72px; \
        height: 72px; \
        border-radius: 36px; \
        cursor: pointer; \
        box-shadow: hsla(0,0%,100%,.15) 0 1px 1px, inset hsla(0,0%,0%,.5) 0 0 0 1px; \
        background-color: hsla(0,0%,0%,.2); \
        background-image: -webkit-radial-gradient( hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70% ); \
        background-repeat: no-repeat; \
        -webkit-transition: background-position .15s cubic-bezier(.8, 0, 1, 1), -webkit-transform .25s cubic-bezier(.8, 0, 1, 1); \
      } \
      input:checked { \
        -webkit-transition: background-position .2s .15s cubic-bezier(0, 0, .2, 1), -webkit-transform .25s cubic-bezier(0, 0, .2, 1); \
      } \
      input:active { \
        -webkit-transform: scale(1.5); \
        -webkit-transition: -webkit-transform .1s cubic-bezier(0, 0, .2, 1); \
      } \
      input, input:active { \
        background-position: 72px 0px; \
      } \
      input:checked { \
        background-position: 0 0; \
      } \
      input:checked ~ input, input:checked ~ input:active { \
        background-position: -72px 0px; \
      } \
</style> \
</head> \
<body> \
  <div id="main" class="main"> \
    <canvas id="puzzle" width="1000px" height="1000px"></canvas> \
    <br> \
  </div> \
  <div id="slider"> \
    <form> \
      <input type="radio" checked="checked" name="scale" size="30" value="3"> \
      <input type="radio" name="scale" size="30" value="4"> \
      <input type="radio" name="scale" size="30" value="5"> \
      <label id="gamemode" style="font-size:64px;color:#08bdff">请选择游戏难度</label> \
    </form> \
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
