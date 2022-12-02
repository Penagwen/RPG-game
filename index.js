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
        PUNCH: {
            damage: 10
        }
    },

    Magic: {

    },

    Buff: {

    },

    Debuff: {
        ROAR: {
            damage: "-25%"
        }
    }
}

const bosses = {
    "Darkness Flame": {
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
            ITEM: "SLASH"
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

    spawn(){
        console.log(this.name);
        document.querySelector(".boss-screen .boss-image").style.backgroundImage = `url("./Frontview\ Batch\ Battlers/${this.name}.png")`;
    }
}

let currBoss = 0;

let enemy = new Boss(Object.keys(bosses)[currBoss]);
enemy.spawn();
Update();
