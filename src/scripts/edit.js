window.onload = function()
{  
    const queryString = window.location.search
    newStr = queryString.replace('?', '');
    initial(newStr)
}


function initial(idBook)
{
    bookName = document.getElementById("bookName")
    authorName = document.getElementById("author")
    pages = document.getElementById("pages")
    lidoCheck = document.getElementById("lido")

    const fs = require("fs")
    fs.readFile("./save.json", 'utf-8', function(err, data) {
        if (err) throw err
    
        allBooks = JSON.parse(data)
        infoBooks = allBooks.books

        for(let i = 0; i < infoBooks.length; i++)
        {
            if(parseInt(idBook) == infoBooks[i].id)
            {
                bookName.value = infoBooks[i].name
                authorName.value = infoBooks[i].author
                pages.value = infoBooks[i].pages
                if(infoBooks[i].lido)
                {
                    lidoCheck.checked = true
                }
                else
                {
                    lidoCheck.checked = false
                }
            }
        }

    })
}


function saveEdit()
{
    var bookName = document.getElementById('bookName').value
    var author = document.getElementById('author').value
    var pages = document.getElementById('pages').value
    var lido = document.getElementById("lido")

    if(bookName == "" || author == "" || pages == "")
    {
        console.log("Erro")
        return
    }

    var saving = document.querySelector('#saving')


    const fs = require("fs")
    fs.readFile("./save.json", 'utf-8', function(err, data) {
        if (err) throw err
    
        var saveFile = JSON.parse(data)

        for(var i = 0; i < saveFile.books.length; i++)
        {
            if(saveFile.books[i].id == parseInt(newStr))
            {
                saveFile.books[i].name = bookName
                saveFile.books[i].author = author
                saveFile.books[i].pages = pages
                saveFile.books[i].lido = lido.checked
            }
        }

        console.log(saveFile)

        fs.writeFile("./save.json", JSON.stringify(saveFile, null, 2), 'utf-8' ,function(err, result) {
            if(err) console.log('error', err);
        });

    })

    saving.innerHTML =  'Salvando...'
    saving.style.fontSize = "15px";

    setTimeout(function () {
        window.location.href = "../../index.html"
     }, 500);

}


function saveDel()
{

    var saving = document.querySelector('#saving')


    const fs = require("fs")
    fs.readFile("./save.json", 'utf-8', function(err, data) {
        if (err) throw err
    
        var saveFile = JSON.parse(data)

        saveFile.books.splice(parseInt(newStr), 1);

        for(var i = 0; i < saveFile.books.length; i++)
        {
            saveFile.books[i].id = i
        }

        console.log(saveFile)

        fs.writeFile("./save.json", JSON.stringify(saveFile, null, 2), 'utf-8' ,function(err, result) {
            if(err) console.log('error', err);
        });

    })

    saving.innerHTML =  'Apagando...'
    saving.style.fontSize = "15px";
    saving.style.color = 'red'

    setTimeout(function () {
        window.location.href = "../../index.html"
     }, 500);

}
