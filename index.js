let player = {    
    GOLD: 0,
    EXP: 0,
    LEVEL: 0,

    invintory: [],

    hotbar: ["PUNCH", "POSION", "POSION DART"],

    drawinvintory(){
        Object.values(document.querySelector(".hotbar .moves").children).forEach((el, index) => {
            el.innerHTML = `<span style="display: block; min-width: 100%; min-height: 100%;">${player.hotbar[index] == undefined ? "" : player.hotbar[index]}</span>`;
        })
    },

    MAXHEALTH: 100,
    DEFENCE: 10,
    DAMAGE: 10,
    MAXMANA: 100,
    MAGICDAMAGE: 10,

    HEALTH: 100,
    MANA: 100
}

let expToNextLevel = 100;

const attacks = {
    // Physical
    "PUNCH": {
        damage: 10,
    },
    "BITE": {
        damage: 20,
    },
    "STOMP": {
        damage: 15,
    },
    "CHARGE": {
        damage: 30,
        recoil: 10,
    },
    "WHIP": {
        damage: 25,
    },

    // Magic
    "POSION DART": {
        damage: 5,
        mana: 10,
        debuff: "POSION"
    },
    "POSION MUCUS": {
        damage: 10,
        mana: 25,
        debuff: "POSION"
    },

    // Buff


    // Debuff
    "ROAR": {
        damage: "-25%"
    },
    "INTIMIDATE": {
        defence: "-10%"
    },
    "POSION": {
        DPS: "2"
    },
    "TRAP": {
        stun: "2"
    },
}

const bosses = {
    "Dragons Scarlet Wyrm": {
        level: 10,
        health: 100,
        defence: 0,
        mana: 100,
        damage: 10,
        magicDamage: 0,
        bossAttacks: [
            "PUNCH",
            "ROAR"
        ],
        drops: {
            GOLD: Math.floor(Math.random()*70)+30,
            EXP: Math.floor(Math.random()*50)+150,
            ITEM: "SLASH"
        }
    },
    "Cerberus Ptolemaios": {
        level: 15,
        health: 180,
        defence: 20,
        mana: 70,
        damage: 20,
        magicDamage: 20,
        bossAttacks: [
            "BITE",
            "ROAR",
            "STOMP"
        ],
        drops: {
            GOLD: Math.floor(Math.random()*60)+50,
            EXP: Math.floor(Math.random()*70)+180,
            ITEM: "INTIMIDATE",
            ITEM: "CHARGE"
        }
    },
    "Toxic Root B": {
        level: 20,
        health: 150,
        defence: 50,
        mana: 200,
        damage: 10,
        magicDamage: 25,
        bossAttacks: [
            "WHIP",
            "POSION DART",
            "POSION MUCUS",
        ],
        drops: {
            GOLD: Math.floor(Math.random()*100)+80,
            EXP: Math.floor(Math.random()*250)+350,
            ITEM: "POSION DART",
            ITEM: "TRAP",
        }
    },
    "Boss Hades": {
        level: 999,
        health: 100000,
        defence: 100,
        mana: 100000,
        damage: 10000,
        magicDamage: 10000,
        bossAttacks: [
            "DEATH"
        ],
        drops: {
            ITEM: "WIN",
        }
    }
};

function Update(){
    requestAnimationFrame(Update);

    Object.values(document.querySelector(".stats-window").children).forEach((el) => {
        if(el.id != ""){
            if(el.id == "exp"){ 
                el.innerHTML = `
                    <div class="exp-percentage" style="width: ${(player[el.id.toUpperCase()]/expToNextLevel)*100}%;"></div>
                    <p>EXP ${player[el.id.toUpperCase()]}/${expToNextLevel}</p>
                `
            }else{
                el.innerHTML = el.id +": "+ player[el.id.toUpperCase()];
            }
        }
    })

    // Player
    document.querySelector(".curr-player-stats .player-healthbar .player-health").style.width = `${(player.HEALTH/player.MAXHEALTH)*100}%`;
    document.querySelector(".curr-player-stats .player-manabar .player-mana").style.width = `${(player.MANA/player.MAXMANA)*100}%`;
    document.querySelector(".curr-player-stats .player-healthbar .player-health span").innerHTML = `${player.HEALTH}/${player.MAXHEALTH}`;
    document.querySelector(".curr-player-stats .player-manabar .player-mana span").innerHTML = `${player.MANA}/${player.MAXMANA}`;

    if(enemy.health <= 0){ 
        enemy.endScreen();
        currBoss ++;
        enemy = new Boss(Object.keys(bosses)[currBoss]);
    }
    enemy.update();
}

class Boss{
    constructor(name){
        this.name = name;
        this.level = bosses[name].level;
        this.health = bosses[name].health;
        this.defence = bosses[name].defence;
        this.mana = bosses[name].mana;
        this.damage = bosses[name].damage;
        this.magicDamage = bosses[name].magicDamage;
        this.attacks = bosses[name].bossAttacks;
        this.drops = bosses[name].drops;
    }

    draw(){
        document.querySelector(".boss-screen .boss-image").src = `./Frontview\ Batch\ Battlers/${this.name}.png`;
        document.querySelector(".boss-screen .boss-healthbar .boss-health").style.width = `${(this.health/bosses[this.name].health)*(document.querySelector(".boss-screen .boss-healthbar").clientWidth)}px`;
        document.querySelector(".boss-screen .boss-level").innerHTML = `Level: ${this.level}`;
    }

    update(){
        document.querySelector(".boss-screen .boss-healthbar .boss-health").style.width = `${(this.health/bosses[this.name].health)*(document.querySelector(".boss-screen .boss-healthbar").clientWidth)}px`;
    }

    endScreen(){
        document.querySelector(".boss-screen .boss").style.display = "none";
        
    }
}

let currBoss = 3;
let enemy = new Boss(Object.keys(bosses)[currBoss]);
enemy.draw();
player.drawinvintory();


window.onmousemove = (e) => {
    let el = e.target.parentNode.className;
    if(el.indexOf("slot") > -1){
        let item = player.hotbar[el.substring(9, el.length)-1];
        if(!!item){
            document.querySelector(".hotbar .description").innerHTML = `
                <span style="text-align: center; text-decoration: underline; width: 100%; display: inline-block;">${item}</span>
                <span style="text-align: center; width: 100%; display: inline-block;>${Object.values(attacks[item])}</span>
            `;
            return;
        }
    }
    document.querySelector(".hotbar .description").replaceChildren();
}


Update();
 
