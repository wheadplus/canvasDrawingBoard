var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var brushEnabled = false,
  eraserEnabled = false
var lastPoint = {
  x: undefined,
  y: undefined
}
var canvasLineWidth = 5,fillStyle = 'black'
autoSetCanvasSize()
initCanvasBgColor()
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
        ctx.clearRect(clientX - canvasLineWidth, clientY - canvasLineWidth, canvasLineWidth*2, canvasLineWidth*2)
      } else {
        lastPoint = {
          x: clientX,
          y: clientY
        }
        drawCircle(clientX, clientY)
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
        ctx.clearRect(clientX - canvasLineWidth, clientY - canvasLineWidth, canvasLineWidth*2, canvasLineWidth*2)
      } else {
        let newPoint = {
          x: clientX,
          y: clientY
        }
        drawCircle(clientX, clientY)
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
        ctx.clearRect(clientX - canvasLineWidth, clientY - canvasLineWidth, canvasLineWidth*2, canvasLineWidth*2)
      } else {
        lastPoint = {
          x: clientX,
          y: clientY
        }
        drawCircle(clientX, clientY)
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
        ctx.clearRect(clientX - canvasLineWidth, clientY - canvasLineWidth, canvasLineWidth*2, canvasLineWidth*2)
      } else {
        let newPoint = {
          x: clientX,
          y: clientY
        }
        drawCircle(clientX, clientY)
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


function drawCircle(x, y) {
  ctx.beginPath()
  ctx.fillStyle = fillStyle
  ctx.arc(x, y, canvasLineWidth / 2 , 0, Math.PI * 2)
  ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.strokeStyle = fillStyle
  ctx.moveTo(x1, y1) // 起点
  ctx.lineWidth = canvasLineWidth
  ctx.lineTo(x2, y2) // 终点
  ctx.stroke()
  ctx.closePath()
}
//
pen.onclick = () => {
  eraserEnabled = false
  changeActived(pen,[eraser])
}
eraser.onclick = () => {
  eraserEnabled = !eraserEnabled
  changeActived(eraser,[pen])
}
//清除canvas全屏
clear.onclick = () => {
  ctx.clearRect(0,0,canvas.width,canvas.height)
  initCanvasBgColor()
}
//保存canvas
save.onclick = () => {
  var url = canvas.toDataURL('image/png')
  console.log(url)
  var a = document.createElement('a')
  document.body.append(a)
  a.href = url
  a.download = '你的作品'
  a.click()
}
// 改变画板颜色
red.onclick = () => {
  fillStyle='red'
  changeActived(red,[blue,green,black])
}
blue.onclick = () => {
  fillStyle = 'blue'
  changeActived(blue,[green,red,black])
}
black.onclick = () => {
  fillStyle = 'black'
  changeActived(black,[green,red,blue])
}
green.onclick = () => {
  fillStyle='green'
  changeActived(green,[blue,red,black])
}
// 改变画板size
small.onclick = () =>  {
  canvasLineWidth = 5
  changeActived(small,[normal,large])
}
normal.onclick = () =>  {
  canvasLineWidth = 10
  changeActived(normal,[small,large])
}
large.onclick = () =>  {
  canvasLineWidth = 15
  changeActived(large,[small,normal])
}

//背景白色
function initCanvasBgColor() {
  let beforeFillStyle = fillStyle
  ctx.fillStyle = '#fff'
  ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle = beforeFillStyle
}
//
function changeActived(addActived,removeActivedList) {
  addActived.classList.add('active') 
  removeActivedList.forEach(el => {
    el.classList.remove('active')
  })
}