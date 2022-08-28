window.onload = function () {
  let oC = document.querySelector(".canvas1");
  let ctx = oC.getContext("2d");

  const W = oC.width,
    H = oC.height;
  loadImgs(_resources, function (imgs) {
    // 炮台
    let tower = new Sprite(new DrawRect(_imgs.bottom, 0, 0, 756, 71));
    tower.x = 400;
    tower.y = H - 71 / 2 + 1;
    console.log(tower);
    // 炮
    let cannon = new Cannon(1);
    cannon.x = 443;
    cannon.y = 574;

    // 让炮跟着鼠标转
    oC.onmousemove = function (ev) {
      let a = ev.offsetX - cannon.x;
      let b = ev.offsetY - cannon.y;
      // 让炮的角度加90度：网页0度在x轴右，现在炮的0度在y轴
      let ang = a2d(Math.atan2(b, a)) + 90;
      cannon.rotation = ang;
    };
    let fish1 = new Fish(1);
    // 在(200,150)处画小鱼
    fish1.x = 200;
    fish1.y = 150;

    let tick = 0;
    // 定时器做法 不太好
    /*
    setInterval(function () {
      ctx.clearRect(0, 0, oC.width, oC.height);

      fish1.x++;

      fish1.draw(ctx);

      tick++;
      if (tick == 10) {
        tick = 0;
        fish1.nextFrame();
      }
    }, 16)
    */
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, oC.width, oC.height);

      tower.draw(ctx);
      cannon.draw(ctx);

      fish1.x++;
      fish1.draw(ctx);
      tick++;
      if (tick == 10) {
        tick = 0;
        fish1.nextFrame();
      }
    }
    requestAnimationFrame(animate);
  });
};
