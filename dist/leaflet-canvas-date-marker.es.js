(function(t) {
  typeof define == "function" && define.amd ? define(t) : t();
})(function() {
  L.Canvas.CustomCanvas = L.Layer.extend({ initialize(t = {}) {
    L.setOptions(this, t);
  }, onAdd(t) {
    this.tiles = {}, this._container = t.getContainer(), this._map = t;
    const e = this._initCanvas();
    (this.options.pane ? t.getPanes()[this.options.pane] : t._panes.overflowPane).appendChild(e), t.on(this.getEvents(), this), this._update();
  }, onRemove() {
    const { _map: t, _ctx: e, _canvas: n } = this;
    n.remove();
  }, _initCanvas() {
    const t = L.DomUtil.create("canvas", "leaflet-ship"), e = t.getContext("2d");
    t.style.zIndex = this.options.zIndex || "500", this._canvas = t, this._ctx = e, this._onLayerDidResize();
    var n = this._map.options.zoomAnimation && L.Browser.any3d;
    return L.DomUtil.addClass(this._canvas, "leaflet-zoom-" + (n ? "animated" : "hide")), t;
  }, _onAnimZoom(t) {
    var e = this._map.getZoomScale(t.zoom), n = this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(), t.zoom, t.center).min;
    L.Browser.any3d ? L.DomUtil.setTransform(this._canvas, n, e) : L.DomUtil.setPosition(this._canvas, n);
  }, _onLayerDidResize: function() {
    const { x: t, y: e } = this._map.getSize(), n = 2;
    this._canvas.style.width = `${t}px`, this._canvas.style.height = `${e}px`, this._canvas.width = t * n, this._canvas.height = e * n;
  }, _onLayerDidMove: function() {
    this._update();
  }, getEvents() {
    var t = { resize: this._onLayerDidResize, moveend: this._onLayerDidMove };
    return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
  }, _update() {
    const { _ctx: t, _map: e, _canvas: n } = this, s = e.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(n, s), this.clearCavnas(t, n), this.drawLayer();
  }, drawLayer: function() {
    console.warn("\u5982\u81EA\u5B9A\u4E49\u65B0\u7684\u7EE7\u627F\u7C7B\uFF0C\u8BF7\u5B9E\u73B0\u6B64\u65B9\u6CD5");
  }, clearCavnas(t, e) {
    t.restore();
    const { width: n, height: s } = e;
    t.clearRect(0, 0, n, s);
  } });
});
class CanvasDatePoint extends L.Canvas.CustomCanvas {
  drawLayer() {
    const {
      options: { data, DateValKeyName = "", latKeyName = "", lngKeyName = "" },
      _map: map
    } = this;
    if (!DateValKeyName) {
      throw new Error(`DateValKeyName \u5C5E\u6027\u4E3A\u5FC5\u586B\u9879\uFF0C\u6570\u636E\u96C6\u5408\u5185\u8868\u793A\u65F6\u95F4\u7684\u952E\u540D`);
    }
    if (latKeyName === false) {
      const res2 = latlngToPixcel(data, "2");
      this.drawDatePoint(res2);
      return;
    }
    if (!latKeyName) {
      throw new Error(`latKeyName \u5C5E\u6027\u4E3A\u5FC5\u586B\u9879\uFF0C\u6570\u636E\u96C6\u5408\u5185\u8868\u793A\u7EF4\u5EA6\u7684\u952E\u540D`);
    }
    if (!lngKeyName) {
      throw new Error(`lngKeyName \u5C5E\u6027\u4E3A\u5FC5\u586B\u9879\uFF0C\u6570\u636E\u96C6\u5408\u5185\u8868\u793A\u7ECF\u5EA6\u7684\u952E\u540D`);
    }
    function latlngToPixcel(data2, type = "1") {
      const res2 = data2.map((item) => {
        let result;
        if (type === "1") {
          const temp = {};
          temp.lat = item[latKeyName];
          temp.lng = item[lngKeyName];
          result = {
            latlng: map.latLngToContainerPoint(temp),
            date: item[DateValKeyName]
          };
        }
        if (type === "2") {
          result = {
            latlng: map.latLngToContainerPoint(item[lngKeyName]),
            date: item[DateValKeyName]
          };
        }
        return result;
      });
      return res2;
    }
    const res = latlngToPixcel(data);
    this.drawDatePoint(res);
  }
  drawDatePoint(res) {
    const { _ctx: ctx } = this;
    let area = null;
    let prevArea = null;
    res.forEach((item) => {
      let {
        latlng: { x, y },
        date
      } = item;
      x = x * 2;
      y = y * 2;
      area = {
        leftTop: {
          x,
          y: y - 132
        },
        rightBottom: {
          x: x + 350,
          y
        }
      };
      if (this.impactCheck && prevArea !== null) {
        const isIntersection = function(rectA, rectB) {
          let lftp = [
            Math.max(rectA.x1, rectB.x1),
            Math.max(rectA.y1, rectB.y1)
          ], rgbt = [Math.min(rectA.x2, rectB.x2), Math.min(rectA.y2, rectB.y2)];
          if (lftp[0] <= rgbt[0] && lftp[1] <= rgbt[1]) {
            return true;
          }
          return false;
        };
        const pointsA = Object.values(area).reduce((prev, item2, index) => {
          prev[`x${index + 1}`] = item2.x;
          prev[`y${index + 1}`] = item2.y;
          return prev;
        }, {});
        const pointsB = Object.values(prevArea).reduce((prev, item2, index) => {
          prev[`x${index + 1}`] = item2.x;
          prev[`y${index + 1}`] = item2.y;
          return prev;
        }, {});
        const flag = isIntersection(pointsA, pointsB);
        if (flag) {
          return;
        }
      }
      prevArea = {
        leftTop: {
          x,
          y: y - 132
        },
        rightBottom: {
          x: x + 350,
          y
        }
      };
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = "#86cbe9";
      ctx.closePath();
      ctx.fill();
      const dateX = x + 90;
      const dateY = y - 100;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(dateX, dateY);
      ctx.closePath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "#86cce9";
      ctx.stroke();
      ctx.beginPath();
      const w = 260;
      const h = 32;
      ctx.moveTo(dateX, dateY);
      ctx.lineTo(dateX, dateY - h);
      ctx.lineTo(dateX + w, dateY - h);
      ctx.lineTo(dateX + w, dateY);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(date, dateX + w / 2, dateY - h / 2);
    });
  }
}
L.canvas.CanvasDatePoint = (options = { impactCheck: false }) => {
  const result = new CanvasDatePoint(options);
  return result;
};
