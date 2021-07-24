import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartprice',
  templateUrl: './cartprice.component.html',
  styleUrls: ['./cartprice.component.css']
})
export class CartpriceComponent implements OnInit {
  @Input() productLen:any;
  @Input() totalPrice:any;
  @Input() totalDeliveryAmt:any;
  @Input() totalPayableAmt:any;
  @Input() currencyCode:any;

  constructor() { }

  ngOnInit(): void {
  }

}
