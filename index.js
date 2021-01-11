function App()
{
    // React event hooks!
    const [result,setResult] = React.useState("0")

    // Function to check if it's a Math expression / not
    const cekSimbol = (c) => {
        if(c[0] == '+' || c[0] == '/' || c[0] == '*' || c[0] == '=') return true;
        else return false;
    }
    const handleChange = (e) => {
        // If it's clear, reset everything
        if(e == "clear")
        {
            setResult(prev => "0")
        }
        // If the digit has hit the maximum display
        else if((result+e).length > 9)
        {
            alert("MAX DIGIT Reached!\nPlease clear the input 👇")
        }
        // Handle decimal to validate correct input
        else if(e == '.')
        {
            let dec = true
            for(let i = 0; i < result.length;i++)
            {
                let cur = result[i];
                if(cekSimbol(cur)  || cur == "-")
                {
                    dec = true;
                }
                else if(result[i] == ".")
                {
                    dec = false;
                }
            }
            if(dec)
            {
                setResult(prev => (prev+e))
            }
        }
        // If previous is - and current is a symbol (Handle "-" to validate correct input)
        else if(result[result.length-1] == '-' && cekSimbol(e))
        {
            setResult(prev => prev.substr(0,result.length-2)+e)
        }
        // If previous is a symbol and current is a symbol (Handle symbol to validate correct input)
        else if(cekSimbol(result[result.length-1]) && cekSimbol(e))
        {
            setResult(prev => prev.substr(0,result.length-1) + e)
        }
        // Else just add it to result
        else
        {
            setResult(prev => (prev+e).replace(/^0/, ''))
        }
    }
    const handleSubmit = () => {

        // The logic is using javascript function called eval() (It can evaluate expression like 1+2-3.. etc)
        // It's kind of mind-boggling because i've made the calculator logic from scratch with 76 line of code
        // Before finding out i was reinventing the wheel and it can be evaluated with just one line 😭

        // If it's not an integer, then set the decimal precision to 4
        if(!Number.isInteger(eval(result)))
            setResult(prev => Number(eval(prev).toFixed(4)).toString())
        // Else, just evaluate it.
        else
            setResult(prev => eval(prev).toString())
    }

    return (
        <main>
            <div class="calculator">
                <div class="screen" id="display">
                    <div class="screen padding">{result}</div>
                </div>
                <div class="keys">
                    <div id="clear" class="keypad" onClick={() => handleChange("clear")}>AC</div>
                    <div id="divide" class="keypad" onClick={() => handleChange("/")}>/</div>
                    <div id="multiply" class="keypad" onClick={() => handleChange("*")}>X</div>
                    <div id="add" class="keypad" onClick={() => handleChange("+")}>+</div>
                    <div id="subtract" class="keypad" onClick={() => handleChange("-")}>-</div>
                    <div id="decimal" class="keypad" onClick={() => handleChange(".")}>.</div>
                    <div id="equals" class="keypad" onClick={handleSubmit}>=</div>
                    <div id="zero" class="keypad" onClick={() => handleChange(0)}>0</div>
                    <div id="one" class="keypad" onClick={() => handleChange(1)}>1</div>
                    <div id="two" class="keypad" onClick={() => handleChange(2)}>2</div>
                    <div id="three" class="keypad" onClick={() => handleChange(3)}>3</div>
                    <div id="four" class="keypad" onClick={() => handleChange(4)}>4</div>
                    <div id="five" class="keypad" onClick={() => handleChange(5)}>5</div>
                    <div id="six" class="keypad" onClick={() => handleChange(6)}>6</div>
                    <div id="seven" class="keypad" onClick={() => handleChange(7)}>7</div>
                    <div id="eight" class="keypad" onClick={() => handleChange(8)}>8</div>
                    <div id="nine" class="keypad" onClick={() => handleChange(9)}>9</div>
                </div>
            </div>
            <a class="name" href="https://github.com/abdulrcs" target="_blank"><i class="fab fa-github"></i>abdulrcs</a>
        </main>
    )
} 

ReactDOM.render(<App/>, document.getElementById("root"))