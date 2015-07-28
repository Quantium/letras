/* KINECTJS */
var stage = new Konva.Stage({
  container: 'game',
  width: 578,
  height: 600
});

var layer = new Konva.Layer();
var rectX = stage.getWidth() / 2 - 50;
var rectY = stage.getHeight() / 2 - 25;
var letters;

var simpleText = new Konva.Text({
  name: 'A',
  x: 0,
  y: 0,
  text: '',
  fontSize: 12,
  fontFamily: 'Calibri',
  fill: 'black'
});

layer.add(simpleText);

stage.add(layer);

var sources = {
      A: 'assets/letters/A.png',
      B: 'assets/letters/B.png',
      C: 'assets/letters/C.png',
      D: 'assets/letters/D.png',
      E: 'assets/letters/E.png',
      F: 'assets/letters/F.png',
      G: 'assets/letters/G.png',
      H: 'assets/letters/H.png',
      I: 'assets/letters/I.png',
      J: 'assets/letters/J.png',
      K: 'assets/letters/K.png',
      L: 'assets/letters/L.png',
      M: 'assets/letters/M.png',
      N: 'assets/letters/N.png',
      O: 'assets/letters/O.png',
      P: 'assets/letters/P.png',
      Q: 'assets/letters/Q.png',
      R: 'assets/letters/R.png',
      S: 'assets/letters/S.png',
      T: 'assets/letters/T.png',
      U: 'assets/letters/U.png',
      V: 'assets/letters/V.png',
      W: 'assets/letters/W.png',
      X: 'assets/letters/X.png',
      Y: 'assets/letters/Y.png',
      Z: 'assets/letters/Z.png'
    };

loadImages(sources,buildStage);

socket.on('dragstart', function (data) {
  writeMessage("Hay que DESAPARECER " + data.letter);
  var l = getLetter(data.letter);
  l.hide();
  //l.off('dragstart');
  //l.off('dragend');

  layer.draw();
});
socket.on('dragend', function (data) {
  writeMessage("Hay que APARECER " + data.letter + " en (" + data.x + "," + data.y + ")");
  var l = getLetter(data.letter);
  l.x(data.x);
  l.y(data.y);

  l.show();
  //l.on('dragstart', letterDragStart);
  //l.on('dragend', letterDragEnd);
  layer.draw();
});

function loadImages(sources, callback) {
    console.log('loadedImages');
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for(var sr in sources) {
        numImages++;
    }
    var onLoadImage = function onLoad() {
        if(++loadedImages >= numImages) {
            callback(images);
        }
    };
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = onLoadImage;
        images[src].src = sources[src];
    }
}

function buildStage(images) {
    console.log("buildStage");

    letters = [];
    var count = 0;
    for(var key in images){
        var letter = new Konva.Image({
            image: images[key],
            x: count,
            y: count,
            draggable: true,
            id: key
        });
        letter.cache();
        letter.drawHitFromCache();
        letter.on('dragstart', letterDragStart);
        letter.on('dragend', letterDragEnd);
        layer.add(letter);
        letters.push(letter);
        count += 10;
    }
    stage.add(layer);
}

function getLetter($id){
  for(i = 0; i < letters.length; i++){
    if(letters[i].id() == $id){
      return letters[i];
    }
  }
}


function writeMessage(message) {
  simpleText.setText(message);
  layer.draw();
}
function letterDragStart(e) {
  writeMessage('dragstart');
  var l = e.target;
  console.log("lDS :: ",l.id());
  socket.emit('dragstart',{letter:l.id()});
}
function letterDragEnd(e) {
  writeMessage('dragend');
  var l = e.target;
  //console.log(l.attrs.x);
  socket.emit('dragend',{letter:l.id(),x:l.x(),y:l.y()});
  //console.log(stage.toJSON());
}
