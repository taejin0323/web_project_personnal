let canvas_1 = document.getElementById('canvas_1');
let ctx_1 = canvas_1.getContext('2d');
canvas_1.width = window.innerWidth;
canvas_1.height = window.innerHeight-50;


function dropLetters(){
  if (Math.random() < letter.probability) {
    let x = Math.random() * (canvas_1.width-400) + 200;
    let y = 0;
    let speed = letter.lowestSpeed + Math.random() * (letter.highestSpeed - letter.lowestSpeed);

    letters.push({
      x,
      y,
      code: Math.floor(Math.random()*htmlList.length),
      //Math.random() < 0.5 ? Math.floor(Math.random() * 25 + 65) : Math.floor(Math.random() * 25 + 97),
      speedX: 0,
      speedY: Math.random()*3
    });
  }
}

function removeLetters_1(frames){
  for (let l of letters) {
    localStorage.setItem(lives, score);
    if (l.y>canvas_1.height) {
      if (--lives === 0) {
        window.alert('GAME OVER!');
        window.location.reload(false);
      } else if (lives > 0) {
        window.alert('START AGAIN!');
        letters = [];
        score=0;
      }
      break;
    } else {
      l.x += l.speedX * frames;
      l.y += l.speedY * frames;
    }
  }
}

function draw_1() {
  let now = getTime();
  let ms = now - then;
  let frames = 0;
  then = now;
  if (ms < 1000) {
    acc += ms;
    while (acc >= FRAME_DURATION) {
      frames++;
      acc -= FRAME_DURATION;
    }
  } else {
    ms = 0;
  }

  ctx_1.clearRect(0, 0, canvas_1.width, canvas_1.height);
  ctx_1.font = letter.font;
  ctx_1.fillStyle = letter.color;
  for (let l of letters) {
    ctx_1.fillText(htmlList[l.code], l.x, l.y);
  }
  ctx_1.font = label.font;
  ctx_1.fillStyle = label.color;
  ctx_1.fillText('Score: ' + score, 10, label.margin+20);
  ctx_1.fillText('Lives: ' + lives, canvas_1.width - 130, label.margin+20);
  ctx_1.fillText('Your input: ' + keysDown, canvas_1.width/2 - 400, canvas_1.height-50);

  dropLetters();
  removeLetters_1(frames);
  window.requestAnimationFrame(draw_1);
}


function game_1() {
  document.getElementById("frame_game").style.display = "none";
  document.getElementById("rain_game").style.display = "block";
  document.getElementById("canvas_1").style.display = "block";
  draw_1();
  document.addEventListener('keydown', keyDownHandler);
  window.addEventListener('resize', resizeHandler);
}
