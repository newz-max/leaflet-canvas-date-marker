(function(h){typeof define=="function"&&define.amd?define(h):h()})(function(){"use strict";(function(e){typeof define=="function"&&define.amd?define(e):e()})(function(){L.Canvas.CustomCanvas=L.Layer.extend({initialize(e={}){L.setOptions(this,e)},onAdd(e){this.tiles={},this._container=e.getContainer(),this._map=e;const n=this._initCanvas();(this.options.pane?e.getPanes()[this.options.pane]:e._panes.overflowPane).appendChild(n),e.on(this.getEvents(),this),this._update()},onRemove(){const{_map:e,_ctx:n,_canvas:t}=this;t.remove()},_initCanvas(){const e=L.DomUtil.create("canvas","leaflet-ship"),n=e.getContext("2d");e.style.zIndex=this.options.zIndex||"500",this._canvas=e,this._ctx=n,this._onLayerDidResize();var t=this._map.options.zoomAnimation&&L.Browser.any3d;return L.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(t?"animated":"hide")),e},_onAnimZoom(e){var n=this._map.getZoomScale(e.zoom),t=this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(),e.zoom,e.center).min;L.Browser.any3d?L.DomUtil.setTransform(this._canvas,t,n):L.DomUtil.setPosition(this._canvas,t)},_onLayerDidResize:function(){const{x:e,y:n}=this._map.getSize(),t=2;this._canvas.style.width=`${e}px`,this._canvas.style.height=`${n}px`,this._canvas.width=e*t,this._canvas.height=n*t},_onLayerDidMove:function(){this._update()},getEvents(){var e={resize:this._onLayerDidResize,moveend:this._onLayerDidMove};return this._zoomAnimated&&(e.zoomanim=this._onAnimZoom),e},_update(){const{_ctx:e,_map:n,_canvas:t}=this,o=n.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(t,o),this.clearCavnas(e,t),this.drawLayer()},drawLayer:function(){console.warn("\u5982\u81EA\u5B9A\u4E49\u65B0\u7684\u7EE7\u627F\u7C7B\uFF0C\u8BF7\u5B9E\u73B0\u6B64\u65B9\u6CD5")},clearCavnas(e,n){e.restore();const{width:t,height:o}=n;e.clearRect(0,0,t,o)}})});class h extends L.Canvas.CustomCanvas{drawLayer(){const{options:{data:n,DateValKeyName:t="",latKeyName:o="",lngKeyName:a=""},_map:s}=this;if(!t)throw new Error("DateValKeyName \u5C5E\u6027\u4E3A\u5FC5\u586B\u9879\uFF0C\u6570\u636E\u96C6\u5408\u5185\u8868\u793A\u65F6\u95F4\u7684\u952E\u540D");if(o===!1){const i=d(n,"2");this.drawDatePoint(i);return}if(!o)throw new Error("latKeyName \u5C5E\u6027\u4E3A\u5FC5\u586B\u9879\uFF0C\u6570\u636E\u96C6\u5408\u5185\u8868\u793A\u7EF4\u5EA6\u7684\u952E\u540D");if(!a)throw new Error("lngKeyName \u5C5E\u6027\u4E3A\u5FC5\u586B\u9879\uFF0C\u6570\u636E\u96C6\u5408\u5185\u8868\u793A\u7ECF\u5EA6\u7684\u952E\u540D");function d(i,l="1"){return i.map(c=>{let u;if(l==="1"){const _={};_.lat=c[o],_.lng=c[a],u={latlng:s.latLngToContainerPoint(_),date:c[t]}}return l==="2"&&(u={latlng:s.latLngToContainerPoint(c[a]),date:c[t]}),u})}const r=d(n);this.drawDatePoint(r)}drawDatePoint(n){const{_ctx:t}=this;n.forEach(o=>{let{latlng:{x:a,y:s},date:d}=o;a=a*2,s=s*2,t.beginPath(),t.arc(a,s,10,0,2*Math.PI),t.fillStyle="white",t.closePath(),t.fill(),t.beginPath(),t.arc(a,s,8,0,2*Math.PI),t.fillStyle="#86cbe9",t.closePath(),t.fill();const r=a+90,i=s-100;t.beginPath(),t.moveTo(a,s),t.lineTo(r,i),t.closePath(),t.lineWidth="1",t.strokeStyle="#86cce9",t.stroke(),t.beginPath();const l=260,m=32;t.moveTo(r,i),t.lineTo(r,i-m),t.lineTo(r+l,i-m),t.lineTo(r+l,i),t.closePath(),t.stroke(),t.fillStyle="black",t.font="24px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText(d,r+l/2,i-m/2)})}}L.canvas.CanvasDatePoint=e=>new h(e)});
