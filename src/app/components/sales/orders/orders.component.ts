import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { Global } from 'src/app/shared/services/global';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders=[];


  settings = {
    actions: false,

    columns: {
    orderId: {
    title: "Order id"
  },
  orderStatus:{
    title: "Orders status", type:'html'
  },
  paymentDate:{
    title: "payment Date", filter: false
  },
  paymentMethod:{
    title: "payment Method"
  },
  paymentStatus:{
    title: "payment Status",  type:'html'
  },
  shippingAmount:{
    title: "Shipping Amout"
  },
  subTotalAmount:{
    title: "sub Total Amount"
  },
    }
  }
    objCountData = [
      {
        bgColorClass: 'bg-warning card-body',
        fontColorClass: 'font-warning',
        icon: 'navigation',
        title: 'Orders',
        count: 0
      },
      {
        bgColorClass: 'bg-secondary card-body',
        fontColorClass: 'font-secondary',
        icon: 'box',
        title: 'Shipping Amount',
        count: 0
      },
      {
        bgColorClass: 'bg-primary card-body',
        fontColorClass: 'font-primary',
        icon: 'message-square',
        title: 'Cash On Delivery',
        count: 0
      },
      {
        bgColorClass: 'bg-danger card-body',
        fontColorClass: 'font-danger',
        icon: 'users',
        title: 'Cancelled',
        count: 0
      }
    ];
    constructor(private _commonService: CommonService, private _toastr: ToastrService) { }


  ngOnInit(): void {
    this.getOrderList()

  }
  getOrderList(){
    this._commonService.get(Global.BASE_API_PATH + 'PaymentMaster/GetReportManageOrder').subscribe(res => {
      if (res.isSuccess) {
        this.orders= res.data;

    }else{
    }
    });
  }
}
