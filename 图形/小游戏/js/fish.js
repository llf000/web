class Fish extends Sprite {
  // 用type区分不同鱼
  constructor(type, x = 0, y = 0, rotation = 0) {
    if (type > 5 || type < 1) {
      throw new Error(`unkonw fish type`);
    }
    const SIZE = [
      // 第0个鱼空出来
      null,
      { w: 55, h: 37, r: 12 },
      { w: 78, h: 64, r: 18 },
      { w: 72, h: 56, r: 15 },
      { w: 77, h: 59, r: 15 },
      { w: 107, h: 122, r: 23 },
    ];
    // 调用父类构造函数
    super(
      new DrawRect(_imgs[`fish${type}`], 0, 0, SIZE[type].w, SIZE[type].h),
      x,
      y,
      rotation
    );

    // 子类相关的
    this.type = type;
    // 到哪一帧了
    this.curFrame = 0;
    // 默认最大帧数 4，因为鱼的形态只有4种
    this.MAX_FRAME = 4;
    // 鱼的帧频5，每5帧换动画，不然鱼摆尾太快
    this.frameRate = 5;
    // 给个随机速度
    this.speed = rnd(1, 4);

    this.radius = SIZE[type].r;
    // 鱼是不是已经死了
    this.isDead = false;
  }

  draw(ctx) {
    // 鱼往左游 上下翻转 不然影子在上面了
    if (this.rotation == -90) {
      this.scaleY = -1;
    }
    // 画的时候就旋转90度 鱼的素材是朝向右的，而其他素材都是朝上的
    this.rotation -= 90;
    // 如果鱼已经死了，就换下4帧
    if (this.isDead) {
      this.curFrame += 4;
    }

    super.draw(ctx);

    if (this.isDead) {
      this.curFrame -= 4;
    }
    this.rotation += 90;

    if (this.rotation == -90) {
      this.scaleY = 1;
    }
  }
}
