L.Canvas.CustomCanvas = L.Layer.extend({ initialize(t2 = {}) {
  L.setOptions(this, t2);
}, onAdd(t2) {
  this.tiles = {}, this._container = t2.getContainer(), this._map = t2;
  const e = this._initCanvas();
  (this.options.pane ? t2.getPanes()[this.options.pane] : t2._panes.overflowPane).appendChild(e), t2.on(this.getEvents(), this), this._update();
}, onRemove() {
  const { _map: t2, _ctx: e, _canvas: a } = this;
  a.remove();
}, _initCanvas() {
  const t2 = L.DomUtil.create("canvas", "leaflet-ship"), e = t2.getContext("2d");
  t2.style.zIndex = "500", this._canvas = t2, this._ctx = e, this._onLayerDidResize();
  var a = this._map.options.zoomAnimation && L.Browser.any3d;
  return L.DomUtil.addClass(this._canvas, "leaflet-zoom-" + (a ? "animated" : "hide")), t2;
}, _onAnimZoom(t2) {
  var e = this._map.getZoomScale(t2.zoom), a = this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(), t2.zoom, t2.center).min;
  L.Browser.any3d ? L.DomUtil.setTransform(this._canvas, a, e) : L.DomUtil.setPosition(this._canvas, a);
}, _onLayerDidResize: function() {
  const { x: t2, y: e } = this._map.getSize();
  this._canvas.style.width = `${t2}px`, this._canvas.style.height = `${e}px`, this._canvas.width = 2 * t2, this._canvas.height = 2 * e;
}, _onLayerDidMove: function() {
  this._update();
}, getEvents() {
  var t2 = { resize: this._onLayerDidResize, moveend: this._onLayerDidMove };
  return this._zoomAnimated && (t2.zoomanim = this._onAnimZoom), t2;
}, _update() {
  const { _ctx: t2, _map: e, _canvas: a } = this, n = e.containerPointToLayerPoint([0, 0]);
  L.DomUtil.setPosition(a, n), this.clearCavnas(t2, a), this.drawLayer();
}, drawLayer: function() {
  console.warn("\u5982\u81EA\u5B9A\u4E49\u65B0\u7684\u7EE7\u627F\u7C7B\uFF0C\u8BF7\u5B9E\u73B0\u6B64\u65B9\u6CD5");
}, clearCavnas(t2, e) {
  t2.restore();
  const { width: a, height: n } = e;
  t2.clearRect(0, 0, a, n);
} });
class t extends L.Canvas.CustomCanvas {
  drawLayer() {
    const { options: { data: t2, DateValKeyName: e = "", latKeyName: a = "", lngKeyName: n = "" }, _map: i } = this;
    if (!e)
      throw new Error("DateValKeyName \u5C5E\u6027\u4E3A\u5FC5\u586B\u9879\uFF0C\u6570\u636E\u96C6\u5408\u5185\u8868\u793A\u65F6\u95F4\u7684\u952E\u540D");
    if (a === false) {
      const e2 = o(t2, "2");
      return void this.drawDatePoint(e2);
    }
    if (!a)
      throw new Error("latKeyName \u5C5E\u6027\u4E3A\u5FC5\u586B\u9879\uFF0C\u6570\u636E\u96C6\u5408\u5185\u8868\u793A\u7EF4\u5EA6\u7684\u952E\u540D");
    if (!n)
      throw new Error("lngKeyName \u5C5E\u6027\u4E3A\u5FC5\u586B\u9879\uFF0C\u6570\u636E\u96C6\u5408\u5185\u8868\u793A\u7ECF\u5EA6\u7684\u952E\u540D");
    function o(t3, o2 = "1") {
      return t3.map((t4) => {
        let s2;
        if (o2 === "1") {
          const o3 = {};
          o3.lat = t4[a], o3.lng = t4[n], s2 = { latlng: i.latLngToContainerPoint(o3), date: t4[e] };
        }
        return o2 === "2" && (s2 = { latlng: i.latLngToContainerPoint(t4[n]), date: t4[e] }), s2;
      });
    }
    const s = o(t2);
    this.drawDatePoint(s);
  }
  drawDatePoint(t2) {
    const { _ctx: e } = this;
    t2.forEach((t3) => {
      let { latlng: { x: a, y: n }, date: i } = t3;
      a *= 2, n *= 2, e.beginPath(), e.arc(a, n, 10, 0, 2 * Math.PI), e.fillStyle = "white", e.closePath(), e.fill(), e.beginPath(), e.arc(a, n, 8, 0, 2 * Math.PI), e.fillStyle = "#86cbe9", e.closePath(), e.fill();
      const o = a + 90, s = n - 100;
      e.beginPath(), e.moveTo(a, n), e.lineTo(o, s), e.closePath(), e.lineWidth = "1", e.strokeStyle = "#86cce9", e.stroke(), e.beginPath();
      e.moveTo(o, s), e.lineTo(o, s - 32), e.lineTo(o + 260, s - 32), e.lineTo(o + 260, s), e.closePath(), e.stroke(), e.fillStyle = "black", e.font = "24px Arial", e.textAlign = "center", e.textBaseline = "middle", e.fillText(i, o + 130, s - 16);
    }), this.drawYawDistance(t2);
  }
  drawYawDistance(t2) {
    console.log(t2, "res");
  }
}
L.canvas.CanvasDatePoint = (e) => new t(e);
