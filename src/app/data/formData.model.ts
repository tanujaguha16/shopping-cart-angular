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
    price : string = '';
    item: { count: number, name: string }[] =[];
    quantity : number = 1;
 

    clear() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.work = '';
        this.street = '';
        this.city = '';
        this.state = '';
        this.price = '';
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
    price : string ='';

}
export class ItemSelector {
    item: { count: number, name: string }[] =[];
    
}
export class Items {
    item_id: number = 1;
    item_name: string = '';
    item_price: string ='';
    selected : boolean = false;
    count: number = 0;
    
}