"use strict";class RObject{constructor(t){this.nDpr=1,this.setOptions(t)}_set(t,s){this[t]=s}set(t,s){typeof t=="object"?this._setObject(t):this._set(t,s)}_setObject(t){for(const s in t)this.set(s,t[s])}_setOptions(t){for(const s in t)this.set(s,t[s])}setOptions(t,s){this._setOptions(Object.assign(s||{nDpr:1,left:0,top:0,width:0,height:0},t))}xDpr(t){return t*this.nDpr}new(t,s){return{left:this.left,top:this.top,nDpr:this.nDpr,width:this.width,height:this.height,canvas:s?.canvas,...t}}}function hue2rgb(a,t,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?a+(t-a)*6*s:s<1/2?t:s<2/3?a+(t-a)*(2/3-s)*6:a}function hexify(a){const t=a.toString(16).toUpperCase();return t.length===1?`0${t}`:t}const l=/^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*((?:\d*\.?\d+)?)\s*)?\)$/i,m=/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/i,b=/^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;class Color{constructor(t){if(!t)this.setSource([0,0,0,1]);else if(t instanceof Color)this.setSource([...t._source]);else if(Array.isArray(t)){const[s,e,i,r=1]=t;this.setSource([s,e,i,r])}else this.setSource(this._tryParsingColor(t))}_tryParsingColor(t){return t==="transparent"?[255,255,255,0]:Color.sourceFromHex(t)||Color.sourceFromRgb(t)||Color.sourceFromHsl(t)||[0,0,0,1]}_rgbToHsl(t,s,e){t/=255,s/=255,e/=255;const i=Math.max(t,s,e),r=Math.min(t,s,e);let h,n;const o=(i+r)/2;if(i===r)h=n=0;else{const d=i-r;switch(n=o>.5?d/(2-i-r):d/(i+r),i){case t:h=(s-e)/d+(s<e?6:0);break;case s:h=(e-t)/d+2;break;case e:h=(t-s)/d+4;break}h/=6}return[Math.round(h*360),Math.round(n*100),Math.round(o*100)]}getSource(){return this._source}setSource(t){this._source=t}toRgb(){const t=this.getSource();return`rgb(${t[0]},${t[1]},${t[2]})`}toRgba(){const t=this.getSource();return`rgba(${t[0]},${t[1]},${t[2]},${t[3]})`}toHsl(){const t=this.getSource(),s=this._rgbToHsl(t[0],t[1],t[2]);return`hsl(${s[0]},${s[1]}%,${s[2]}%)`}toHsla(){const t=this.getSource(),s=this._rgbToHsl(t[0],t[1],t[2]);return`hsla(${s[0]},${s[1]}%,${s[2]}%,${t[3]})`}toHex(){const[t,s,e]=this.getSource();return`${hexify(t)}${hexify(s)}${hexify(e)}`}toHexa(){const t=this.getSource();return`${this.toHex()}${hexify(Math.round(t[3]*255))}`}setAlpha(t){const s=this.getSource();return s[3]=t,this.setSource(s),this}static fromRgb(t){return Color.fromRgba(t)}static fromRgba(t){return new Color(Color.sourceFromRgb(t))}static sourceFromRgb(t){const s=t.match(l);if(s){const e=parseInt(s[1],10)/(/%$/.test(s[1])?100:1)*(/%$/.test(s[1])?255:1),i=parseInt(s[2],10)/(/%$/.test(s[2])?100:1)*(/%$/.test(s[2])?255:1),r=parseInt(s[3],10)/(/%$/.test(s[3])?100:1)*(/%$/.test(s[3])?255:1);return[e,i,r,s[4]?parseFloat(s[4]):1]}}static fromHsl(t){return Color.fromHsla(t)}static fromHsla(t){return new Color(Color.sourceFromHsl(t))}static sourceFromHsl(t){const s=t.match(m);if(!s)return;const e=(parseFloat(s[1])%360+360)%360/360,i=parseFloat(s[2])/(/%$/.test(s[2])?100:1),r=parseFloat(s[3])/(/%$/.test(s[3])?100:1);let h,n,o;if(i===0)h=n=o=r;else{const d=r<=.5?r*(i+1):r+i-r*i,p=r*2-d;h=hue2rgb(p,d,e+1/3),n=hue2rgb(p,d,e),o=hue2rgb(p,d,e-1/3)}return[Math.round(h*255),Math.round(n*255),Math.round(o*255),s[4]?parseFloat(s[4]):1]}static fromHex(t){return new Color(Color.sourceFromHex(t))}static sourceFromHex(t){if(t.match(b)){const s=t.slice(t.indexOf("#")+1),e=s.length===3||s.length===4,i=s.length===8||s.length===4,r=e?s.charAt(0)+s.charAt(0):s.substring(0,2),h=e?s.charAt(1)+s.charAt(1):s.substring(2,4),n=e?s.charAt(2)+s.charAt(2):s.substring(4,6),o=i?e?s.charAt(3)+s.charAt(3):s.substring(6,8):"FF";return[parseInt(r,16),parseInt(h,16),parseInt(n,16),parseFloat((parseInt(o,16)/255).toFixed(2))]}}}class Gradient extends RObject{constructor(t){super(t),this.setOptions(t)}toLive(t){const{x1:s=0,y1:e=0,x2:i=0,y2:r=0,r1:h=0,r2:n=0}=this.coords;let o;if(!this.type)throw new Error("gradient type is undefined");return this.type==="linear"?o=t.createLinearGradient(this.xDpr(s),this.xDpr(e),this.xDpr(i),this.xDpr(r)):o=t.createRadialGradient(this.xDpr(s),this.xDpr(e),this.xDpr(h),this.xDpr(i),this.xDpr(r),this.xDpr(n)),this.colorStops.map(d=>{const p=d.opacity!==void 0?new Color(d.color).setAlpha(d.opacity).toRgba():d.color;o.addColorStop(d.offset,p)}),o}}class RShape extends RObject{constructor(t){super(t),this.top=0,this.left=0,this.width=0,this.height=0,this.opacity=1,this.stroke=null,this.strokeWidth=1,this.strokeDashArray=null,this.strokeDashOffset=0,this.fill=void 0,this.visible=!0,this.setOptions(t)}_setFillStyles(t,{fill:s}){s&&(typeof s=="string"?t.fillStyle=s:t.fillStyle=new Gradient(this.new(s)).toLive(t))}_renderFill(t){this.fill&&(t.save(),this._setFillStyles(t,this),this.fillRule==="evenodd"?t.fill("evenodd"):t.fill(),t.restore())}_renderStroke(t){}_renderPaintInOrder(t){this.paintFirst==="stroke"?(this._renderStroke(t),this._renderFill(t)):(this._renderFill(t),this._renderStroke(t))}}const kRect=.4477152502,PiBy180=Math.PI/180,degreesToRadians=a=>a*PiBy180;class Circle extends RShape{constructor(t){const s={...t,width:t.radius*2,height:t.radius*2};super(s),this.radius=0,this.startAngle=0,this.endAngle=360,this.left=0,this.top=0,this.setOptions(s)}render(t){t.beginPath(),t.arc(this.xDpr(this.left+this.radius),this.xDpr(this.top+this.radius),this.xDpr(this.radius),degreesToRadians(this.startAngle),degreesToRadians(this.endAngle),!1),this._renderPaintInOrder(t)}}class Ellipse extends RShape{constructor(t){super(t),this.setOptions(t)}render(t){const s=this.xDpr(this.left),e=this.xDpr(this.top),i=this.xDpr(this.rx),r=this.xDpr(this.ry),h=i>r?1/i:1/r;t.beginPath(),t.moveTo(s+i,e);for(let n=0;n<2*Math.PI;n+=h)t.lineTo(s+i*Math.cos(n),e+r*Math.sin(n));t.closePath(),this._renderPaintInOrder(t)}}const isWeb=!!window,loadImage=async(a,t)=>new Promise((s,e)=>{if(isWeb){const i=new Image;i.onload=function(){s({img:i,width:i.width,height:i.height})},i.onerror=e,i.src=a}else{if(!t)throw new Error("canvas is undefined");const i=t.node.createImage();i.src=a,wx.getImageInfo({src:a,success:r=>{s({img:i,width:r.width,height:r.height})},fail:e})}});class Rect extends RShape{constructor(t){super(t),this.setOptions(t)}render(t){const s=this.xDpr(this.left),e=this.xDpr(this.top),i=this.xDpr(this.width),r=this.xDpr(this.height);if(this.radii){const d=typeof this.radii=="number"?this.xDpr(this.radii):this.radii?.map(this.xDpr);if(t.roundRect){t.roundRect(s,e,i,r,d);return}else throw new Error("not support roundRect, please use rx, ry")}const h=this.rx?Math.min(this.rx,i/2):0,n=this.ry?Math.min(this.ry,r/2):0,o=h!==0||n!==0;t.beginPath(),t.moveTo(s+h,e),t.lineTo(s+i-h,e),o&&t.bezierCurveTo(s+i-kRect*h,e,s+i,e+kRect*n,s+i,e+n),t.lineTo(s+i,e+r-n),o&&t.bezierCurveTo(s+i,e+r-kRect*n,s+i-kRect*h,e+r,s+i-h,e+r),t.lineTo(s+h,e+r),o&&t.bezierCurveTo(s+kRect*h,e+r,s,e+r-kRect*n,s,e+r-n),t.lineTo(s,e+n),o&&t.bezierCurveTo(s,e+kRect*n,s+kRect*h,e,s+h,e),t.closePath(),this._renderPaintInOrder(t)}}class ImageShape extends RShape{constructor(t){super(t),this.src="",this.radius=0,this.setOptions(t)}async render(t){const{src:s,left:e,top:i,width:r,height:h,radius:n}=this,o=await loadImage(s,this.canvas);n&&(t.save(),new Rect({left:e,top:i,width:this.width,height:this.height,nDpr:this.nDpr,rx:this.radius,ry:this.radius}).render(t),t.clip()),t.drawImage(o.img,0,0,o.width,o.height,this.xDpr(this.left),this.xDpr(this.top),this.xDpr(r||o.width),this.xDpr(h||o.height)),n&&t.restore()}}class Line extends RShape{constructor(t){super(t),this.setOptions(t)}render(t){const{x1:s,y1:e,x2:i,y2:r}=this;t.beginPath(),t.moveTo(this.xDpr(s),this.xDpr(e)),t.lineTo(this.xDpr(i),this.xDpr(r)),t.stroke()}}class Polyline extends RShape{constructor(t){super(t),this.setOptions(t)}isOpen(){return!0}render(t){const s=this.points.length;if(!(!s||isNaN(this.points[s-1].y))){t.beginPath(),t.moveTo(this.xDpr(this.points[0].x),this.xDpr(this.points[0].y));for(let e=0;e<s;e++){const i=this.points[e];t.lineTo(this.xDpr(i.x),this.xDpr(i.y))}!this.isOpen()&&t.closePath(),this._renderPaintInOrder(t)}}}class Polygon extends Polyline{constructor(t){super(t),this.setOptions(t)}isOpen(){return!1}}class Text extends RShape{constructor(t){const s={...t,lineHeight:t.lineHeight||t.fontSize||14};super(s),this.text="",this.fontFamily="system-ui",this.fontWeight="normal",this.fontSize=12,this.underline=!1,this.overline=!1,this.linethrough=!1,this.textAlign="left",this.textBaseline="top",this.fontStyle="normal",this.lineHeight=14,this.textBackgroundColor="",this.charSpacing=0,this.direction="ltr",this.lineClamp=0,this.width=1/0,this.setOptions(s)}render(t){let s=0,e=[];t.save(),t.font=`${this.fontWeight} ${this.xDpr(this.fontSize)}px ${this.fontFamily}`,t.textBaseline="top",t.textAlign=this.textAlign,t.direction=this.direction,t.fillStyle=this.textBackgroundColor,[this.text].forEach((i,r)=>{let h=0;String(i).split("").forEach((n,o)=>{const d=String(i).slice(h,o+1);t.measureText(d).width<this.xDpr(this.width)?e[s]=d:(e[s+1]=n,h=o,s++)}),s++}),this.lineClamp&&e.length>this.lineClamp&&(e=e.slice(0,this.lineClamp),e[this.lineClamp-1]=e[this.lineClamp-1].slice(0,-1)+"..."),this._setFillStyles(t,this),e.forEach((i,r)=>{t.fillText(i,this.xDpr({left:this.left,start:this.left,right:this.left+this.width,end:this.left+this.width,center:this.left+this.width/2}[this.textAlign]||this.left),this.xDpr(this.top+this.lineHeight*r+(this.lineHeight-this.fontSize)/2))}),t.restore()}}class Triangle extends RShape{constructor(t){super(t),this.setOptions(t)}render(t){const s=this.xDpr(this.left),e=this.xDpr(this.top),i=this.xDpr(this.width),r=this.xDpr(this.height);t.beginPath(),t.moveTo(s+i/2,e),t.lineTo(s,e+r),t.lineTo(s+i,e+r),t.closePath(),this._renderPaintInOrder(t)}}const shapeHandler={circle:Circle,ellipse:Ellipse,rect:Rect,triangle:Triangle,polyline:Polyline,polygon:Polygon,line:Line,text:Text,image:ImageShape},c={background:"transparent",enableRetinaScaling:!0,imageSmoothingEnabled:!0,width:0,height:0,radius:0};class Rubbing extends RObject{constructor(t){const s={...c,...t};super(s),this.isRendering=0,this.setOptions(s)}async init(){const t=await this.queryCanvas();this.canvas=t,this.ctx=(isWeb?t:t.node).getContext("2d"),this.retinaScale()}queryCanvas(){return new Promise((t,s)=>{if(isWeb){const e=document.querySelector(this.selector);e?t(e):s(e)}else(this.component||wx).createSelectorQuery().select(this.selector).fields({node:!0,size:!0}).exec(e=>{e[0]?t(e[0]):s(e)})})}retinaScale(){if(isWeb)this.canvas.style.width=this.width+"px",this.canvas.style.height=this.height+"px",this.nDpr=this.dpr,this.canvas.width=this.width*this.dpr,this.canvas.height=this.height*this.dpr;else{const t=wx.getSystemInfoSync();this.dpr=t.pixelRatio,this.nDpr=this.dpr,this.canvas.node.width=this.canvas.width*this.dpr,this.canvas.node.height=this.canvas.height*this.dpr}}clipCanvas(t){new Rect({left:0,top:0,width:this.width,height:this.height,fill:this.background,rx:this.radius,ry:this.radius,nDpr:this.nDpr}).render(t),t.clip()}clearContext(t){t.clearRect(0,0,this.canvas.width,this.canvas.height),this.clipCanvas(t)}async _renderObjects(t,s){for(let e=0;e<s.length;e++)s[e]&&await s[e].render(t)}renderCanvas(t){this.clearContext(t),t.save(),this._renderObjects(t,this.serialized),t.restore()}renderAll(){this.renderCanvas(this.ctx)}serialize(t){const s=t.map(e=>({...e,zIndex:e.zIndex||0})).sort((e,i)=>e.zIndex-i.zIndex).map(e=>{const i=shapeHandler[e.type];return new i(this.new(e,this))});this.serialized=s,this.renderAll()}loadFromJSON(t){this.serialize(t.objects)}}module.exports=Rubbing;
