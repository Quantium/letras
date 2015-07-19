/* KINECTJS */
var stage = new Konva.Stage({
  container: 'game',
  width: 578,
  height: 200
});

var layer = new Konva.Layer();
var rectX = stage.getWidth() / 2 - 50;
var rectY = stage.getHeight() / 2 - 25;

var simpleText = new Konva.Text({
  name: 'A',
  x: 0,
  y: 0,
  text: '',
  fontSize: 12,
  fontFamily: 'Calibri',
  fill: 'black'
});

var l_A = new Konva.Text({
  x: stage.getWidth() / 2,
  y: 15,
  text: 'A',
  fontSize: 30,
  fontFamily: 'Calibri',
  fill: 'green',
  shadowColor: 'black',
  shadowBlur: 2,
  shadowOffset: 10,
  shadowOpacity: 0,
  draggable: true,
  id: "A"/*,
  dragBoundFunc: function(pos) {
    return {
      x: pos.x,
      y: this.getAbsolutePosition().y
    };
  }*/
});

var l_B = new Konva.Text({
  x: stage.getWidth() / 2,
  y: 25,
  text: 'B',
  fontSize: 30,
  fontFamily: 'Calibri',
  fill: 'green',
  shadowColor: 'black',
  shadowBlur: 2,
  shadowOffset: 10,
  shadowOpacity: 0,
  draggable: true,
  id: "B"/*,
  dragBoundFunc: function(pos) {
    return {
      x: pos.x,
      y: this.getAbsolutePosition().y
    };
  }*/
});

var letters = [l_A,l_B];

l_A.on('dragstart', letterDragStart);
l_B.on('dragstart', letterDragStart);
l_A.on('dragend', letterDragEnd);
l_B.on('dragend', letterDragEnd);
layer.add(l_A);
layer.add(l_B);
layer.add(simpleText);

stage.add(layer);


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
