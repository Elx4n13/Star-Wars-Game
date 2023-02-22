const characters = [
    {
        id: 1,
        name: 'Obi-Wan',
        img: './assets/images/obi-wan.jpg',
        health: 100
    },
    {
        id: 2,
        name: 'Luke Sky',
        img: './assets/images/luke-skywalker.jpg',
        health: 130
    },
    {
        id: 3,
        name: 'Darth Sidious',
        img: './assets/images/darth-sidious.png',
        health: 150
    },
    {
        id: 4,
        name: 'Darth Maul',
        img: './assets/images/darth-maul.jpg',
        health: 170
    }
]
const characterSection = document.querySelector("#characters-section")
const selectedSection = document.querySelector('#selected-character-section')
const defenderSection = document.querySelector('#available-to-attack-section')
const actionSection = document.querySelector("#action .character-section")
const gameInfo = document.querySelector('#game-message')
const attackButton = document.querySelector('#attack-button')
attackButton.addEventListener('click', () => {
    if (attacker !== '' && defender !== '') {
        getAttack()
    }
})
let attacker = ''
let defender = ''
let defenderList = []
function getInfo(item) {
    let characterName = document.createElement("h2")
    characterName.className = 'character-name'
    characterName.innerHTML = item.name
    let characterImg = document.createElement('img')
    characterImg.src = item.img
    characterImg.className = 'character-image'
    let characterHealth = document.createElement('p')
    characterHealth.innerHTML = item.health
    characterHealth.className = 'character-health'
    let character = document.createElement('div')
    character.className = 'character'
    character.append(characterName, characterImg, characterHealth)
    return character
}
function getDom(characters) {
    characters.forEach(item => {
        let character = getInfo(item)
        characterSection.append(character)
        character.addEventListener('click', () => {
            characterSection.innerHTML = ''
            attacker = item
            getSelected(attacker)
            getDefenderListDom(attacker, characters)
        })
    })
}

function getSelected(attacker) {
    let character = getInfo(attacker)
    character.setAttribute('id', 'selected-character')
    selectedSection.innerHTML = '<div class="section-title">Your Character</div>'
    selectedSection.append(character)
}
function getDefenderListDom(character, list) {
    defenderList = list.filter(item => item.id !== character.id)
    defenderSection.innerHTML = '<div class="section-title">Enemies Available To Attack</div>'
    defenderList.forEach(item => {
        let character = getInfo(item)
        defenderSection.append(character)
        character.addEventListener('click', () => {
            if (defender === '') {
                defender = item
                getDefenderListDom(item, defenderList)
                getDefender(item)
            }
        })
    })
}
function getDefender(defender) {
    let character = getInfo(defender)
    actionSection.innerHTML = '<div class="section-title">Defender</div>'
    actionSection.append(character)
}
function getAttack() {
    let attackerPoint = Math.floor(Math.random() * 40)
    let defenderPoint = 0
    if (defender.health > attacker.health) {
        defenderPoint = Math.floor(Math.random() * ((attackerPoint + 20) - attackerPoint) + attackerPoint);
    }
    else {
        defenderPoint = Math.floor(Math.random() * attackerPoint);
    }
    gameInfo.innerHTML = `
    <p>You attacked ${defender.name} for ${attackerPoint} damage</p>
    <p>${defender.name} attacked you for ${defenderPoint} damage</p>

    `
    defender.health -= attackerPoint
    attacker.health -= defenderPoint
    if (defender.health > 0 && attacker.health > 0) {
        getDefender(defender)
        getSelected(attacker)
    }
    else if (defender.health < 0 && attacker.health > 0) {
        actionSection.innerHTML = `
        <div class="section-title">Defender</div>
        <p>You have defeated ${defender.name},you can choose to fight another enemy</p>
        `
        defender = ''
    }
    else {
        attacker = ''
        selectedSection.innerHTML = ''
        actionSection.innerHTML = `
        <h2>GAME OVER</h2>
        <button class='resetButton'>reset</button>
        `
        document.querySelector('.resetButton').addEventListener('click', resetGame)
    }

}
function resetGame() {
    location.reload()
    defender = ''
    attacker = ''
    defenderList = []
}
getDom(characters)