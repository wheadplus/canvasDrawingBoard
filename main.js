var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var brushEnabled = false,
  eraserEnabled = false
var lastPoint = {
  x: undefined,
  y: undefined
}

autoSetCanvasSize()
listenToMouse()

function autoSetCanvasSize() {
  setCanvasFullScreen()

  //监听页面尺寸变更
  window.onresize = () => {
    setCanvasFullScreen()
  }
  //让canvas全屏
  function setCanvasFullScreen() {
    var {
      clientWidth, clientHeight
    } = document.documentElement
    canvas.width = clientWidth
    canvas.height = clientHeight
  }
}

function listenToMouse() {
  // 支持touch监听touch方法，否则mouse方法
  if (document.body.ontouchstart !== undefined) {
    console.log('触摸事件')
    // 触屏开始摸
    canvas.ontouchstart = function (e) {
      brushEnabled = true
      let {
        clientX, clientY
      } = e.touches[0]
      if (eraserEnabled) {
        ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
      } else {
        lastPoint = {
          x: clientX,
          y: clientY
        }
        drawCircle(clientX, clientY, 2)
      }
    }
    // 触屏边摸边动
    canvas.ontouchmove = function (e) {
      if (!brushEnabled) {
        return
      }
      let {
        clientX, clientY
      } = e.touches[0]
      if (eraserEnabled) {
        ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
      } else {
        let newPoint = {
          x: clientX,
          y: clientY
        }
        drawCircle(clientX, clientY, 2)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    // 触屏摸完了
    canvas.ontouchend = function (e) {
      brushEnabled = false
    }
  } else {
    console.log('鼠标事件')
    // 点击鼠标
    canvas.onmousedown = e => {
      brushEnabled = true
      let {
        clientX, clientY
      } = e
      if (eraserEnabled) {
        ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
      } else {
        lastPoint = {
          x: clientX,
          y: clientY
        }
        drawCircle(clientX, clientY, 2)
      }
    }
    // 移动鼠标
    canvas.onmousemove = e => {
      if (!brushEnabled) {
        return
      }
      let {
        clientX, clientY
      } = e
      if (eraserEnabled) {
        ctx.clearRect(clientX - 5, clientY - 5, 10, 10)
      } else {
        let newPoint = {
          x: clientX,
          y: clientY
        }
        drawCircle(clientX, clientY, 2)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }

    // 松开鼠标 
    canvas.onmouseup = e => {
      brushEnabled = false
    }
  }


}


function drawCircle(x, y, radius) {
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.moveTo(x1, y1) // 起点
  ctx.lineWidth = 5
  ctx.lineTo(x2, y2) // 终点
  ctx.stroke()
  ctx.closePath()
}

eraser.onclick = () => {
  eraserEnabled = !eraserEnabled
}