
    

    
    global.generatePassword = function (length) {
        let chars = ""
        
            chars += "0123456789"
    
            chars += "abcdefghijklmnopqrstuvwxyz"
        
            chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
            //chars += "`~!@#$%^&*()_+-=[]\\{}|;':\",./<>?"
        
        
        let output = ""
        let outputlength = length
        let possiblechars = chars.length
        
        for (let i=0;i<outputlength;i++) {
            output += chars.charAt(Number(window.cryptoRandom(0,possiblechars-1)))
        }
        
        return output

    }
    
    
    

    
//In order to greatly improve performance, store values in a list 
//These must be private - we can't have the same values used twice
var randlist = window.crypto.getRandomValues(new Uint32Array(256));
//Picked 256 as it is not that slow on each call, and under 10% less effecient than 16384.
var listcount = 0
window.cryptoRandom = function(min,max) {
    
    if (typeof min !== "number") {
        throw "min must be a number"
    }
    
    if (typeof max !== "number") {
        throw "max must be a number"
    }
    
    //Auxillary functions
    function getnum() {
        //Returns a random 32 bit unsigned integer
        //Check if we have used up all the values
        if (listcount === randlist.length) {
            //Refresh the random values and counter
            randlist = crypto.getRandomValues(randlist)
            listcount = 0
        }
        return randlist[listcount++]
    }
    
    function rand(max) {
        //Returns a value between 0 and max
        //We start at 0, not 1. Add 1 to max
        max += 1
        //To avoid skew, identify the maximum number that we can mod without skew.
        let toss = ((2**32) - (2**32%max))-1
        let val = getnum()
        while (val > toss) {val = getnum()}
        //Since toss%max is equal to max-1, we can mod without skew
        return val%max
    }
    
    
    if (min>max) {
        //Fancy way to swap variables
        max = [min, min=max][0];
    }
    
    let range = max-min
    
    let gen = rand(range)
    return gen+min
    
}
