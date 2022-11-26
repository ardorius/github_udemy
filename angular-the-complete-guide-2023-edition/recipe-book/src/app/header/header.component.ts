import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  
  // @Output() featureSelected = new EventEmitter<string>();
  private userSub: Subscription;//subscription for check status of user

  
  constructor(
    private dataStorageService: DataStorageService, 
    private authService: AuthService
    ) { }

  ngOnInit() {
    console.log('ngOnInit header');
    console.log('isAuthenticated: ' + this.isAuthenticated);

    this.userSub = this.authService.user.subscribe(user => {
      // this.isAuthenticated = !user ? false : true;
      this.isAuthenticated = !!user; //same written as before, but shortcut
      console.log('!user: ' + !user);
      console.log('!!user: ' + !!user);
    });
    console.log('isAuthenticated: ' + this.isAuthenticated);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    console.log('onDestroy header');
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();//need to be added subscribe because we remove it from service
  }
  // onSelect(feature:string){
  //   this.featureSelected.emit(feature);
  // }
}
