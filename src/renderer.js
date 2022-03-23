const fs = require("fs")
const fileSelect = document.getElementById("fileSelect")

let filePath = null

fileSelect.onchange = (e) => {
  const propDiv = document.createElement("div")
  propDiv.textContent = "property | type"

  document.body.append(propDiv)

  const [file] = e.target.files;
  filePath = file.path
  const { name: fileName, size } = file;
  const fileSize = (size / 1000).toFixed(2);

  const doc = fs.readFileSync(filePath, "utf8")
  const json = JSON.parse(doc)

  //Is array of objects
  if (json.length > 0) {
    
    for (let i = 0; i < json.length; i++) {
      for (let j in json[i]) {
        const el = document.createElement("p")
        el.innerText = json[i]
        document.body.append(el)
      }
    }
  }


  function loopNested(obj) {
    //Loop through all properties until there are no left
    Object.entries(obj).forEach(([key,val]) => {
      if (val && typeof val === "object") {
        loopNested(val)
      }
      else {
        //No properties to loop through, append all elements
        const el = document.createElement("p")
        el.innerText = key + ": " + typeof val
        const input = document.createElement("input")
        input.type = "text"        
        if(typeof val === "boolean") input.type = "button"
        input.value = val
        document.body.append(el)
        document.body.append(input)
      }
    })
  }

  /* function props(obj) {
     Object.entries(obj).forEach(([key, val]) => {
      //If val is an object literal, only target them 
      if (val instanceof Object) {
        if (val.length > 0) { 
          for (let i = 0; i < val.length; i++) {
              props(val[i])
              console.log(val[i])
          }

        }

        if (!val.length) {
          Object.entries(val).forEach(([i,v]) => {
            props(v)
            console.log(v)
          })
        }
      }
  
    })
  } */

  //Is object
  loopNested(json)
    /* props(json) */
    /* Object.entries(json).forEach(([key, val]) => {
      
      if (val instanceof Object) {
        if (val.length > 0) { 
          for (let i = 0; i < val.length; i++) {
            console.log(val[i])
            }
        }

        if (!val.length) {
          Object.entries(val).forEach(([i,v]) => {
            console.log(v)
          })
        }
      } */
  
  const fname = document.getElementById("fileName")
  fname.textContent = fileName
  const fsize = document.getElementById("fileSize")
  fsize.textContent = fileSize + " KB"
  const fileDisplayArea = document.getElementById("fileDisplayArea")

 const btns = document.querySelectorAll('input[type="button"]')
 btns.forEach((button)  => {
   button.addEventListener("click", () => {
     button.value = button.value === "true" ? "false" : "true"
   })
 })
}

// todo
// figure out a way to write all changes to the json file in the order corresponding to each property