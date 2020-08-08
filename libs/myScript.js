
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

$("#draw-toggle").on("click", function () {
  if ($("#drawing-mode-options").is(":hidden") == false) {
    $("#box").show();
  } else {
    $("#box").hide();
  }
})

$("#drawing-color").on('change', function () {
  var newColor = $("#drawing-color").val();
  $("#box").css("background-color", newColor)
})

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
$("#draw-toggle").on("click", function () {
  $(this).toggleClass("toggle")

})
$("#emoji-toggle").on("click", function () {
  $(this).toggleClass("toggle2")
})

var shapeColor = "rgba(0,0,0,1)"
var addShadow = ""
function addPaper() {
  var rect = new fabric.Rect({
    left: 50,
    top: 50,
    fill: shapeColor,
    width: 50,
    height: 65,
    centeredTotation: true
  });

  rect.setShadow(addShadow);

  canvas.add(rect);
}
function addCircle() {
  var circle = new fabric.Circle({
    radius: 50,
    fill: shapeColor,
    left: 50,
    top: 50
  });

  circle.setShadow(addShadow);

  canvas.add(circle);

}
function addSquare() {
  var sqr = new fabric.Rect({
    left: 50,
    top: 50,
    fill: shapeColor,
    width: 100,
    height: 50,
    centeredTotation: true
  });

  sqr.setShadow(addShadow);

  canvas.add(sqr);
}
function addTriangle() {
  var tri = new fabric.Triangle({
    left: 50,
    top: 50,
    fill: shapeColor,
    width: 75,
    height: 75,
    centeredTotation: true
  });

  tri.setShadow(addShadow);

  canvas.add(tri);
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
    fill: shapeColor,
    width: 100,
    height: 65,
    centeredTotation: true
  });

  rect.setShadow(addShadow);

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
    fill: shapeColor,
    centeredTotation: true
  });

  text.setShadow(addShadow);

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

    text.setShadow(addShadow);

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
      if ($(".emoji-menu").is(":hidden") == true) {
        deleteObj();
        break;
      } else {
        break;
      }

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
      // if (canvas.isDrawingMode == true) {
      undo()
      // }
      break;

    case 89: // down
      // if (canvas.isDrawingMode == true) {
      redo()
      // }
      break;

    case 70: // down
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





var rect = new fabric.Rect();
$(document).on("click", '#light', function (event) {
  function light() {
    // $("#c").css("background-color", "white")
    // var rect = new fabric.Rect();
    rect.set({ width: canvas.width * 1.5, height: canvas.height * 1.5, fill: 'white', stroke: null, left: -2, top: -2, active: true, selectable: false, evented: false });
    canvas.setActiveObject(rect);
    canvas.add(rect);
    // canvas.sendToBack(rect)
    // canvas.bringForward(rect)
    $("#light").hide()
    $("#dark").show()
  }
  light()
})
$(document).on("click", '#dark', function (event) {
  function dark() {
    // $("#c").css("background-color", "black")
    var rect = new fabric.Rect();
    rect.set({ width: canvas.width * 1.5, height: canvas.height * 1.5, fill: 'black', stroke: null, left: -2, top: -2, active: true, selectable: false, evented: false });
    canvas.setActiveObject(rect);
    canvas.add(rect);
    // canvas.sendToBack(rect)
    // canvas.bringForward(rect)
    $("#dark").hide()
    $("#light").show()
  }
  dark()
})


// $("#light").onclick = function () { light() };
// $("#dark").onclick = function () { dark(), console.log("hello") };

function instructions() {
  fabric.Image.fromURL('instructions.jpg', function (oImg) {
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

// document.onreadystatechange = function() { 
//   if (document.readyState !== "complete") { 
//       document.querySelector("body").style.visibility = "hidden"; 
//       document.querySelector("#loader").style.visibility = "visible"; 
//   } else { 
//       document.querySelector("#loader").style.display = "none"; 
//       document.querySelector("body").style.visibility = "visible"; 
//   } 
// }; 


const pickr = Pickr.create({
  el: '.color-picker',
  theme: 'monolith', // or 'monolith', or 'nano'
  default: '#000000',
  swatches: [
    'rgba(244, 67, 54, 1)',
    'rgba(233, 30, 99, 0.95)',
    'rgba(156, 39, 176, 0.9)',
    'rgba(103, 58, 183, 0.85)',
    'rgba(63, 81, 181, 0.8)',
    'rgba(33, 150, 243, 0.75)',
    'rgba(3, 169, 244, 0.7)',
    'rgba(0, 188, 212, 0.7)',
    'rgba(0, 150, 136, 0.75)',
    'rgba(76, 175, 80, 0.8)',
    'rgba(139, 195, 74, 0.85)',
    'rgba(205, 220, 57, 0.9)',
    'rgba(255, 235, 59, 0.95)',
    'rgba(255, 193, 7, 1)'
  ],

  components: {

    // Main components
    preview: true,
    opacity: true,
    hue: true,

    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      cmyk: true,
      input: true,
      clear: true,
      save: true
    }
  }
});

$(".pcr-save").on("click", function () {
  var pickrColor1 = pickr.getColor().toRGBA()[0]
  var pickrColor2 = pickr.getColor().toRGBA()[1]
  var pickrColor3 = pickr.getColor().toRGBA()[2]
  var pickrColor4 = pickr.getColor().toRGBA()[3]
  shapeColor = `rgba(${pickrColor1}, ${pickrColor2}, ${pickrColor3}, ${pickrColor4})`

})

$("#shadowon").on("click", function () {
  $("#shadowoff").show();
  $("#shadowon").hide();
  addShadow = ""
})
$("#shadowoff").on("click", function () {
  $("#shadowoff").hide();
  $("#shadowon").show();
  addShadow = "5px 5px 15px rgba(0,0,0,0.5)"



})

// $(window).load(function () {
//   $('#loading').hide();
// });

// $("#record").on("click", function () {

//   if ($("#record").hasClass("recording") == false) {
//     $("#record").addClass("recording")
//     $("#controls").css("border-bottom", "red solid 1px")
//     const { createFFmpeg } = FFmpeg;
//     const ffmpeg = createFFmpeg({
//       log: true
//     });

//     const transcode = async (webcamData) => {
//       const name = 'record.webm';
//       await ffmpeg.load();
//       await ffmpeg.write(name, webcamData);
//       await ffmpeg.transcode(name, 'output.mp4');
//       const data = ffmpeg.read('output.mp4');

//       const video = document.getElementById('output-video');
//       video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
//       dl.href = video.src;
//       dl.innerHTML = "download mp4"
//     }

//     fn().then(async ({ url, blob }) => {
//       transcode(new Uint8Array(await (blob).arrayBuffer()));
//     })

//     function fn() {
//       var recordedChunks = [];

//       var time = 0;
//       var canvas = document.getElementById("c");

//       return new Promise(function (res, rej) {
//         var stream = canvas.captureStream(60);

//         mediaRecorder = new MediaRecorder(stream, {
//           mimeType: "video/webm; codecs=vp9"
//         });

//         mediaRecorder.start(time);

//         mediaRecorder.ondataavailable = function (e) {
//           recordedChunks.push(event.data);
//           // for demo, removed stop() call to capture more than one frame
//         }

//         mediaRecorder.onstop = function (event) {
//           var blob = new Blob(recordedChunks, {
//             "type": "video/webm"
//           });
//           var url = URL.createObjectURL(blob);
//           res({ url, blob }); // resolve both blob and url in an object

//           myVideo.src = url;
//           // removed data url conversion for brevity
//         }

//         // for demo, draw random lines and then stop recording
//         var i = 0,
//           tid = setInterval(() => {
//             if (i++ > 20) { // draw 20 lines
//               clearInterval(tid);
//               mediaRecorder.stop();
//             }
//             let canvas = document.querySelector("canvas");
//             let cx = canvas.getContext("2d");
//             cx.beginPath();
//             cx.strokeStyle = 'green';
//             cx.moveTo(Math.random() * 100, Math.random() * 100);
//             cx.lineTo(Math.random() * 100, Math.random() * 100);
//             cx.stroke();
//           }, 200)

//       });
//     }

//   } else {
//     $("#record").removeClass("recording")
//     $("#controls").css("border-bottom", "black solid 1px")   
//     var canvas = document.getElementById("c");

//     var stream = canvas.captureStream(60);
//     mediaRecorder = new MediaRecorder(stream, {
//       mimeType: "video/webm; codecs=vp9"
//     });
//     mediaRecorder.stop();
//     $("#dl").click()
//   }
// })
// $("#dl").change(function () {
//   var videoLink = document.getElementById("dl")
//   if (videoLink.href == /(blob:)\w+/) {
//     function downloadVideo() {
//       var recording = document.querySelector("#dl")
//       recording.click()
//     }
//     downloadVideo();
//   }
// })


function downloadVideo() {
  var recording = document.querySelector("#dl")
  recording.click()
}





var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type == "attributes") {
      downloadVideo()
    }
  });
});

var element = document.querySelector('#dl');

observer.observe(element, {
  attributes: true //configure it to listen to attribute changes
});

const recordButton = document.querySelector("#record")
recordButton.addEventListener('click', () => {
  function startRecording() {
    id += 1
    const { createFFmpeg } = FFmpeg;
    const ffmpeg = createFFmpeg({
      log: true
    });

    const transcode = async (webcamData) => {
      const name = `record${id}.webm`;
      await ffmpeg.load();
      await ffmpeg.write(name, webcamData);
      await ffmpeg.transcode(name, `output${id}.mp4`);
      const data = ffmpeg.read(`output${id}.mp4`);

      const video = document.getElementById('output-video');
      video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
      dl.href = video.src;
    }

    fn().then(async ({ url, blob }) => {
      transcode(new Uint8Array(await (blob).arrayBuffer()));
    })

    function fn() {
      var recordedChunks = [];

      var time = 0;
      var canvas = document.getElementById("c");

      return new Promise(function (res, rej) {
        var stream = canvas.captureStream(60);

        mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm; codecs=vp9"
        });

        mediaRecorder.start(time);

        mediaRecorder.ondataavailable = function (e) {
          recordedChunks.push(event.data);
          // for demo, removed stop() call to capture more than one frame
        }

        mediaRecorder.onstop = function (event) {
          var blob = new Blob(recordedChunks, {
            "type": "video/webm"
          });
          var url = URL.createObjectURL(blob);
          res({ url, blob }); // resolve both blob and url in an object

          myVideo.src = url;
          // removed data url conversion for brevity
        }

        // for demo, draw random lines and then stop recording
        var i = 0,
          tid = setInterval(() => {
            if ($("#record").hasClass("recording") == false) {
              clearInterval(tid);
              mediaRecorder.stop();
            }
            i++
            console.log(i)
          }, 1000)

      });
    }
  }

  if ($("#record").hasClass("recording") == false) {

    $("#record").addClass("recording")
    $("#controls").css("border-bottom", "red solid 1px")
    startRecording()

  } else {
    function stopIt() {
      $("#record").removeClass("recording")
      $("#controls").css("border-bottom", "black solid 1px")

    }
    stopIt();
  }
})

// $("#record").on("click", function () {
//   function startRecording() {
//     const { createFFmpeg } = FFmpeg;
//     const ffmpeg = createFFmpeg({
//       log: true
//     });

//     const transcode = async (webcamData) => {
//       const name = 'record.webm';
//       await ffmpeg.load();
//       await ffmpeg.write(name, webcamData);
//       await ffmpeg.transcode(name, 'output.mp4');
//       const data = ffmpeg.read('output.mp4');

//       const video = document.getElementById('output-video');
//       video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
//       dl.href = video.src;
//       dl.innerHTML = "download mp4"
//     }

//     fn().then(async ({ url, blob }) => {
//       transcode(new Uint8Array(await (blob).arrayBuffer()));
//     })

//     function fn() {
//       var recordedChunks = [];

//       var time = 0;
//       var canvas = document.getElementById("c");

//       return new Promise(function (res, rej) {
//         var stream = canvas.captureStream(60);

//         mediaRecorder = new MediaRecorder(stream, {
//           mimeType: "video/webm; codecs=vp9"
//         });

//         mediaRecorder.start(time);

//         mediaRecorder.ondataavailable = function (e) {
//           recordedChunks.push(event.data);
//           // for demo, removed stop() call to capture more than one frame
//         }

//         mediaRecorder.onstop = function (event) {
//           var blob = new Blob(recordedChunks, {
//             "type": "video/webm"
//           });
//           var url = URL.createObjectURL(blob);
//           res({ url, blob }); // resolve both blob and url in an object

//           myVideo.src = url;
//           // removed data url conversion for brevity
//         }

//         // for demo, draw random lines and then stop recording
//         var i = 0,
//           tid = setInterval(() => {
//             if ($("#record").hasClass("recording") == false) {
//               clearInterval(tid);
//               console.log(i)
//             }
//             i++
//           }, 1000)


//       });
//     }
//   }

//   function stopRecording() {
//     mediaRecorder.stop();
//     $("#dl").trigger('click')
//   }

//   if ($("#record").hasClass("recording") == false) {
//     $("#record").addClass("recording")
//     $("#controls").css("border-bottom", "red solid 1px")
//     startRecording()

//   } else {
//     $("#record").removeClass("recording")
//     $("#controls").css("border-bottom", "black solid 1px")   
//     stopRecording()
//   }
// })

// function record() {
//   var canvas = document.querySelector("#c");

//   var video = document.querySelector("#recording");
//   var videoStream = canvas.captureStream(30);
//   var mediaRecorder = new MediaRecorder(videoStream);

//   var chunks = [];
//   mediaRecorder.ondataavailable = function (e) {
//     chunks.push(e.data);
//   };

//   mediaRecorder.onstop = function (e) {
//     var blob = new Blob(chunks, { 'type': 'video/mp4' });
//     chunks = [];
//     var videoURL = URL.createObjectURL(blob);
//     video.src = videoURL;
//   };
//   mediaRecorder.ondataavailable = function (e) {
//     chunks.push(e.data);
//   };
//   mediaRecorder.start();
//   mediaRecorder.stop();
// }

$("#dl").on("click", function () {
  $("#dl").remove()
  $("#output-video").remove()
  $("#myVideo").remove()
  $("body").append("<video id='myVideo' controls='controls'></video>")
  $("body").append("<video id='output-video' controls='controls'></video>")
  $("body").append("<a id='dl' href='' download='download.mp4'></a>")
  
})