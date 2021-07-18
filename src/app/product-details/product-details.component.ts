import { Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';

import { Product } from '../model/product';
import {CustomerService} from '../services/customer.service';
import {ActivatedRoute} from '@angular/router';
import { ProductService } from '../services/product.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products: Product[] = [];
  uproduct: Product ;
  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    
  )
  { productService.getProducts().subscribe(products => {
    this.products = products;
  });}

  ngOnInit(){
    this.route.params.subscribe((params: Params):void=>{
    const id = (params.id);
    this.productService.getProduct(id).subscribe(products => {
      this.uproduct = products;})
  })}

isTheLast(product: Product): boolean {
  return this.productService.isTheLast(product);
}

updatePrice(event: Product): void {
  this.customerService.addProduct(event);
  this.productService.decreaseStock(event);
}
  isAvailable(product: Product): boolean {
    return this.productService.isAvailable(product);
  }
  
}
