class ArrayList{
    #length_of_elements;
    #status;
    
    constructor(){
        this.#status = {};
        this.#length_of_elements = 0;
    }

    get Count(){
        return this.#length_of_elements;
    }

    Add(element){
        const lengths = this.#length_of_elements;
        this.#status[lengths] = element; 
        Object.defineProperty(this, lengths,  {
            get: ()=>{
                return this.#status[lengths];
            },
            set: (uj_ertek)=>{
                this.#status[lengths] = uj_ertek;
            },
            
            enumerable: true,
            configurable: true
        });
        this.#length_of_elements++;
    };
    Clear(){
        this.#status = {};
        this.#length_of_elements = 0;

        for(const kulcsok in this){
            delete this[kulcsok];
        }
    };
    
    Contains(vizsg){
        for(let i = 0; i < this.Count; i++){
            if(this.#status[i] == vizsg){
                return true;
            }
        }
        return false;
    };
};

const tomblista = new ArrayList();

const elsoobj = {name: "Paradicsom"};
const masodikobj = {sorszam: 2};
const harmadikobj = {name: "Uborka"};
const negyedikobj = {sorszam: 88};

elsoobj.name = "Lajos";

masodikobj.sorszam = 99;
tomblista.Add(elsoobj);
tomblista.Add(masodikobj);
tomblista.Add(harmadikobj);
tomblista.Add(negyedikobj);

console.log(tomblista.Contains(elsoobj));
console.log(tomblista.Contains(masodikobj));

tomblista.Clear();
console.log(tomblista);

class ArrayHTMLElement extends HTMLElement{
    #tbody
    constructor(){
        super();
    }
    connectedCallback(){
        const table = document.createElement("table");
        this.appendChild(table)
        const thead = document.createElement("thead");
        table.appendChild(thead)
        this.#tbody = document.createElement("tbody");
        table.appendChild(this.#tbody)
    }
    /**
     * 
     * @param {{nev:string, eletkor:number}} item 
     */
    addPersonRow(item){
        const row = document.createElement("tr");
        this.#tbody.appendChild(row);
        
        const td1 = document.createElement("td");
        td1.innerHTML = item.nev;
        row.appendChild(td1);

        const td2 = document.createElement("td");
        td2.innerHTML = item.eletkor;
        row.appendChild(td2);
    }
}

customElements.define('array-table', ArrayHTMLElement);
const arrayTable = new ArrayHTMLElement; // ez lehet baj
document.body.appendChild(arrayTable);
arrayTable.addPersonRow({nev:"Kristof", eletkor: 10})