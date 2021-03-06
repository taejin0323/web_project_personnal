let canvas = document.getElementById('canvas_2');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-50;

const getTime = typeof performance === 'function' ? performance.now : Date.now;
const FRAME_DURATION = 1000 / 58;
let then = getTime();
let acc = 0;
/*
FPSMeter.theme.colorful.container.height = '40px';
let meter = new FPSMeter({
  left: canvas.width - 130 + 'px',
  top: 'auto',
  bottom: '12px',
  theme: 'colorful',
  heat: 1,
  graph: 1
});
*/

let score = 0;
let lives = 5;

let center = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 25,
  color: '#87CEEB'
};

let letter = {
  font: '20px Arial',
  color: '#B22222',
  size: 30,
  highestSpeed: 1.6,
  lowestSpeed: 0.6,
  probability: 0.02
};

let particle = {
  alpha: 0.5,
  decrease: 0.05,
  highestRadius: 5,
  highestSpeedX: 5,
  highestSpeedY: 5,
  lowestRadius: 2,
  lowestSpeedX: -5,
  lowestSpeedY: -5,
  total: 50
};

let label = {
  font: '30px Arial',
  color: '#0095DD',
  margin: 20
};

let letters = [];
let particles = [];
var keysDown = new Array();
var ck=0;
var key = new Array();
var word2;



function draw () {
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
  //meter.tick();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle(center);
  ctx.font = letter.font;
  ctx.fillStyle = letter.color;
  for (let l of letters) {
    ctx.fillText(htmlList[l.code], l.x, l.y);
  }
  for (let p of particles) {
    drawCircle(p);
  }
  ctx.font = label.font;
  ctx.fillStyle = label.color;
  ctx.fillText('Score: ' + score, 10, label.margin + 20);
  ctx.fillText('Lives: ' + lives, canvas.width - 130, label.margin + 20);
  ctx.fillText('Your input: ' + keysDown, canvas_1.width/2 - 400, canvas_1.height-50);
  /* text 용
  ctx.fillText('Text: ' + keysDown + ' ' + word2, 10, label.margin+40);
  ctx.fillText('ck: ' + ck +' ' + keysDown + ' ' + key, 10, label.margin+60);
  */
  processParticles(frames);
  createLetters();
  removeLetters(frames);
  window.requestAnimationFrame(draw);
}

function drawCircle (c) {
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
  ctx.fillStyle = c.color;
  ctx.fill();
  ctx.closePath();
}

function processParticles (frames) {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.speedX * frames;
    p.y += p.speedY * frames;
    p.radius -= particle.decrease;
    if (p.radius <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
      particles.splice(i, 1);
    }
  }
}

function createLetters () {
  if (Math.random() < letter.probability) {
    let x = Math.random() < 0.5 ? 0 : canvas.width;
    let y = Math.random() * canvas.height;
    let dX = center.x - x;
    let dY = center.y - y;
    let norm = Math.sqrt(dX ** 2 + dY ** 2);
    let speed = letter.lowestSpeed + Math.random() * (letter.highestSpeed - letter.lowestSpeed);

    letters.push({
      x,
      y,
      code: Math.floor(Math.random()*htmlList.length),
      //Math.random() < 0.5 ? Math.floor(Math.random() * 25 + 65) : Math.floor(Math.random() * 25 + 97),
      speedX: dX / norm * speed,
      speedY: dY / norm * speed
    });
  }
}

function removeLetters (frames) {
  for (let l of letters) {
    if (intersects(l.x, l.y, letter.size, letter.size, center.x, center.y, center.radius, center.radius)) {
      localStorage.setItem(lives, score);
      if (--lives === 0) {
        window.alert('GAME OVER!');
        window.location.reload(false);
      } else if (lives > 0) {
        window.alert('START AGAIN!');
        letters = [];
        particles = [];
        score=0;
      }
      break;
    } else {
      l.x += l.speedX * frames;
      l.y += l.speedY * frames;
    }
  }
}

function generateRandomRgbColor () {
  return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
}

function intersects (x1, y1, w1, h1, x2, y2, w2, h2) {
  return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
}

function type (i, l) {
  letters.splice(i, 1);
  score+=100;
  for (let j = 0; j < particle.total; j++) {
    let c = generateRandomRgbColor();
    particles.push({
      x: l.x,
      y: l.y,
      radius: particle.lowestRadius + Math.random() * (particle.highestRadius - particle.lowestRadius),
      color: 'rgba(' + c[0] + ', ' + c[1] + ', ' + c[2] + ', ' + particle.alpha + ')',
      speedX: particle.lowestSpeedX + Math.random() * (particle.highestSpeedX - particle.lowestSpeedX),
      speedY: particle.lowestSpeedY + Math.random() * (particle.highestSpeedY - particle.lowestSpeedY)
    });
  }
}

function keyDownHandler (e) {
  var word = String.fromCharCode(e.keyCode+32);
  word2 = e.keyCode;
  keysDown += word;

  for (let i = letters.length - 1; i >= 0; i--) {
    key = htmlList[letters[i].code];
    var l = letters[i].code;

    if(keysDown.localeCompare(key)==0) {
      type(i, l);
      keysDown = [];
      return;
    }else if (keysDown.localeCompare(key)!=0 && e.keyCode==13){
      keysDown = [];
      score-=100;
      break;
    }
  }
}

function resizeHandler () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  center.x = canvas.width / 2;
  center.y = canvas.height / 2;
}

function game_2() {
  document.getElementById("frame_game").style.display = "none";
  document.getElementById("defence_game").style.display = "block";
  document.getElementById("canvas_2").style.display = "block";
  draw();
  document.addEventListener('keydown', keyDownHandler);
  window.addEventListener('resize', resizeHandler);
}

function endGame() {
  window.location.reload(false);
}

function nextPage() {
  document.getElementById("frame_intro").style.display = "none";
  document.getElementById("frame_game").style.display = "block";
}
/*
function viewRecord() {
  document.getElementById("frame_intro").style.display = "none";
  document.getElementById("view_record").style.display = "block";

  var board = document.getElementById("score_board");

  board.innerHTML = loaclStorage.getItem("5");
}
*/
