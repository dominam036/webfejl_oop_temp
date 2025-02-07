/**
 * @typedef {{nev:String, eletkor:Number}} Person
 * @callback UpdateCallback
 * @param {Person[]} persons
 * @returns {Void}
 */
class DataManager{
    /**
     * @type {Person[]}
     */
    #array
    /**
     * @type {UpdateCallback}
     */
    #updateCallback
    /**
     * @param {Person[]} tomb 
     */
    constructor(tomb = []){
        this.#array = tomb;
        this.#updateCallback = () => {};
    }
    /**
     * @param {UpdateCallback} callback 
     */
    setUpdateCallback(callback){
        this.#updateCallback = callback;
        this.#updateCallback(this.#array)
    }
    /**
     * @param {HTMLElement} element
     */
    add(element){
        this.#array.push(element)
        this.#updateCallback(this.#array);
    }
    /**
     * @param {Number} age 
     */
    filterAge(age){
        const ageArray = [];
        for(const elem of this.#array){
            if(elem.Age === age){
                ageArray.push(elem);
            }
        }
        this.#updateCallback(ageArray);
    }
    /**
     * @param {string} name 
     */
    filterName(name){
        const nameArray = [];
        for(const elem of this.#array){
            if(elem.Name.includes(name)){
                nameArray.push(elem);
            }
        }
        this.#updateCallback(nameArray);
    }
    /**
     * 
     * @param {function(Person):boolean} filterCB 
     */
    filter(filterCB){
        const filterArray = [];
        for(const elem of this.#array){
            if(filterCB(elem)){
                filterArray.push(elem);
            }
        }
        this.#updateCallback(filterArray);  
    }
    orderByAge(){
        const orderArray = [];
        for(let i = 0; i < this.#array.length; i++){
            orderArray[i] = this.#array[i]
        }
        for(let i = 0; i < orderArray.length; i++){
            orderArray[i] = orderArray[i]
        }
    }
    orderByName(){

    }
}

class DataTable{
    /**
     * @param {DataManager} dataManager
     */
    constructor(dataManager){
        const table = document.createElement("table");
        document.body.appendChild(table);

        const header = document.createElement("thead");
        table.appendChild(header);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        dataManager.setUpdateCallback((persons) => {
            tbody.innerHTML = "";
            for(const person of persons){
                const row = document.createElement("tr");
                tbody.appendChild(row);

                const td1 = document.createElement("td");
                td1.innerHTML = person.Name
                row.appendChild(td1);

                const td2 = document.createElement("td");
                td2.innerHTML = person.Age
                row.appendChild(td2);
            }
            console.log(persons)
        })
    }
}

const dataManager = new DataManager([{Age: 17, Name: "Feri"}, {Age: 17, Name: "Józsi"}, {Age: 18, Name: "Béla"}]);
const dataTable = new DataTable(dataManager);

const input = document.createElement("input");
document.body.appendChild(input);
input.addEventListener("input", (e)=>{
    filterAge(e.currentTarget.value)
    filterName(e.currentTarget.value)
})

const input2 = document.createElement("input");
document.body.appendChild(input2);
input2.type = 'file';
input2.addEventListener("change", (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e)=>{
        const filecontent = reader.result;
        const split = filecontent.split("\n");
        for(const elem of split){
            const small = elem.split(";")
            const pers = {
                Name:small[0], 
                Age:Number(small[1])
            }
            dataManager.add(pers);
        }
        console.log(split);
        dataManager.filter((person)=>{return person.Name.includes("C")});
        dataManager.orderByAge();
    }
});
