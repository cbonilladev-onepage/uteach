
window.brush = null;
var canvas = this.__canvas = new fabric.Canvas('c', {
  preserveObjectStacking: true,
  isDrawingMode: false,
  hoverCursor: "pointer",
  // selection: false 
});
var grid = 30
var id = 1

canvas.setHeight(window.screen.height);
canvas.setWidth(window.screen.width)

window.canvas = canvas;

for (var i = 0; i < (1000 / grid); i++) {
  canvas.add(new fabric.Line([i * grid, 0, i * grid, 1000], { selectable: false }));
  canvas.add(new fabric.Line([0, i * grid, 1000, i * grid], { selectable: false }));
}


canvas.on('object:added', function () {
  if (!isRedoing) {
    h = [];
  }
  isRedoing = false;
});

var isRedoing = false;
var h = [];
function undo() {
  if (canvas._objects.length > 0) {
    h.push(canvas._objects.pop());
    canvas.renderAll();
  }
}
function redo() {

  if (h.length > 0) {
    isRedoing = true;
    canvas.add(h.pop());
  }
}


// canvas.on('mouse:wheel', function(opt) {
//   var delta = opt.e.deltaY;
//   var zoom = canvas.getZoom();
//   zoom *= 0.999 ** delta;
//   if (zoom > 20) zoom = 20;
//   if (zoom < 0.01) zoom = 0.01;
//   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//   opt.e.preventDefault();
//   opt.e.stopPropagation();
// });

var drawing = document.getElementById("drawing")

// $(document).on('click', '.draw', function() {
//   canvas.isDrawingMode = !canvas.isDrawingMode
//   if (canvas.isDrawingMode) {
//     tools.style.display == ""
//     console.log(tools.style.display)
//   } else {
//     tools.style.display = "none"
//   }


// })


// drawing.onclick = function() {
//   canvas.isDrawingMode = !canvas.isDrawingMode;
//   if (canvas.isDrawingMode) {
//     document.getElementById("tools").removeAttribute("class")
//   }
//   else {
//     document.getElementById("tools").className += "tools";
//   }
// };
$("#tools").draggable()
$("#tools").css("position", "absolute")
$('#drawing-line-width').attr("class", "slider is-fullwidth")
function clearCanvas() {
  canvas.clear()
}
function addDraw() {
  canvas.isDrawingMode = !canvas.isDrawingMode;

  if (canvas.isDrawingMode) {
    document.getElementById("tools").removeAttribute("class")
  }
  else {
    document.getElementById("tools").className += "tools";

    // $('#drawing-line-width').attr("class", "slider is-fullwidth")

  }

  var $ = function (id) { return document.getElementById(id) };

  var drawingModeEl = $('drawing-mode'),
    drawingOptionsEl = $('drawing-mode-options'),
    drawingColorEl = $('drawing-color'),
    drawingShadowColorEl = $('drawing-shadow-color'),
    drawingLineWidthEl = $('drawing-line-width'),
    drawingShadowWidth = $('drawing-shadow-width'),
    drawingShadowOffset = $('drawing-shadow-offset'),
    clearEl = $('clear-canvas');

  clearEl.onclick = function () { canvas.clear() };


  if (fabric.PatternBrush) {
    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    vLinePatternBrush.getPatternSrc = function () {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    hLinePatternBrush.getPatternSrc = function () {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 10);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var squarePatternBrush = new fabric.PatternBrush(canvas);
    squarePatternBrush.getPatternSrc = function () {

      var squareWidth = 10, squareDistance = 2;

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
      var ctx = patternCanvas.getContext('2d');

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);

      return patternCanvas;
    };

    var CrayonBrush = new fabric.CrayonBrush(canvas);
    CrayonBrush.getPatternSrc = function () {

      var patternCanvas = fabric.document.createElement('canvas');
      var ctx = patternCanvas.getContext('2d');

      ctx.width = 70;
      ctx.opacity = 0.6;
      ctx.color = "#ff0000"

      return patternCanvas;
    };
    var InkBrush = new fabric.InkBrush(canvas);
    InkBrush.getPatternSrc = function () {

      ctx.width = 70;
      ctx.opacity = 0.6;
      ctx.color = "#ff0000"

      return patternCanvas;
    };
    var MarkerBrush = new fabric.MarkerBrush(canvas);
    MarkerBrush.getPatternSrc = function () {

      ctx.width = 70;
      ctx.opacity = 0.6;
      ctx.color = "#ff0000"

      return patternCanvas;
    };
    var RealSprayBrush = new fabric.RealSprayBrush(canvas);
    RealSprayBrush.getPatternSrc = function () {

      ctx.width = 70;
      ctx.opacity = 0.6;
      ctx.color = "#ff0000"

      return patternCanvas;
    };

    var diamondPatternBrush = new fabric.PatternBrush(canvas);
    diamondPatternBrush.getPatternSrc = function () {

      var squareWidth = 10, squareDistance = 5;
      var patternCanvas = fabric.document.createElement('canvas');
      var rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: this.color
      });

      var canvasWidth = rect.getBoundingRect().width;

      patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
      rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

      var ctx = patternCanvas.getContext('2d');
      rect.render(ctx);

      return patternCanvas;
    };

    var img = new Image();
    img.src = '../assets/honey_im_subtle.png';

    var texturePatternBrush = new fabric.PatternBrush(canvas);
    texturePatternBrush.source = img;
  }

  $('drawing-mode-selector').onchange = function () {

    if (this.value === 'hline') {
      canvas.freeDrawingBrush = vLinePatternBrush;
    }
    else if (this.value === 'vline') {
      canvas.freeDrawingBrush = hLinePatternBrush;
    }
    else if (this.value === 'square') {
      canvas.freeDrawingBrush = squarePatternBrush;
    }
    else if (this.value === 'diamond') {
      canvas.freeDrawingBrush = diamondPatternBrush;
    }
    else if (this.value === 'texture') {
      canvas.freeDrawingBrush = texturePatternBrush;
    }
    else if (this.value === 'CrayonBrush') {
      canvas.freeDrawingBrush = CrayonBrush;
    }
    else if (this.value === 'InkBrush') {
      canvas.freeDrawingBrush = InkBrush;
    }
    else if (this.value === 'MarkerBrush') {
      canvas.freeDrawingBrush = MarkerBrush;
    }
    else if (this.value === 'RealSprayBrush') {
      canvas.freeDrawingBrush = RealSprayBrush;
    }
    else {
      canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
    }

    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = drawingColorEl.value;
      canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: parseInt(drawingShadowWidth.value, 10) || 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: drawingShadowColorEl.value,
      });
    }
  };

  drawingColorEl.onchange = function () {
    canvas.freeDrawingBrush.color = this.value;
  };
  drawingShadowColorEl.onchange = function () {
    canvas.freeDrawingBrush.shadow.color = this.value;
  };
  drawingLineWidthEl.onchange = function () {
    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    this.previousSibling.innerHTML = this.value;
  };
  drawingShadowWidth.onchange = function () {
    canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
    this.previousSibling.innerHTML = this.value;
  };
  drawingShadowOffset.onchange = function () {
    canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
    canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
    this.previousSibling.innerHTML = this.value;
  };

  if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      blur: parseInt(drawingShadowWidth.value, 10) || 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      color: drawingShadowColorEl.value,
    });
  }
}

function addPaper() {
  var rect = new fabric.Rect({
    left: 50,
    top: 50,
    fill: 'white',
    width: 50,
    height: 65,
    centeredTotation: true
  });

  rect.setShadow("5px 5px 15px rgb(200,200,200)");

  canvas.add(rect);
}

function heightAdjust() {
  var height = document.getElementById("height")
  if (height.value !== "") {
    canvas.setHeight(height.value)
    height.value = ""
    // console.log("Oh, hello Laverne.")
  } else {
    // console.log("Hello Laverne.")
    canvas.setHeight(height.placeholder)
  }
}

function addBackground() {
  var rect = new fabric.Rect({
    left: 150,
    top: 50,
    fill: 'white',
    width: 100,
    height: 65,
    centeredTotation: true
  });

  rect.setShadow("5px 5px 15px rgb(200,200,200)");

  canvas.add(rect);
}

function toFront() {
  var obj = canvas.getActiveObject();
  canvas.bringToFront(obj)
}

function toBack() {
  var obj = canvas.getActiveObject();
  canvas.sendToBack(obj)
}

function addText() {
  var text = new fabric.IText("Edit Here", {
    left: 300,
    top: 50,
    fontSize: 60,
    editable: true,
    fontFamily: 'Roboto',
    fontWeight: 900,
    fill: 'white',
    centeredTotation: true
  });

  text.setShadow("5px 5px 15px rgb(200,200,200)");

  canvas.add(text);
}

function addImg(e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;
    fabric.Image.fromURL(data, function (img) {
      var oImg = img.set({ left: 50, top: 100, angle: 00 }).scale(0.2);
      canvas.add(oImg).renderAll();
      canvas.setActiveObject(oImg);
    });
  };
  reader.readAsDataURL(file);
}

function addVid() {
  function div() {
    var capture = document.getElementById("capture")

    var divide = document.createElement("div")
    var del = document.createElement("a")
    var input = document.createElement("input")
    var video = document.createElement("video")


    capture.appendChild(divide)
    divide.appendChild(del)
    divide.appendChild(input)
    divide.appendChild(video)


    del.className += "delete is-small"
    divide.className += id
    video.className += "hide"

    divide.setAttribute("id", `resizable${id}`)
    input.setAttribute('type', "file")
    input.setAttribute('accept', "video/*")
    input.setAttribute('id', `vidinput${id}`)
    video.setAttribute('id', `vid${id}`)

    video.controls = true;
    video.autoplay = true;

    // vidsrc = document.getElementById("vidinput").value
    // console.log(video)
    // source.src = "video.mp4";


  }

  div()
}



$(document).on("click", '.delete', function (event) {
  var x = $(event.target.parentNode)
  x.remove()
})
$(document).on("change", function (event) {
  var URL = window.URL || window.webkitURL
  var vidsrcslim = document.getElementById(`vidinput${id - 1}`);
  var vidsrc = document.getElementById(`vidinput${id - 1}`).files[0];

  var videoNode = document.getElementById(`vid${id - 1}`)
  var fileURL = URL.createObjectURL(vidsrc)
  videoNode.src = fileURL

  vidsrcslim.className = "hide"
  document.getElementById(`vid${id - 1}`).classList.remove("hide")
})

function stackUp() {
  var obj = canvas.getActiveObject();
  canvas.bringForward(obj);
}

function stackDown() {
  var obj = canvas.getActiveObject();
  canvas.sendBackwards(obj);
}

function deleteObj() {
  var obj = canvas.getActiveObjects();
  canvas.discardActiveObject();
  canvas.remove(obj);
  canvas.remove(...obj);
}

function copyObj() {
  canvas.getActiveObject().clone(function (cloned) {
    _clipboard = cloned;
  });
}

function pasteObj() {
  _clipboard.clone(function (clonedObj) {
    canvas.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true,
    });
    if (clonedObj.type === 'activeSelection') {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject(function (obj) {
        canvas.add(obj);
      });
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }
    _clipboard.top += 10;
    _clipboard.left += 10;
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
  });
}

canvas.on('object:moving', function (options) {
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});
addPaper();
addBackground();
addText();

function downloadCanvas() {
  html2canvas(document.querySelector('#capture'), { backgroundColor: "white" }).then(function (canvas) {
    saveAs(canvas.toDataURL(), 'canvas.png');
  });
}

function saveAs(uri, filename) {
  var link = document.createElement('a');

  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

$(document).on("click", '#b', function () {
  $("#resizable" + id).resizable();
  $("#resizable" + id).draggable();
  id += 1
})

src = document.getElementById("video1")


function youtubeurl(url) {

  //   function div () {
  //     var capture = document.getElementById("capture")
  //     var divide = document.createElement("div")
  //     divide.setAttribute("id", "resizable")
  //     capture.appendChild(divide)
  // }

  // div()

  var div = document.getElementById("resizable" + (id - 1))
  // console.log(div.childNodes)
  div.removeChild(div.childNodes[1])
  div.removeChild(div.childNodes[1])


  // console.log(div.childNodes)
  function video() {


    var pre = document.createElement("pre")
    pre.setAttribute("id", `myCode${id}`)
    pre.className += id
    div.appendChild(pre)
  }

  video()


  function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return 'error';
    }
  }
  var url = document.getElementById("url").value
  var myId = getId(url)

  $(`#myCode${id}`).html('<iframe width="560" height="315" src="//www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen id="video1"></iframe>');
}
function clicker() {

  var emojis = document.querySelector(".emoji-wysiwyg-editor").childNodes.length
  var emojicon = document.getElementById("emojicon")
  // console.log(emojicon)
  // emojicon.onclick = function () { console.log("Hello.") };
  if (emojis > 0) {
    var clicked = document.querySelector(".emoji-items").getElementsByTagName("a")
    // console.log(clicked)

    var emojiimg = document.querySelector(".emoji-wysiwyg-editor").innerText

    var text = new fabric.IText(emojiimg, {
      left: 300,
      top: 50,
      fontSize: 60,
      editable: true,
      fontFamily: 'Roboto',
      fontWeight: 900,
      fill: 'white',
      centeredTotation: true
    });

    // text.setShadow("5px 5px 15px rgb(200,200,200)");

    canvas.add(text);
  }
  document.querySelector(".emoji-wysiwyg-editor").innerText = ""


}



// var menu = document.querySelector(".emoji-menu").style.zIndex

$(window).on("load", function () {
  var emojiPicker = document.querySelector(".emoji-picker-icon")
  // $('.emoji-picker-icon').click(function(event) {
  //   event.preventDefault();
  // })
  emojiPicker.setAttribute("onclick", "clicker()")

})

function addMoji() {
  var panel = $(".emoji-picker-container").css("display")
  if (panel == "none") {
    $(".emoji-picker-container").show()
  } else {
    $(".emoji-picker-container").hide()
  }

  $('.emoji-picker-container').draggable({
    cancel: '.emoji-menu'
  })



}

document.onkeydown = function (e) {
  switch (e.which) {
    case 8: // left
      deleteObj();
      break;

    case 67: // up
      copyObj();
      break;

    case 86: // right
      pasteObj();
      break;

    case 38: // down
      stackUp()
      break;

    case 40: // down
      stackDown()
      break;

    case 90: // down
      if (canvas.isDrawingMode == true) {
        undo()
      }
      break;

    case 89: // down
      if (canvas.isDrawingMode == true) {
        redo()
      }
      break;
      
    case 70: // down
      console.log("hello")
      toFront()
      break;

    case 66: // down
      toBack()
      break;

    default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
};
function downloadSVGCanvas() {
  // console.log("hello")
  // alert(canvas.toSVG());

  var svgData = canvas.toSVG()

  var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  var svgUrl = URL.createObjectURL(svgBlob);
  var downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = "svgcanvas.svg";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}







$(document).on("click", '#light', function (event) {
  function light() {
    var canvasw = (canvas.width)
    var canvash = (canvas.height ) 
    console.log(canvash, canvasw)
    var rect = new fabric.Rect({
      left: -1,
      top: -2,
      fill: 'white',
      width: canvasw,
      height: canvash
    });
    canvas.add(rect);
    console.log(rect)
    $("#light").hide()
    $("#dark").show()
  }
  light()
})
$(document).on("click", '#dark', function (event) {
  function dark() {
    var canvasw = (canvas.width )
    var canvash = (canvas.height ) 
    console.log(canvash, canvasw)
    var rect = new fabric.Rect({
      left: -1,
      top: -2,
      fill: 'black',
      width: canvasw,
      height: canvash
    });
    console.log(rect)
    canvas.add(rect);
    $("#dark").hide()
    $("#light").show()
  }
  dark()
})



// $("#light").onclick = function () { light() };
// $("#dark").onclick = function () { dark(), console.log("hello") };

function instructions() {
  fabric.Image.fromURL('instructions.jpg', function(oImg) {
    canvas.add(oImg.scale(0.5));
  });

}

function slideitWidth() {
  var x = document.getElementById("drawing-line-width").value;
  document.getElementById("info1").innerHTML = x;
}

function slideitSWidth() {
  var y = document.getElementById("drawing-shadow-width").value;
  document.getElementById("info2").innerHTML = y;
}

function slideitSOffset() {
  var z = document.getElementById("drawing-shadow-offset").value;
  document.getElementById("info3").innerHTML = z;
}

function addWebcam() {


  'use strict';

  var video = document.getElementById(`vid${id - 1}`)
  console.log(video)
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
  var hide = $(".hide")
  hide.removeClass("hide")
}