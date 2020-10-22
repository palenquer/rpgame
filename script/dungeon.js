var defButton = document.getElementsByClassName("defense");
var atkButton = document.getElementsByClassName("attack");
var showTurn = document.querySelector(".turntext");
var showEnemyHp = document.querySelector(".enemyhp");
var showEnemyAtk = document.querySelector(".enemyatk");
var showEnemyDef = document.querySelector(".enemydef");
var showHp = document.querySelector(".playerhp");
var showAtk = document.querySelector(".playeratk");
var showDef = document.querySelector(".playerdef");
var showGold = document.querySelector(".playergold");
var intentAttack = document.getElementById('intentAttack');
var intentDefense = document.getElementById('intentDefense');
var healthPlayer = document.getElementById('health');
var healthEnemy = document.getElementById('enemyhealth');
var turn = 1;
var trocaAtk;
var trocaDef;
var atkordef;
var nickname;
var randomEnemy;
var player = {
  name: "",
  level: 1,
  hp: 20,
  atk: 5,
  def: 5,
  gold: 0,
  exp: 0,
};
var enemy = [
  {
    enemy: "Slime",
    level: 1,
    hp: 10,
    atk: 5,
    def: 5,
    gold: 0,
    exp: 0,
  },
  {
    enemy: "Rat",
    level: 10,
    hp: 10,
    atk: 5,
    def: 5,
    gold: 0,
    exp: 0,
  },
];

function changeTurn(){
  if (enemy[randomEnemy].hp > 0) {
    turn++;
  } else {
    turn = 1;
  }
  document.getElementsByClassName("turntext").innerHTML = showTurn;
  showTurn.textContent = "TURN " + turn;
}
function enemyIntent() {
  if (atkordef == 0){
    intentAttack.style.visibility = "visible";
    intentDefense.style.visibility = "hidden";
  }
  else {
    intentDefense.style.visibility = "visible";
    intentAttack.style.visibility = "hidden";
  }
}
function spawnEnemy(){
  if (enemy[randomEnemy].hp <= 0){
    enemyhealth.value = 10;
    player.gold += enemy[randomEnemy].gold;
    document.getElementsByClassName("playergold").innerHTML = player.gold;
    showGold.textContent = "Gold:" + player.gold;
    player.exp += enemy[randomEnemy].exp;
    randomEnemies();
  }
}
function enemyCombat() {
  atkordef = random(0, 1);
}
function pressDefense() {
  if (atkordef == 0) {
    if (player.def >= enemy[randomEnemy].atk) {
      player.hp = player.hp;
    } else {
        player.hp = player.hp - (enemy[randomEnemy].atk - player.def);
      }
  }
  enemyCombat();
  enemyIntent();
  document.getElementsByClassName("playerhp").innerHTML = player.hp;
  showHp.textContent = "HP:" + player.hp;
  document.getElementsByClassName("enemyhp").innerHTML = enemy[randomEnemy].hp;
  showEnemyHp.textContent = "HP:" + enemy[randomEnemy].hp;
  if (player.hp <= 0) {
    location.replace("menu.html");
  }
  changeTurn();
}
function pressAttack() {
  if (atkordef == 0) {
    enemyhealth.value -= player.atk;
    enemy[randomEnemy].hp -= player.atk;
    player.hp -= enemy[randomEnemy].atk;
    health.value -= enemy[randomEnemy].atk;
  } else if (atkordef == 1) {
      enemy[randomEnemy].hp =
      enemy[randomEnemy].hp - (player.atk - enemy[randomEnemy].def);
      enemyhealth.value -= (player.atk - enemy[randomEnemy].def);
  }
  enemyCombat();
  enemyIntent();
  document.getElementsByClassName("playerhp").innerHTML = player.hp;
  showHp.textContent = "HP:" + player.hp;
  console.log(player.hp);
  if (player.hp <= 0) {
    location.replace("menu.html");
  }
  changeTurn();
  spawnEnemy();
  document.getElementsByClassName("enemyhp").innerHTML = enemy[randomEnemy].hp;
  showEnemyHp.textContent = "HP:" + enemy[randomEnemy].hp;
}

function levelup() {
  for (let j = 0; player.exp >= 100; j++) {
    player.level += 1;
    player.exp -= 100;
    console.log(player.name + " LEVEL UP!");
  }
  for (let i = 1; i < player.level; i++) {
    player.hp += random(3, 5);
    player.atk += random(1, 2);
    player.def += random(1, 2);
  }
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomEnemies() {
  randomEnemy = random(0, enemy.length - 1);
  enemy[randomEnemy].hp = 10;
  enemy[randomEnemy].gold = random(3, 10);
  enemy[randomEnemy].exp = random(10, 20);
  for (let i = enemy[randomEnemy].level; i < player.level; i++) {
    enemy[randomEnemy].level++;
    enemy[randomEnemy].hp += random(3, 5);
    enemy[randomEnemy].atk += random(1, 2);
    enemy[randomEnemy].def += 1;
    enemy[randomEnemy].gold += random(1, 2);
  }
  trocaAtk = enemy[randomEnemy].atk;
  trocaDef = enemy[randomEnemy].def;
}
randomEnemies();
enemyCombat();
enemyIntent();
showEnemyHp.textContent = "HP:" + enemy[randomEnemy].hp;
showEnemyAtk.textContent = "ATK:" + enemy[randomEnemy].atk;
showEnemyDef.textContent = "DEF:" + enemy[randomEnemy].def;
showHp.textContent = "HP:" + player.hp;
showDef.textContent = "DEF:" + player.def;
showAtk.textContent = "ATK:" + player.atk;
showGold.textContent = "GOLD:" + player.gold;
showTurn.textContent = "TURN " + turn;
player.name = nickname;
