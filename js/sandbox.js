var character = [] // Create the character object so that we can populate it below

/* Events fired on the drag target */

document.addEventListener("dragstart", function(event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    event.dataTransfer.setData("Text", event.target.id);


    // Change the opacity of the draggable element
    event.target.style.opacity = "0.4";
    event.target.style.border = "3px dotted red";
});

// While dragging the p element, change the color of the output text
// document.addEventListener("drag", function(event) {
    // document.getElementById("demo").style.color = "red";
// });

// Output some text when finished dragging the p element and reset the opacity
document.addEventListener("dragend", function(event) {
    // document.getElementById("demo").innerHTML = "Finished dragging the p element.";
    event.target.style.opacity = "1";
    event.target.style.border = "";
});

/* Events fired on the drop target */

// When the draggable p element enters the droptarget, change the DIVS's border style
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
   The dragged data is the id of the dragged element ("drag1")
   Append the dragged element into the drop element
*/
document.addEventListener("drop", function(event) {
    event.preventDefault();
    if ( event.target.className == "droptarget" ) {
        // document.getElementById("demo").style.color = "";
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

function dropLowest(output,z) {
    for (var i=0; i<z; i++) {
        output.splice(output.indexOf(Math.min(...output)),1)
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

function onlyRollThree() {
    diceToDrop.innerText = parseInt(diceToRoll.value) - 3
}


function diceCards(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    diceOutput.innerHTML = ""
    for (var i = 1; i <= attributeRolls.value; i++) {
        var output = rolls(diceToRoll.value, 6)
        // diceOutput.innerHTML += "Array number " + i +" is: " + output + ". Discarding the lowest roll: " + idLowest(output, parseInt(diceToDrop.innerText)) + ". The total for this array is: " + (parseInt(output[0]) + parseInt(output[1]) + parseInt(output [2]) )+ ".<br>"
        var html = '<div className="card border border-primary" class="col-3" id="'+i+'">'
        html += '<div className="card-body border border-primary">'
        html +=  '<h5 className="card-title">Attribute Roll Number ' + i + '</h5>'

        if (diceToRoll.value == 5 ) {html +=  '<p className="card-text">The output of these rolls are: ' + output + '. The lowest rolls are: ' + idLowest(output, parseInt(diceToDrop.innerText)) + '; dropping those from your total. The total for your rolls are: <h4><span class="badge badge-primary" id="total' + i +'" draggable="true">' + (parseInt(output[0]) + parseInt(output[1]) + parseInt(output [2]) )+ '</span></h4>.</p></div></div>'}
        if (diceToRoll.value == 4 ) {html +=  '<p className="card-text">The output of these rolls are: ' + output + '. The lowest roll: ' + idLowest(output, parseInt(diceToDrop.innerText)) + '; dropping that from your total. The total for these rolls are: <h4><span class="badge badge-primary" id="total' + i +'" draggable="true">' + (parseInt(output[0]) + parseInt(output[1]) + parseInt(output [2]) )+ '</span></h4>.</p></div></div>'}
        if (diceToRoll.value == 3) {html +=  '<p className="card-text">The output of this array is: ' + output + '. You only rolled three dice, so no dice to drop. The total for these rolls is: <h4><span class="badge badge-primary" id="total' + i +'" draggable="true">' + (parseInt(output[0]) + parseInt(output[1]) + parseInt(output [2]) )+ '</span></h4>.</div></p></div></div>'}
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

function showCharacterStats() {
    strDisplay.value = character.strength;
    dexDisplay.value = character.dexterity;
    conDisplay.value = character.constitution;
    intDisplay.value = character.intelligence;
    wisDisplay.value = character.wisdom;
    chaDisplay.value = character.charisma;
}

var diceToRoll = document.getElementById('dice')
var diceToDrop = document.getElementById('droppedDice')
var attributeRolls = document.getElementById('attributeRolls')
var diceOutput = document.getElementById('diceOutput')
var rollDice = document.getElementById('rolldice')

//These are the new variables that I'll need to add back to diceroller.js

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

var strRollInput = document.getElementById('strinput')
var dexRollInput = document.getElementById('dexinput')
var conRollInput = document.getElementById('coninput')
var intRollInput = document.getElementById('intinput')
var wisRollInput = document.getElementById('wisinput')
var chaRollInput = document.getElementById('chainput')

var rollFinalize = document.getElementById('finalizeassign')
var typedFinalize = document.getElementById('finalizetyped')

diceToRoll.addEventListener('change', onlyRollThree)
rollDice.addEventListener('click', diceCards)

//New Listeners

rollFinalize.addEventListener('click',rollCharacterFinalize)
typedFinalize.addEventListener('click', typeCharacterFinalize)