function getWordButton()
{
    getWord(document.getElementById("input").value);
}

function getWord(word)
{
    if (word.length > 0)
    {
        document.getElementById("word").innerHTML = word.toUpperCase();
        let found = false;
        data.forEach((element) =>
        {
            if (element.word.toUpperCase() == word.toUpperCase())
            {
                getType(element);
                found = true;
            }
        });
        if (!found)
        {
            document.getElementById("type").innerHTML = "Normal type";
            for (let i = 0; i < 9; i++)
            {
                document.getElementById("type" + i).innerHTML = "";
            }
            typeColor("Normal");
        }
    }
}

function getType(obj)
{
    let typeData = new Array(9);
    typeData[0] = { num: obj.fire, name: "Fire" };
    typeData[1] = { num: obj.water, name: "Water" };
    typeData[2] = { num: obj.grass, name: "Grass" };
    typeData[3] = { num: obj.electric, name: "Electric" };
    typeData[4] = { num: obj.ice, name: "Ice" };
    typeData[5] = { num: obj.poison, name: "Poison" };
    typeData[6] = { num: obj.air, name: "Air" };
    typeData[7] = { num: obj.mind, name: "Mind" };
    typeData[8] = { num: obj.rock, name: "Rock" };

    typeData.sort(function(a, b) {
        return b.num - a.num;
    });
    fillData(typeData);

    let max = 0;
    let typeReturn = "";
    typeData.forEach((element) => {
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

function fillData(data)
{
    console.log(data)
    data.forEach((element, index) =>
    {
        console.log(element);
        document.getElementById("type" + index).innerHTML = element.name + " " + formatFloat(element.num);
    })
}

function formatFloat(num)
{
    num = Math.max(0, num);
    return Number.parseFloat(num).toFixed(2)
}