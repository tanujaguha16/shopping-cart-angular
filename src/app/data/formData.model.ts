export class FormData {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
    work: string = '';
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    box: string = '';
    price : number = 0;
    item: { count: number, name: string, price:number }[] =[];
    quantity : number = 1;
 

    clear() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.work = '';
        this.street = '';
        this.city = '';
        this.state = '';
        
        this.zip = '';
    }
}

export class Personal {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
}

export class Address {
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
}
export class BoxSelector {
    box: string = '';
    quantity : number = 1;
    price : number =0;

}
export class ItemSelector {
    item: { count: number, name: string, price:number }[] =[];
    
}
export class Items {
    id: number = 1;
    name: string = '';
    price: number =0;
    selected : boolean = false;
    count: number = 0;
    
}