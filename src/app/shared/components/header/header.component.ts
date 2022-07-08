import { Global } from './../../services/global';
import { Component, OnInit } from '@angular/core';
import { CollaspeService } from '../../services/collaspe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userImage: string = 'assets/images/user.png';

  constructor(public _collaspeService: CollaspeService) {}

  ngOnInit(): void {
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    this.userImage =
      (userDetails.imagePath == '' || userDetails.imagePath == null) ? 'assets/images/user.png'
         :Global.BASE_USERS_IMAGES_PATH + userDetails.imagePath;
  }

  collaspeSidebar() {
    this._collaspeService.openNav = !this._collaspeService.openNav;
  }
}
