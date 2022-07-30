const Grid = document.querySelector("#Grid");
const currentElement = document.querySelector("#CurrentOperand")
const previousElement = document.querySelector("#PreviousOperand")
const gridElements = Array.from(Grid.childNodes);
console.log(gridElements)

let currentOperand = "0"
let previousOperand = "0";
let currentOp = '';

for(let i = 0; i < gridElements.length; i++){
    console.log("this happened")
    gridElements[i].addEventListener("click", (e) => {
        let target = e.target;
        //console.log(target.className);
        console.log(target.innerHTML);
        if(target.className == "Number"){
            pickaNum(target.innerHTML);
        }else if(target.className == "Operator"){
            changeOp(target.innerHTML);
            
        }else if(target.className == "Clear"){
            clear();
        }else if(target.className == "Delete"){
            deleteChar();
        }else if(target.className == "dot"){
            dot();
        }
        console.log(currentOperand);
    })
}
const changeOp = (op) =>{
    update(op); 
    currentOp = op;
    previousElement.innerHTML += op;
}

const pickaNum = (num) =>{
    let tempOperand = currentOperand.toString(); 
    if(tempOperand == 0){
        tempOperand = num;    
    }else{
        tempOperand= tempOperand + num;
    }
    currentOperand = parseFloat(tempOperand);
    currentElement.innerHTML = currentOperand;
}

const deleteChar = () =>{
    if(currentElement.innerHTML.slice(0, -1) == ""){
        currentOperand = 0;
    }
    else{
     currentOperand = parseFloat(currentElement.innerHTML.slice(0, -1));
    }
    currentElement.innerHTML = currentOperand;
}

//Resets previousElement, Current Element and operator
const clear = () =>{
    currentOperand = 0;
    previousOperand = 0;
    currentOp = 0;
    previousElement.innerHTML = '';
    currentElement.innerHTML = currentOperand;
}

//Updates Previous Element div and resets CurrentElement and operand to 0
const update = (givenOp) => {
    if(previousElement.innerHTML.trim() == ''){
        previousOperand = currentOperand;
        previousElement.innerHTML = previousOperand;
    }
    else{
        if(currentOperand != 0){
            previousOperand = calculate(previousOperand,currentOp,currentOperand);
        }
        
        previousElement.innerHTML = previousOperand
    }
    currentOperand = 0;
    currentElement.innerHTML = currentOperand;
}

//Calculates Equasion based on Values and Operator
const calculate = (val1, op, val2) =>{
    switch (op){
        case "X":
            return Number((parseFloat(val1) * parseFloat(val2)).toFixed(3));
            break;
        case "+":
            return Number((parseFloat(val1) + parseFloat(val2)).toFixed(3));
            break;
        case "-":
            return Number((parseFloat(val1) - parseFloat(val2)).toFixed(3));
            break;
        default:
            return Number((parseFloat(val1) / parseFloat(val2)).toFixed(3));
            break;
    }
}
const dot = () =>{
    if(currentElement.innerHTML.includes(".") == true) return
    currentOperand = currentOperand + ".";
    currentElement.innerHTML = currentOperand

}