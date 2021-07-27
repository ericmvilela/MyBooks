const { info } = require("console")
const { type } = require("process")

function selected ()
{
    var todos = document.getElementById("todos")
    var lido = document.getElementById("lidos")
    var naoLidos = document.getElementById("naoLidos")

    if(todos.checked == true)
    {
        createTable('todos')
    }
    else if(lido.checked == true)
    {
        createTable('lido')
    }
    else if(naoLidos.checked == true)
    {
        createTable('naoLido')
    }
}

function saveBook()
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

    var dataBooks = {
        "name" : bookName,
        "author" : author,
        "pages": pages,
        "lido": lido.checked  
    }

    const fs = require("fs")

    console.log(__dirname)
    if(fs.existsSync("./save.json") == false)
    {
        console.log("Nao Existe")
        createJsonSave()
    }


    fs.readFile("./save.json", 'utf-8', function(err, data) {
        if (err) throw err
    
        var saveFile = JSON.parse(data)
        saveFile.books.push(dataBooks)

        for(var i = 0; i < saveFile.books.length; i++)
        {
            saveFile.books[i].id = i
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
     }, 800);

}

function goLink(linkPage)
{
    window.location.href = linkPage
}

function createTable(filter, order="alphabetic")
{
    var tableMain = document.getElementById("tableMain")
    var tableBody = document.getElementById("bodyTable")
    

    tableMain.removeChild(tableBody)

    tableBody = document.createElement('tbody')

    const fs = require("fs")

    if(fs.existsSync("./save.json") == false)
    {
        console.log("Nao Existe")
        createJsonSave()
    }

    fs.readFile("./save.json", 'utf-8', function(err, data) {
        if (err) throw err

        allBooks = JSON.parse(data)
        infoBooks = allBooks.books


        if(order == "alphabetic")
        {
            infoBooks.sort( function( a, b ) {
                a = a.name.toLowerCase();
                b = b.name.toLowerCase();
            
                return a < b ? -1 : a > b ? 1 : 0;
            })
        }
        else if (order == "numeric")
        {
            infoBooks = infoBooks.slice().sort((a, b) => a.pages - b.pages);
        }


        for(let i = 0; i < infoBooks.length; i++)
        {

            var tr = document.createElement('tr')
            for(let j = 0; j < 4; j++)
            {
                if(filter == 'lido' && infoBooks[i].lido == false)
                    continue
                else if (filter == 'naoLido' && infoBooks[i].lido)
                    continue

                var td = document.createElement('td')
                if(j == 0)
                {   
                    td.appendChild(document.createTextNode(infoBooks[i].name))
                    td.setAttribute('class', 'nameTable')
                    td.setAttribute('id', infoBooks[i].id)
                    td.onclick = function () {
                        callOther(infoBooks[i].id);
                    };
                      
                }
                else if(j == 1)
                {
                    td.appendChild(document.createTextNode(infoBooks[i].author))
                    td.setAttribute('class', 'authorTable')
                }
                else if(j == 2)
                {
                    td.appendChild(document.createTextNode(infoBooks[i].pages))
                    td.setAttribute('class', 'pageTable')
                }
                else
                {
                    checkInput = document.createElement('input')
                    checkInput.type = 'checkbox'
                    checkInput.setAttribute('class', 'lidoTable')
                    if(infoBooks[i].lido)
                    {
                        checkInput.checked = true
                    }
                    td.appendChild(checkInput)
                }
                tr.appendChild(td)
            }
            tableBody.appendChild(tr)
        }
        tableBody.setAttribute('id', 'bodyTable')
        tableMain.appendChild(tableBody)
    })

}

function callOther(bookId)
{
    window.location.href = "./src/pages/edit.html?" + bookId
    
}

function orderPages(typeOrder)
{
    var todos = document.getElementById("todos")
    var lido = document.getElementById("lidos")
    var naoLidos = document.getElementById("naoLidos")

    if(typeOrder == 0)
    {
        if(todos.checked == true)
        {
            createTable('todos', 'alphabetic')
        }
        else if(lido.checked == true)
        {
            createTable('lido', 'alphabetic')
        }
        else if(naoLidos.checked == true)
        {
            createTable('naoLido', 'alphabetic')
        }
    }
    else if(typeOrder == 1)
    {
        if(todos.checked == true)
        {
            createTable('todos', 'numeric')
        }
        else if(lido.checked == true)
        {
            createTable('lido', 'numeric')
        }
        else if(naoLidos.checked == true)
        {
            createTable('naoLido', 'numeric')
        }
    }
}

function createJsonSave()
{

    var emptySave = {
       "books": []
    }

    const fs = require("fs")
    fs.writeFile("./save.json", JSON.stringify(emptySave, null, 2), 'utf-8' ,function(err, result) {
        if(err) console.log('error', err);
    });
}