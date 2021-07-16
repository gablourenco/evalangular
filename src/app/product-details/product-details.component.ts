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

  oneproduct: Product ;
  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
  )
  {}

  ngOnInit(){
    this.route.params.subscribe((params: Params):void=>{
    const id = (params.id);
    this.productService.getProduct(id).subscribe(products => {
      this.oneproduct = products;})
  })}

isTheLast(product: Product): boolean {
  return this.productService.isTheLast(product);
}

updatePrice(event: Product): void {
  this.customerService.addProduct(event);
  this.productService.decreaseStock(event);
}
}
