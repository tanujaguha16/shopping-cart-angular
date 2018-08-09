export class FormData {
    box: string = '';
    price : number = 0;
    item: { count: number, name: string, price:number }[] =[];
    quantity : number = 1;
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