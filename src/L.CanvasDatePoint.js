/**
 * 指定位置绘制时间点
 * @param {Array} data 经纬点与时间点数据
 * @param {String} DateValKeyName 数据内时间值的字段名 必填
 * @param {String} latKeyName 数据内纬度值的字段名 必填
 * @param {String} lngKeyName 数据内经度值的字段名 必填
 */
class CanvasDatePoint extends L.Canvas.CustomCanvas {
  drawLayer() {
    const {
      options: { data, DateValKeyName = '', latKeyName = '', lngKeyName = '' },
      _map: map
    } = this

    console.log(data, 'options')

    if (!DateValKeyName) {
      throw new Error(`DateValKeyName 属性为必填项，数据集合内表示时间的键名`)
    }
    if (!latKeyName) {
      throw new Error(`latKeyName 属性为必填项，数据集合内表示维度的键名`)
    }
    if (!lngKeyName) {
      throw new Error(`lngKeyName 属性为必填项，数据集合内表示经度的键名`)
    }

    const res = data.map(item => {
      const temp = {}
      temp.lat = item[latKeyName]
      temp.lng = item[lngKeyName]

      const result = {
        latlng: map.latLngToContainerPoint(temp),
        date: item[DateValKeyName]
      }

      return result
    })

    this.drawDatePoint(res)
  }

  drawDatePoint(res) {
    const { _ctx: ctx } = this

    console.log(res, 'res')

    res.forEach(item => {
      let { latlng: { x, y }, date } = item
      x = x * 2
      y = y * 2

      // 船位节点绘制
      // 圆形节点白色边框
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, 2 * Math.PI)
      ctx.fillStyle = 'white'
      ctx.closePath()
      ctx.fill()

      // 圆形节点蓝色夹心
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, 2 * Math.PI)
      ctx.fillStyle = '#86cbe9'
      ctx.closePath()
      ctx.fill()

      // 日期节点绘制
      const dateX = x + 90
      const dateY = y - 100
      // 日期节点标识线条
      ctx.beginPath()
      ctx.moveTo(x, y)

      ctx.lineTo(dateX, dateY)
      ctx.closePath()
      ctx.lineWidth = '1'
      ctx.strokeStyle = '#86cce9'
      ctx.stroke()

      // 日期节点矩形
      ctx.beginPath()
      const w = 260
      const h = 32
      ctx.moveTo(dateX, dateY)
      ctx.lineTo(dateX, dateY - h)
      ctx.lineTo(dateX + w, dateY - h)
      ctx.lineTo(dateX + w, dateY)
      ctx.closePath()
      ctx.stroke()

      // 日期节点文字
      console.log(date, 'date')
      ctx.fillStyle = 'black'
      ctx.font = '24px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle' // 文字垂直居中 ， 设置基线位置 并不是真正的居中 肉眼可见的不居中
      ctx.fillText(date, dateX + w / 2, dateY - h / 2)
    })
  }
}

L.canvas.CanvasDatePoint = (options) => {
  const result = new CanvasDatePoint(options)
  return result
}

