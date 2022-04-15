console.log('Boy: Larry Adegbola')

console.log('Girl: Diamond Adegbola')

var jj = {symbol: 'ETHUSDT', price: '3223.93000000'};

const first = [2, 3, 'laga', {first: "rabbit", second: 'romans', 'tree': 'firm'}]

first.forEach(each => {
   if(typeof(each) === 'object' && each !== null){
    console.log(`content is ${each.first} and ${each.second}`)
   }
   else
    console.log(each)
})

let firsh = {first: "rabbit", second: 'romans', tree: 'firm'}
let zz = JSON.stringify(firsh)
console.log(firsh)
const kkc = JSON.parse(zz)
console.log(kkc)
//jsjf

// @ts-ignore
//console.log(jj.price*0.005)//rough_shod



var kk = parseInt('0xff', 16)

console.log(kk)


const todo = [1, '0.2', 3, 'nigeria']
todo.push('jesus', 'christ', 'nazareth')

//console.log(todo)

//var y = 0'
this.y = 0

const newTodo = todo.map(x => 
    x.toString().concat(''+this.y++)
)

//console.log(newTodo)
//console.log(todo)