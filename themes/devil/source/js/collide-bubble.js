var min_speed = 1;
var max_speed = 3;
var max_size = 80;
var min_size = 1;
var change_unit = -0.15;
var frequency = 30;
var ratio = 3.5;

function rand(m, n){
  return m + parseInt((n - m) * Math.random());
}
//气泡类
//动能定理p = mv，变量名跟这个相关
/* 
  ** x: 气泡x坐标
  ** y: 气泡y坐标
  ** vx: 气泡x轴方向速度
  ** vy: 气泡y轴方向速度
  ** r: 气泡半径
  ** m: 气泡重量
  ** bgi: 背景图片
  ** content: 气泡中填充的内容
  ** fontsize: 气泡中内容字体大小
*/
function Bubble(opts){
  this.x = opts.x === undefined ? 0 : opts.x;
  this.y = opts.y === undefined ? 0 : opts.y;
  this.vx = opts.vx === undefined ? 0 : opts.vx;
  this.vy = opts.vy === undefined ? 0 : opts.vy;
  this.r = opts.r === undefined ? 0 : opts.r;
  this.m = opts.m === undefined ? 1 : opts.m;
  
  this.fontSize = opts.fontsize === undefined ? '12' : opts.fontsize;
  this.dom = opts.dom === undefined ? document.createElement('a') : opts.dom;
  this.moving = true;
  this.symbol = change_unit;
  this.initDom();
  this.addEvent();
}

Bubble.prototype.initDom = function(){
  var sty = this.dom.style;
  sty.position = 'absolute';
  sty.top = '0px';
  sty.left = '0px';
  sty.width = this.r * 2 + 'px';
  sty.height = this.r * 2 + 'px';
  sty.borderRadius = '50%';

  var px = parseInt(this.x - this.r);
  var py = parseInt(this.y - this.r);
  sty.transform = 'translate(' + px + 'px,' + py + 'px)';
  
  sty.textAlign = 'center';
  sty.lineHeight = this.r * 2 + 'px';
  sty.fontSize = this.fontSize + 'px';
};

Bubble.prototype.updateDom = function(){
  var sty = this.dom.style;
  sty.width = this.r * 2 + 'px';
  sty.height = this.r * 2 + 'px';
  sty.lineHeight = this.r * 2 + 'px';
  sty.fontSize = this.fontSize + 'px';
  

  var px = parseInt(this.x - this.r);
  var py = parseInt(this.y - this.r);
  sty.transform = 'translate(' + px + 'px,' + py + 'px)';
  
  
};

Bubble.prototype.updatePos = function(){
  var x = parseInt(this.x - this.r);
  var y = parseInt(this.y - this.r);
  this.dom.style.transform = 'translate(' + x + 'px,' + y + 'px)';
};

Bubble.prototype.move = function(){
  //必须先显式后更新位置
　//否则会导致超出范围
  //超出范围会导致滚动条时不时的出现
　//设置overflow:hidden也可以解决
　//但个人不推荐，解决问题总比掩盖问题更好
  if(!this.moving) return;
  this.updatePos();
  this.x += this.vx;
  this.y += this.vy;
};

Bubble.prototype.addEvent = function() {
  this.dom.onmouseenter = function() {
    this.stopMove();
  }.bind(this);
  this.dom.onmouseout = function() {
    this.startMove();
  }.bind(this);
};

Bubble.prototype.startMove = function() {
  this.moving = true;
  this.m = 1;
  this.vx = rand(min_speed,max_speed);
  this.vy = rand(min_speed,max_speed);
};
Bubble.prototype.stopMove = function() {
  this.moving = false;
  this.m = 999999;
  this.vx = 0;
  this.vy = 0;
};
Bubble.prototype.updateSize = function(width, height, small, big) {
  if(this.x < this.r)
  {
    this.x = this.r;
    this.vx *= -1;
  }
  if(this.y < this.r)
  {
    this.y = this.r;
    this.vy *= -1;
  }
  if(this.x > width - this.r)
  {
    this.x = width - this.r;
    this.vx *= -1;
  }
  if(this.y > height - this.r)
  {
    this.y = height - this.r;
    this.vy *= -1;
  }
  if(this.r < small || this.r > big)
  {
    this.symbol *= -1;
  }
  this.r += this.symbol;
  this.fontSize = this.r / ratio;
  this.updateDom();
};

//气泡容器类
function BubbleBox(containerId){
  this.container = document.getElementById(containerId);
  this.width = this.container.offsetWidth;
  this.height = this.container.offsetHeight;
  this.bubbles = [];
  this.timer = undefined;
}

BubbleBox.prototype.addBubbles = function(){
  var bubbles = this.container.querySelectorAll('.bubble');
  for(var i = 0; i < bubbles.length; ++i)
  {
    var br = rand(min_size, max_size);
    var bx = rand(br, this.width - br);
    var by = rand(br, this.height - br);
    var bubble = new Bubble({
      x: bx,
      y: by,
      vx: rand(min_speed,max_speed),
      vy: rand(min_speed,max_speed),
      r: br,
      fontsize: br / ratio,
      dom: bubbles[i]
    });
    this.bubbles.push(bubble);
  }
};

BubbleBox.prototype.go = function(){
  this.addBubbles();
  clearInterval(this.timer);
　//注意绑定this
  this.timer = setInterval(function(){
    for(var i = 0; i < this.bubbles.length; ++i)
    {
      var bubble = this.bubbles[i];
      if(bubble.moving)
      {
        bubble.updateSize(this.width, this.height, min_size, max_size)
        bubble.move();
      }
    }
    for(var i = 0; i < this.bubbles.length; ++i)
    {
      for(var j = i + 1; j < this.bubbles.length; ++j)
      {
        if(this.isCollide(this.bubbles[i], this.bubbles[j]))
        {
          this.collide(this.bubbles[i], this.bubbles[j]);
        }
      }
    }
  }.bind(this), frequency);
};

BubbleBox.prototype.collide = function(b1, b2){
　//原理不清楚
  var alpha = Math.atan2(b2.vy - b1.vy, b2.vx - b1.vx);
  //这里不能换成 b2.y - b1.y 和 b2.x - b1.x
  //可以试试，会发生有意思的现象
  var beta = Math.atan2(b1.y - b2.y, b1.x - b2.x);
  var i = Math.abs(alpha - beta);
  var D = Math.PI / 2;
  if (i <= 3 * D && i >= D) return;

  
  //动能守恒定理
  var nvx1 = ((b1.m - b2.m) * b1.vx + 2 * b2.m * b2.vx) / (b1.m + b2.m);
  var nvy1 = ((b1.m - b2.m) * b1.vy + 2 * b2.m * b2.vy) / (b1.m + b2.m);
  var nvx2 = ((b2.m - b1.m) * b2.vx + 2 * b1.m * b1.vx) / (b1.m + b2.m);
  var nvy2 = ((b2.m - b1.m) * b2.vy + 2 * b1.m * b1.vy) / (b1.m + b2.m);
  b1.vx = nvx1;
  b1.vy = nvy1;
  b2.vx = nvx2;
  b2.vy = nvy2;
};

BubbleBox.prototype.isCollide = function(b1, b2){
  var distance = Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2);
  var threshold = Math.pow(b1.r + b2.r, 2);
  return distance < threshold;
};
