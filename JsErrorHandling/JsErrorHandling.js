async function getCheese(shouldError=false) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(shouldError){
                return reject('Cheese error');
            }
            return resolve(['cheddar', 'brie', 'gouda'])
        },1)
    })
}

//Method 1: then().catch()
getCheese().then(cheeses=>console.log(cheeses)).catch((err)=>console.log(err));

//Method 2: try/catch
try {
    const cheese = await getCheese();
    console.log(cheese);
} catch (error) {
    console.log(error);
}

//Method 3: Mix n Match - .catch()
const myCheese=await getCheese().catch(err=> console.log(err));

//Method 4: Bring into a single level
async function asyncWrap(promise){
    try {
        const data = await promise;
        return [data, undefined]
    } catch (e) {
        return [undefined, e]
    }
}

const [cheeseResponse, cheeseError] = await asyncWrap(getCheese());
if(cheeseError){
    //Deal with it
}

//allSettled will going to wait for all of our promises to be done regardless of if they reject or resolve.
//it will return array of object where status property tell us either the response will be fulfilled or rejected with
//the value.

const results = await Promise.allSettled([getCheese(), getCheese(true)]);

//Method 4.1: non-async
function wrapIt(promise) {
    /**
     * Promise allSettled will return an array of objects, we grab the first one.
     * The object will only ever have one of these properties:
     * values - the resolved data
     * or
     * reason - the rejected error
     */
    return Promise.allSettled([promise]).then(function ([{value, reason}]){
        return [value, reason];
    })
}

const [data, error] = await wrapIt(getCheese())

function wrapItObject(promise) {
    return Promise.allSettled([promise]).then(function ([{value, reason}]){
        return {data: value, error: reason};
    })
}
const {data:cheeseData, error:cheeseErr} = await wrapItObject(getCheese())