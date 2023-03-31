import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
updateqty(_t21: any) {
throw new Error('Method not implemented.');
}

  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  addqty(item:any){
    debugger;
    if(item.quantity< 20){
     item.quantity++;
     this.grandTotal=this.grandTotal+item.price;
     item.total = item.price *item.quantity;
     
  };
}
  subqty(item: any){

    if (item.quantity > 1 && item.quantity!=1) {
      item.quantity--;
      this.grandTotal=this.grandTotal-item.price;
      item.total = item.price *item.quantity;
      this.cartService.updateqty(item);
    }
  }


  replaceItem(item: any){
    this.cartService.replaceCartItem(item);
  }

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

}


