let player = {  
    GOLD: 0,
    EXP: 0,
    LEVEL: 0,

    invintory: [],

    hotbar: [],

    MAXHEALTH: 100,
    DEFENCE: 10,
    DAMAGE: 10,
    MAXMANA: 100,
    MAGICDAMAGE: 10
}

let expToNextLevel = 100;

const attacks = {
    Phisical: {
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
        }
    },

    Magic: {
        "POSION DART": {
            damage: 5,
            debuff: "POSION"
        },
        "POSION MUCUS": {
            damage: 10,
            debuff: "POSION"
        },
    },

    Buff: {

    },

    Debuff: {
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
        }
    }
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
};

function Update(){
    //requestAnimationFrame(Update);

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

    update(){
        console.log(this.name);
        document.querySelector(".boss-screen .boss-image").style.backgroundImage = `url("./Frontview\ Batch\ Battlers/${this.name}.png")`;
        document.querySelector(".boss-screen .boss-healthbar .boss-health").style.width = `${(this.health/bosses[this.name].health)*100}%`;
        document.querySelector(".boss-screen .boss-level").innerHTML = `Level: ${this.level}`;
    }

    endScreen(){
        document.querySelector(".boss-screen .boss").style.display = "none";
        
    }
}

let currBoss = 0;
let enemy = new Boss(Object.keys(bosses)[currBoss]);

Update();
