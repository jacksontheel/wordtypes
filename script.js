function getWordButton()
{
    getWord(document.getElementById("input").value);
}

function getWord(word)
{
    if (word.length > 0)
    {
        let found = false;
        data.forEach((element) =>
        {
            if (element.word.toUpperCase() == word.toUpperCase())
            {
                console.log(element);
                getType(element);
                fillData(element);
                found = true;
            }
        });
        if (!found)
        {
            document.getElementById("word").innerHTML = word.toUpperCase();
            document.getElementById("type").innerHTML = "Normal type";
            document.getElementById("fire").innerHTML = "";
            document.getElementById("water").innerHTML = "";
            document.getElementById("grass").innerHTML = "";
            document.getElementById("electric").innerHTML = "";
            document.getElementById("ice").innerHTML = "";
            document.getElementById("poison").innerHTML = "";
            document.getElementById("air").innerHTML = "";
            document.getElementById("mind").innerHTML = "";
            document.getElementById("rock").innerHTML = "";
            typeColor("Normal");
        }
    }
}

function getType(obj)
{
    let typeNumbers = new Array(9);
    typeNumbers[0] = { num: obj.fire, name: "Fire" };
    typeNumbers[1] = { num: obj.water, name: "Water" };
    typeNumbers[2] = { num: obj.grass, name: "Grass" };
    typeNumbers[3] = { num: obj.electric, name: "Electric" };
    typeNumbers[4] = { num: obj.ice, name: "Ice" };
    typeNumbers[5] = { num: obj.poison, name: "Poison" };
    typeNumbers[6] = { num: obj.air, name: "Air" };
    typeNumbers[7] = { num: obj.mind, name: "Mind" };
    typeNumbers[8] = { num: obj.rock, name: "Rock" };

    let max = 0;
    let typeReturn = "";
    typeNumbers.forEach((element) => {
        if (element.num > max)
        {
            max = element.num;
            typeReturn = element.name;
        }
    });
    document.getElementById("type").innerHTML = typeReturn + " type";
    typeColor(typeReturn);
}

function typeColor(type)
{
    switch(type) {
    case "Fire":
        document.getElementById("background").style.backgroundColor = "#ff775c";
        break;
    case "Water":
        document.getElementById("background").style.backgroundColor = "#5ca5ff";
        break;
    case "Grass":
        document.getElementById("background").style.backgroundColor = "#73c97b";
        break;
    case "Electric":
        document.getElementById("background").style.backgroundColor = "#fff58c";
        break;
    case "Ice":
        document.getElementById("background").style.backgroundColor = "#93fae9";
        break;
    case "Poison":
        document.getElementById("background").style.backgroundColor = "#fa7af6";
        break;
    case "Air":
        document.getElementById("background").style.backgroundColor = "#7ac5fa";
        break;
    case "Mind":
        document.getElementById("background").style.backgroundColor = "#f786c0";
        break;
    case "Rock":
        document.getElementById("background").style.backgroundColor = "#c7936b";
        break;
    case "Normal":
        document.getElementById("background").style.backgroundColor = "#d9d891";
        break;
    }
}

function fillData(obj)
{
    document.getElementById("word").innerHTML = obj.word;
    document.getElementById("fire").innerHTML = "Fire: " + Number.parseFloat(obj.fire).toFixed(2);
    document.getElementById("water").innerHTML = "Water: " + Number.parseFloat(obj.water).toFixed(2); 
    document.getElementById("grass").innerHTML = "Grass: " + Number.parseFloat(obj.grass).toFixed(2);
    document.getElementById("electric").innerHTML = "Electric: " + Number.parseFloat(obj.electric).toFixed(2);
    document.getElementById("ice").innerHTML = "Ice: " + Number.parseFloat(obj.ice).toFixed(2);
    document.getElementById("poison").innerHTML = "Poison: " + Number.parseFloat(obj.poison).toFixed(2);
    document.getElementById("air").innerHTML = "Air: " + Number.parseFloat(obj.air).toFixed(2);
    document.getElementById("mind").innerHTML = "Mind: " + Number.parseFloat(obj.mind).toFixed(2);
    document.getElementById("rock").innerHTML = "Rock: " + Number.parseFloat(obj.rock).toFixed(2);
}