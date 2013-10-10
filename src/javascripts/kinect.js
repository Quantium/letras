/* KINECTJS */
var stage = new Kinetic.Stage({
  container: 'game',
  width: 578,
  height: 200
});

var layer = new Kinetic.Layer();
var rectX = stage.getWidth() / 2 - 50;
var rectY = stage.getHeight() / 2 - 25;

var simpleText = new Kinetic.Text({
  name: 'A',
  x: 0,
  y: 0,
  text: '',
  fontSize: 12,
  fontFamily: 'Calibri',
  fill: 'black'
});

var l_A = new Kinetic.Text({
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
  draggable: true/*,
  dragBoundFunc: function(pos) {
    return {
      x: pos.x,
      y: this.getAbsolutePosition().y
    };
  }*/
});

var l_B = new Kinetic.Text({
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
  draggable: true/*,
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
  layer.draw();
});
socket.on('dragend', function (data) {
  writeMessage("Hay que APARECER " + data.letter + " en (" + data.x + "," + data.y + ")");
  var l = getLetter(data.letter);

  var anim = new Kinetic.Animation(function(frame) {
    l.setX(data.x);
    l.setY(data.y);
  }, layer);

  anim.start();

  l.show();
  layer.draw();
});

function getLetter($id){
  for(i = 0; i < letters.length; i++){
    if(letters[i]._id == $id){
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
  var l = e.targetNode;
  console.log(l._id);
  socket.emit('dragstart',{letter:l._id,user:username});
}
function letterDragEnd(e) {
  writeMessage('dragend');
  var l = e.targetNode;
  console.log(l.attrs.x);
  socket.emit('dragend',{letter:l._id,user:username,x:l.attrs.x,y:l.attrs.y});
  //console.log(stage.toJSON());
}