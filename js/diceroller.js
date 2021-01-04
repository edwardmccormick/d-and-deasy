"use strict"


/* Events fired on the drag target */

document.addEventListener("dragstart", function(event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    event.dataTransfer.setData("Text", event.target.id);


    // Change the opacity of the draggable element and add a red border
    event.target.style.opacity = "0.4";
    event.target.style.border = "3px dotted red";
});


// Finished dragging - reset the opacity and border
document.addEventListener("dragend", function(event) {
        event.target.style.opacity = "1";
    event.target.style.border = "";
});

/* Events fired on the drop target */

// When the draggable element enters the droptarget, change the DIVS's border style
document.addEventListener("dragenter", function(event) {
    if ( event.target.className == "droptarget" ) {
        event.target.style.border = "3px dotted red";
    }
});

// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

// When the draggable p element leaves the droptarget, reset the DIVS's border style
document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "droptarget" ) {
        event.target.style.border = "";
    }
});

/* On drop - Prevent the browser default handling of the data (default is open as link on drop)
   Reset the color of the output text and DIV's border color
   Get the dragged data with the dataTransfer.getData() method
   The dragged data is the id of the dragged element
   Append the dragged element into the drop element
*/
document.addEventListener("drop", function(event) {
    event.preventDefault();
    if ( event.target.className == "droptarget" ) {

        event.target.style.border = "";
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
    }
});

function roll(x) {
    return Math.floor(Math.random() * (x))+1;
}

function rolls(x,y) {
    var output = []
    for (var i = 0; i < x; i++) {
        output.push(roll(y));
    }
    return output
}

function idLowest(output,z) {
    var lowest = []
    for (var i=0; i<z; i++) {
        lowest.push(output.splice(output.indexOf(Math.min(...output)),1))
    }
    return lowest
}

// so to roll 4d6 drop lowest rolls(4,6,1) will generate an array, and then results.reduce(function(total,num) {return total += num},0) will return the total of the three rolls

var profBonus = 2;

function calculateProf() {
   if (parseInt(document.getElementById('pcLevel').value) > 16) {profBonus = 6}
    else if (parseInt(document.getElementById('pcLevel').value) > 12) {profBonus = 5}
   else if (parseInt(document.getElementById('pcLevel').value) > 8) {profBonus = 4}
   else if (parseInt(document.getElementById('pcLevel').value) > 4) {profBonus = 3}
   else if (parseInt(document.getElementById('pcLevel').value) <= 4) {profBonus = 2}
    document.getElementById('profBonus').innerHTML = "+ " + profBonus;
}

// function updateCharacter() {
//     character.strength = parseInt(characterStrength.value);
//     character.dexterity = parseInt(characterDexterity.value);
//     character.constitution = parseInt(characterConstitution.value);
//     character.intelligence = parseInt(characterIntelligence.value);
//     character.wisdom = parseInt(characterWisdom.value);
//     character.charisma = parseInt(characterCharisma.value);
//     characterCreation();
// }

function pointBuyCreation() {
    var characterCost = 0;
    var attributes = [strPointBuy, dexPointBuy, conPointBuy, intPointBuy, wisPointBuy, chaPointBuy]
    for (var i = 0; i < attributes.length; i++) {
        if (attributes[i].value == 9) {characterCost++}
        else if (attributes[i].value == 10) {characterCost += 2}
        else if (attributes[i].value == 11) {characterCost += 3}
        else if (attributes[i].value == 12) {characterCost += 4}
        else if (attributes[i].value == 13) {characterCost += 5}
        else if (attributes[i].value == 14) {characterCost += 7}
        else if (attributes[i].value == 15) {characterCost += 9}
            }
    pointTotals.innerHTML = characterCost + "/" + characterCostGoal;
}



var character = {};

var characterCostGoal = 27;

var artificerskills = [2, "arcana", "history", "investigation", "medicine", "nature", "perception", "sleightofhand"]

var barbarianskills = [2, "animalhandling", "athletics", "intimidation", "nature", "perception", "survival"]

var bardskills = [3, "acrobatics", "athletics", "arcana", "deception", "insight", "intimidation", "investigation", "nature", "perception", "performance", "persuasion", "religion", "sleightofhand", "stealth"]

var clericskills = [2, "history", "insight", "medicine", "persuasion", "religion"]

var druidskills = [2, "animalhandling", "arcana", "insight", "medicine", "nature", "perception", "religion", "survival"]

var fighterskills = [2, "acrobatics", "animalhandling", "athletics", "history", "insight", "intimidation", "perception", "survival"]

var monkskills = [2, "acrobatics", "athletics", "history", "insight", "religion", "stealth"]

var paladinskills = [2, "athletics", "insight", "intimidation", "medicine", "persuasion", "religion"]

var rangerskills = [3, "animalhandling", "athletics", "insight", "investigation", "nature", "perception", "stealth", "survival"]

var rogueskills = [4, "acrobatics", "athletics", "deception", "insight", "intimidation", "investigation", "perception", "performance", "persuasion", "sleightofhand", "stealth"]

var sorcererskills = [2, "arcana", "deception", "insight", "intimidation", "persuasion", "religion"]

var warlockskills = [2, "arcana", "deception", "history", "intimidation", "investigation", "nature", "religion"]

var wizardskills = [2, "arcana", "history", "insight", "investigation", "medicine", "religion"]

var allSkills = ["as many as delineated in the homebrew class", "acrobatics", "animalhandling", "arcana", "athletics", "deception", "history", "insight", "intimidation", "investigation", "medicine", "perception", "performance", "persuasion", "religion", "sleightofhand", "stealth", "survival"]

var skillsToPick

var skillsPicked = 0

function parseSkills() {
    for (var i = 1; i < allSkills.length; i++) {
        document.getElementById(allSkills[i]).disabled = true;
        document.getElementById(allSkills[i]).checked = false;
    }
    if (characterClass.value === "Artificer") {var y = artificerskills};
    if (characterClass.value === "Barbarian") {var y = barbarianskills};
    if (characterClass.value === "Bard") {var y = bardskills};
    if (characterClass.value === "Cleric") {var y = clericskills}
    if (characterClass.value === "Druid") {var y = druidskills};
    if (characterClass.value === "Fighter") {var y = fighterskills};
    if (characterClass.value === "Monk") {var y = monkskills};
    if (characterClass.value === "Paladin") {var y = paladinskills};
    if (characterClass.value === "Ranger") {var y = rangerskills};
    if (characterClass.value === "Rogue") {var y = rogueskills};
    if (characterClass.value === "Sorcerer") {var y = sorcererskills};
    if (characterClass.value === "Warlock") {var y = warlockskills};
    if (characterClass.value === "Wizard") {var y = wizardskills};
    if (characterClass.value === "Custom/Homebrew") {var y = allSkills}
    for (var i = 1; i < y.length; i++) {
        document.getElementById(y[i]).disabled = false;
    }
    skillsToPick = y[0]
document.getElementById('numberOfSkills').innerHTML = "<strong> " + skillsPicked + " of " + skillsToPick + " </strong>"
}

function onlyRollThree() {
    diceToDrop.innerText = parseInt(diceToRoll.value) - 3
}


function diceCards(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    diceOutput.innerHTML = ""
    for (var i = 1; i <= attributeRolls.value; i++) {
        var output = rolls(diceToRoll.value, 6)
        // diceOutput.innerHTML += "Array number " + i +" is: " + output + ". Discarding the lowest roll: " + idLowest(output, parseInt(diceToDrop.innerText)) + ". The total for this array is: " + (parseInt(output[0]) + parseInt(output[1]) + parseInt(output [2]) )+ ".<br>"
        var html = '<div class="card border border-primary col-3" id="'+i+'">'
        html += '<div class="card-body">'
        html +=  '<h5 class="card-title">Attribute Roll Number ' + i + '</h5>'

        if (diceToRoll.value == 5 ) {html +=  '<p class="card-text">The output of these rolls are: ' + output + '. The lowest rolls are: ' + idLowest(output, parseInt(diceToDrop.innerText)) + '; dropping those from your total. The total for your rolls are: <h4><span class="badge bg-primary text-center" id="total' + i +'" draggable="true">' + (parseInt(output[0]) + parseInt(output[1]) + parseInt(output [2]) )+ '</span></h4>.</p></div></div>'}
        if (diceToRoll.value == 4 ) {html +=  '<p class="card-text">The output of these rolls are: ' + output + '. The lowest roll: ' + idLowest(output, parseInt(diceToDrop.innerText)) + '; dropping that from your total. The total for these rolls are: <h4><span ' + 'class="badge bg-primary text-center" ' + 'id="total' + i +'" draggable="true">' + (parseInt(output[0]) + parseInt(output[1]) + parseInt(output [2]) )+ '</span></h4>.</p></div></div>'}
        if (diceToRoll.value == 3) {html +=  '<p className="card-text">The output of this array is: ' + output + '. You only rolled three dice, so no dice to drop. The total for these rolls is: <h4><span class="badge bg-primary text-center" id="total' + i +'" draggable="true">' + (parseInt(output[0]) + parseInt(output[1]) + parseInt(output [2]) )+ '</span></h4>.</div></p></div></div>'}
        diceOutput.innerHTML += html
    }
    strRollInput.innerHTML = 'Str';
    dexRollInput.innerHTML = 'Dex';
    conRollInput.innerHTML = 'Con';
    intRollInput.innerHTML = 'Int';
    wisRollInput.innerHTML = 'Wis';
    chaRollInput.innerHTML = 'Cha';
}

function rollCharacterFinalize(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    character.strength = parseInt(strRollInput.innerText.slice(3));
    character.dexterity = parseInt(dexRollInput.innerText.slice(3));
    character.constitution = parseInt(conRollInput.innerText.slice(3));
    character.intelligence = parseInt(intRollInput.innerText.slice(3));
    character.wisdom = parseInt(wisRollInput.innerText.slice(3));
    character.charisma = parseInt(chaRollInput.innerText.slice(3));
    showCharacterStats()
}

function typeCharacterFinalize(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    character.strength = parseInt(strTyped.value);
    character.dexterity = parseInt(dexTyped.value);
    character.constitution = parseInt(conTyped.value);
    character.intelligence = parseInt(intTyped.value);
    character.wisdom = parseInt(wisTyped.value);
    character.charisma = parseInt(chaTyped.value);
    showCharacterStats();
}

function pointBuyCharacterFinalize(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    character.strength = parseInt(strPointBuy.value);
    character.dexterity = parseInt(dexPointBuy.value);
    character.constitution = parseInt(conPointBuy.value);
    character.intelligence = parseInt(intPointBuy.value);
    character.wisdom = parseInt(wisPointBuy.value);
    character.charisma = parseInt(chaPointBuy.value);
    showCharacterStats();
}

function showCharacterStats() {
    var skills = [acrobatics, animalhandling, arcana, athletics, deception, historySkill, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion,sleightOfHand, stealth, survival]
    var skillstext = [acrobaticsText, animalhandlingText, arcanaText, athleticsText, deceptionText, historySkillText, insightText, intimidationText, investigationText, medicineText, natureText, perceptionText, performanceText, persuasionText, religionText, sleightOfHandText, stealthText, survivalText]
    var skillAttribute = [character.dexterity, character.wisdom, character.intelligence, character.strength, character.charisma, character.intelligence, character.wisdom, character.charisma, character.intelligence, character.wisdom, character.intelligence, character.wisdom, character.charisma, character.charisma, character.intelligence, character.dexterity, character.dexterity, character.wisdom]
    var count = 0
    strDisplay.value = character.strength;
    dexDisplay.value = character.dexterity;
    conDisplay.value = character.constitution;
    intDisplay.value = character.intelligence;
    wisDisplay.value = character.wisdom;
    chaDisplay.value = character.charisma;
    for (var i = 0; i < skills.length; i++) {

        if (attributeModifier(skillAttribute[i]) < 0){
        if (skills[i].checked === false) {skillstext[i].innerHTML = "<strong>" + attributeModifier(skillAttribute[i]) + "</strong>"};
        if (skills[i].checked === true) {skillstext[i].innerHTML = "<strong>" + (parseInt(attributeModifier(skillAttribute[i])) + parseInt(profBonus)) + "</strong>";
        count++
        }
        }
        else {
            if (skills[i].checked === false) {skillstext[i].innerHTML = "<strong> +" + attributeModifier(skillAttribute[i]) + "</strong>"};
            if (skills[i].checked === true) {skillstext[i].innerHTML = "<strong> +" + (parseInt(attributeModifier(skillAttribute[i])) + parseInt(profBonus)) + "</strong>";
            count++}
        }

    }
    skillsPicked = count
    document.getElementById('numberOfSkills').innerHTML = "<strong> " + skillsPicked + " of " + skillsToPick + " </strong>"
}

function attributeModifier (x) {
    return Math.floor((x-10)/2)
}
calculateProf()

var proficiencyBonus = document.getElementById('profBonus');
var characterLevel = document.getElementById('pcLevel');
var characterClass = document.getElementById('pcClass');
var strDisplay = document.getElementById('strDisplay')
var dexDisplay = document.getElementById('dexDisplay')
var conDisplay = document.getElementById('conDisplay')
var intDisplay = document.getElementById('intDisplay')
var wisDisplay = document.getElementById('wisDisplay')
var chaDisplay = document.getElementById('chaDisplay')

var strTyped = document.getElementById('strTyped');
var dexTyped = document.getElementById('dexTyped');
var conTyped = document.getElementById('conTyped');
var intTyped = document.getElementById('intTyped');
var wisTyped = document.getElementById('wisTyped');
var chaTyped = document.getElementById('chaTyped');

var strPointBuy = document.getElementById('strpointbuy');
var dexPointBuy = document.getElementById('dexpointbuy');
var conPointBuy = document.getElementById('conpointbuy');
var intPointBuy = document.getElementById('intpointbuy')
var wisPointBuy = document.getElementById('wispointbuy')
var chaPointBuy = document.getElementById('chapointbuy')

var strRollInput = document.getElementById('strinput')
var dexRollInput = document.getElementById('dexinput')
var conRollInput = document.getElementById('coninput')
var intRollInput = document.getElementById('intinput')
var wisRollInput = document.getElementById('wisinput')
var chaRollInput = document.getElementById('chainput')

var rollFinalize = document.getElementById('finalizeassign')
var typedFinalize = document.getElementById('finalizetyped')
var pointBuyFinalize = document.getElementById('finalizepointbuy')

var pointTotals = document.getElementById('creation')

var acrobatics = document.getElementById('acrobatics');
var animalhandling = document.getElementById('animalhandling');
var arcana = document.getElementById('arcana');
var athletics = document.getElementById('athletics');
var deception = document.getElementById('deception');
var historySkill = document.getElementById('history');
var insight = document.getElementById('insight');
var intimidation = document.getElementById('intimidation');
var investigation = document.getElementById('investigation');
var medicine = document.getElementById('medicine');
var nature = document.getElementById('nature');
var perception = document.getElementById('perception');
var performance = document.getElementById('performance');
var persuasion = document.getElementById('persuasion');
var religion = document.getElementById('religion');
var sleightOfHand = document.getElementById('sleightofhand');
var stealth = document.getElementById('stealth');
var survival = document.getElementById('survival');

var acrobaticsText = document.getElementById('acrobaticstext');
var animalhandlingText = document.getElementById('animalhandlingtext');
var arcanaText = document.getElementById('arcanatext');
var athleticsText = document.getElementById('athleticstext');
var deceptionText = document.getElementById('deceptiontext');
var historySkillText = document.getElementById('historytext');
var insightText = document.getElementById('insighttext');
var intimidationText = document.getElementById('intimidationtext');
var investigationText = document.getElementById('investigationtext');
var medicineText = document.getElementById('medicinetext');
var natureText = document.getElementById('naturetext');
var perceptionText = document.getElementById('perceptiontext');
var performanceText = document.getElementById('performancetext');
var persuasionText = document.getElementById('persuasiontext');
var religionText = document.getElementById('religiontext');
var sleightOfHandText = document.getElementById('sleightofhandtext');
var stealthText = document.getElementById('stealthtext');
var survivalText = document.getElementById('survivaltext');

var diceToRoll = document.getElementById('dice')
var diceToDrop = document.getElementById('droppedDice')
var attributeRolls = document.getElementById('attributeRolls')
var diceOutput = document.getElementById('diceOutput')
var rollDice = document.getElementById('rolldice')

var pointBuyTab = document.getElementById('character-pointbuy-tab')

//This governs only the first two selections - character and level
characterLevel.addEventListener('change', calculateProf);
characterClass.addEventListener('change', parseSkills)

//This section is for the point buy section
strPointBuy.addEventListener('change', pointBuyCreation);
dexPointBuy.addEventListener('change', pointBuyCreation);
conPointBuy.addEventListener('change', pointBuyCreation);
intPointBuy.addEventListener('change', pointBuyCreation);
wisPointBuy.addEventListener('change', pointBuyCreation);
chaPointBuy.addEventListener('change', pointBuyCreation);

pointBuyTab.addEventListener('click', pointBuyCreation);

diceToRoll.addEventListener('change', onlyRollThree)
rollDice.addEventListener('click', diceCards)
rollFinalize.addEventListener('click',rollCharacterFinalize)
typedFinalize.addEventListener('click', typeCharacterFinalize)
pointBuyFinalize.addEventListener('click', pointBuyCharacterFinalize)

//Here are all the listeners for the skills
acrobatics.addEventListener('click',showCharacterStats)
animalhandling.addEventListener('click',showCharacterStats)
arcana.addEventListener('click', showCharacterStats)
athletics.addEventListener('change', showCharacterStats)
deception.addEventListener('change', showCharacterStats)
historySkill.addEventListener('change', showCharacterStats)
insight.addEventListener('change',showCharacterStats)
intimidation.addEventListener('change', showCharacterStats)
investigation.addEventListener('change', showCharacterStats)
medicine.addEventListener('change', showCharacterStats)
nature.addEventListener('change', showCharacterStats)
perception.addEventListener('change', showCharacterStats)
performance.addEventListener('change', showCharacterStats)
persuasion.addEventListener('change', showCharacterStats)
religion.addEventListener('change', showCharacterStats)
sleightOfHand.addEventListener('change', showCharacterStats)
stealth.addEventListener('change', showCharacterStats)
survival.addEventListener('change', showCharacterStats)