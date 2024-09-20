let addToggle = document.querySelector("#addToggle")
let sidebar = document.querySelector(".sidebar")



class Book {
    constructor(values) {
        this.title = values[0]
        this.author = values[1]
        this.description = values[2]
        this.color = values[3]
        this.pageNo = values[4]
        this.status = values[5]
        this.currPage = this.status ? this.pageNo:0
    }

    updatePage(updatePage) {
        this.currPage = updatePage
        if(this.currPage===this.pageNo){
            this.status = true
        }
    }
    toggleStatus(){
        if (this.status===true){
            this.currPage = 0
            this.status= false
        }else{
            this.currPage=this.pageNo
            this.status=true
        }
    }
    createBook(){
        let newBook = document.createElement("div")
        newBook.setAttribute("class","book")
        bookShelf.appendChild(newBook)
        this.documentRef = newBook
        
        let readStatus = document.createElement("h2")
        readStatus.setAttribute("class","bookStatus")
        readStatus.textContent = this.status ? "Completed" : "Unread"
        this.documentRef.appendChild(readStatus)

        let bookRead = document.createElement("h2")
        bookRead.setAttribute("class","bookRead")
        bookRead.textContent = this.currPage+"/"+this.pageNo
        this.documentRef.appendChild(bookRead)

        let bookTitle = document.createElement("h3")
        bookTitle.setAttribute("class","bookTitle")
        bookTitle.textContent = this.title
        this.documentRef.append(bookTitle)

        let bookAuthor = document.createElement("h5")
        bookAuthor.setAttribute("class","bookAuthor")
        bookAuthor.textContent = this.author
        this.documentRef.appendChild(bookAuthor)

        let bookDesc = document.createElement("p")
        bookDesc.setAttribute("class","bookDesc")
        bookDesc.textContent = this.description
        this.documentRef.appendChild(bookDesc)

        newBook.style.backgroundColor = this.color
        this.documentRef.style.color = invertColor(values[3])

        let inputField = document.createElement("div")
        inputField.setAttribute("class","bookInputs")
        let updateNo = document.createElement("input")
        updateNo.setAttribute("type","number")
        let updateBtn = document.createElement("button")
        updateBtn.className = "updateBtn"
        let toggleBook = document.createElement("button")
        toggleBook.className = "toggleComplete"
        inputField.appendChild(updateNo)
        inputField.appendChild(updateBtn)
        inputField.appendChild(toggleBook)
        this.documentRef.appendChild(inputField)

        let delBook = document.createElement("button")
        delBook.className = "deleteBook"
        this.documentRef.appendChild(delBook)
        updateBtn.addEventListener("click",(e)=>{
            let newNumber = e.target.previousSibling.value
            if (newNumber > this.pageNo || newNumber<0||newNumber===""){
                alert("Invalid Page number")
                return
            }
            this.updatePage(newNumber)
            this.updatePageDom()
        })
        toggleBook.addEventListener("click",(e)=>{
            this.toggleStatus()
            this.updatePageDom()
        })
        delBook.addEventListener("click",()=>{
            this.delBook()
        })
    }
    updatePageDom(){
        this.documentRef.querySelector(".bookRead").textContent=this.currPage+"/"+this.pageNo
        this.documentRef.querySelector(".bookStatus").textContent=this.status ? "Completed" : "Unread"
    }
    delBook(){
        alert("Delete this book from your library? ("+this.title+")")
        let bookInLib = theLibrary.findIndex((e)=>e==this)
        this.documentRef.remove()
        theLibrary.pop(bookInLib)
    }
    
}
const theLibrary = []


addToggle.addEventListener("click",(e)=>{
    
    if(sidebar.classList.contains("collapsed")){
        sidebar.classList.remove("collapsed");
        sidebar.classList.add("expanded"); }
    else {
        sidebar.classList.remove("expanded")
        sidebar.classList.add("collapsed")}
})

let newTitle = document.querySelector('#newTitle')
let newAuthor = document.querySelector('#newAuthor')
let newDesc = document.querySelector('#newDesc')
let newColor = document.querySelector('#newColor')
let newPageNo = document.querySelector('#newPageNo')
let newCompleted = document.querySelector("#newCompleted")
let newSubmit = document.querySelector("#newSubmit")
let bookShelf = document.querySelector(".bookshelf")

function getInputValues(){
    title = newTitle.value
    author = newAuthor.value
    desc = newDesc.value
    color = newColor.value
    pageNo = newPageNo.value
    completed = newCompleted.checked

    return [title,author,desc,color,pageNo,completed]
}

function addBook(){
    invalidFlag = false
    queryList = [newTitle,newAuthor,newDesc,newColor,newPageNo,newCompleted]
    values = getInputValues()
    for (let i = 0; i < values.length; i++) {
        const input = values[i];
        if(input===""){
            
            queryList[i].classList.add("error")
            invalidFlag =true
        }else {
            queryList[i].classList.remove("error")
        }        
    }
    if(invalidFlag) return
    else {
        toAdd = new Book(values)
        theLibrary.push(toAdd)
        toAdd.createBook()
    }
    

    
}
function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
// Checker
newSubmit.addEventListener("click",()=>{ 
    addBook()

})


