class Sprite {
  constructor(drawRect, x = 0, y = 0, rotation = 0) {
    if (!(drawRect instanceof DrawRect)) {
      throw new Error(`img must be a DrawRect`);
    }

    this.setDrawRect(drawRect);
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    // 速度：小鱼游的速度，炮弹飞的速度，金币进框的速度
    this.speed = 0;
    // 动画：换帧图片
    // 最大帧数
    this.MAX_FRAME = 0;
    // 当前帧数
    this.curFrame = 0;

    this.scaleX = 1;
    this.scaleY = 1;
    // 帧频
    this.frameRate = 1;
    this.frameRateNow = 0;
    // 给个半径（小鱼、炮弹），做碰撞检测用
    this.radius = 0;
  }

  setDrawRect(drawRect) {
    this.drawRect = drawRect;
    this.width = drawRect.sw;
    this.height = drawRect.sh;
  }

  nextFrame() {
    this.frameRateNow++;

    if (this.frameRateNow == this.frameRate) {
      this.frameRateNow = 0;

      this.curFrame++;
      if (this.curFrame >= this.MAX_FRAME) {
        this.curFrame = 0;

        return true;
      }
      return false;
    }
  }
  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(d2a(this.rotation));
    ctx.scale(this.scaleX, this.scaleY);

    ctx.drawImage(
      this.drawRect.img,
      this.drawRect.sx,
      // 实现动画
      this.drawRect.sy + this.height * this.curFrame,
      this.width,
      this.height,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    ctx.restore();
  }

  inRect(x, y) {
    if (
      this.x - this.width / 2 <= x &&
      x <= this.x + this.width / 2 &&
      this.y - this.height / 2 <= y &&
      y <= this.y + this.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
  // 离开屏幕了，出圈了：炮弹、小鱼出圈要销毁
  outOfRect(x, y, w, h) {
    if (this.x < x || this.y < y || this.x > x + w || this.y > y + h) {
      return true;
    } else {
      return false;
    }
  }
  // 移动：炮弹、小鱼、金币都要动
  move(x, y) {
    // 如果参数的长度等于0，没有参数，继续自由运动：小鱼、炮弹
    if (arguments.length == 0) {
      let x_speed = this.speed * Math.sin(d2a(this.rotation));
      let y_speed = this.speed * Math.cos(d2a(this.rotation));

      this.x += x_speed;
      // -=是因为数学跟canvasY轴方向相反
      this.y -= y_speed;
    } else {
      // 有参数，朝着参数方向运动，10是速度可以调：金币，从生成点向左下方金币框运动
      this.x += (x - this.x) / 10;
      this.y += (y - this.y) / 10;
    }
  }

  // 碰撞检测:两个点之间的距离小于对应两个圆心之间的距离，说明碰上了
  collTest(other) {
    return (
      Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)) <
      this.radius + other.radius
    );
  }
}
