import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    var isItemPresent=false;
    debugger;
    if(this.cartItemList.length>0){
     for(var i=0;i<this.cartItemList.length;i++){
        if(this.cartItemList[i].id==product.id){ 
          // this.cartItemList[i].quantity=this.cartItemList[i].quantity+1;
          alert("This item is already added to cart.");
          isItemPresent=true;
          break;
        }
                            
      }
      if(!isItemPresent){
        this.cartItemList.push(product);
      }
    }else{
      this.cartItemList.push(product);
    }
    
    //this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

    addqty(item: any){
      this.cartItemList.next(this.cartItemList);
    }
  
    subqty(item: any){
      this.cartItemList.map((a:any, index:any)=>{
        if(item.id==a.id){
          this.cartItemList.splice(index,1);
          
        }
      })
      this.cartItemList.next(this.cartItemList);
    }
    updateqty(item:any){
      this.cartItemList.map((a:any, index:any)=>{

      })
    }

  replaceCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  redirectToProductPage(){
    location.href="/products";
}
}
