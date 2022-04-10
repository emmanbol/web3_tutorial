
class PoroChenko{
    constructor(){
        this.state = {
            fish: 26,
            kara: [],
            dodo: '',
        }
        //this.dada = this.dada.bind(this);
        //this.keke = this.keke.bind(this);
    }

    dadas(){

    }

    dada = async () => {
        const {fish} = this.state;
        console.log('rogo: ', fish);
    }

    keke = async () => {
        //var {fish} = this.state;
        this.state.fish = 75;
    }
}

var vv = new PoroChenko();

vv.dada();
vv.keke();
vv.dada();

async function asyncTaso(val){
    if(val == 1)
        throw new Error('wrong');
    else 
        return "correct";
}

async function main(a){
     const result = await asyncTaso(a).catch(err => {console.log(err)})
     if(result) console.log("good: ", result)
}

const firsto = () => {
    console.log("firsto is outside")
}

class Rogo{

    a=2; b=2; c=3;

    constructor(){
        //this.a = 1;

    }

    firsto = () => {

    }

    first(a){
        console.log("a: "+a)
    }

    second(){
        console.log("b: ", this.b)
    }


}

main(0)//since it implement async function(returns a promise), may display last.
let gg = new Rogo()
gg.first(3)

class Shapes{

    constructor(name, length, breadth){
        this.name = name
        this.length = length
        this.breadth = breadth
        //console.log('enter here')
    }

    area(){
        console.log('the area0 of '+ this.name +' '+ (this.length*this.breadth))
    }
}

class Rectangle extends Shapes{
    constructor(name, length, breadth, height){
        super(name, length, breadth)//there must be super in derived class constructor
        this.height = height
    }
    
    //override area
    area(){
        console.log(this.name+' area1: '+this.length*this.breadth+" and height = "+this.height)
    }
}

//let rect1 = new Rectangle("Rect1", 15, 20, 30);
//rect1.area()