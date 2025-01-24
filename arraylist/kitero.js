function fun(param){
    console.log(param.nev);
};
const csirke = fun;
const funA = function(param){
    console.log(param.nev);
};
const funB = function(){
    console.log(this.nev);
};
const funC = (param)=>{
    console.log(param.nev);
};
const tojas = funB.bind({nev:"Balázs"});

fun({nev:"Cirmi"});
funA({nev:"Géza"});
tojas();
csirke({nev:"II. András"});

const obj = {
    funA: (param)=>{
        console.log(param.nev);
    },
    funB: (param)=>{
        console.log(param.eletkor);
    }
}
const pers = {
    nev: "vova",
    eletkor: 26
}
obj.funA(pers);
obj.funB(pers);