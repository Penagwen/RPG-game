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

const bosses = [
    {
        name: "Gatekeeper",
        level: 10,
        health: 100,
        defence: 0,
        mana: 100,
        damage: 10,
        magicDamage: 0,
        attacks: [
            ""
        ],
        drops: {
            GOLD: Math.floor(Math.random()*70)+30,
            ITEM: "SLASH"
        }
    },
];



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


Update();
