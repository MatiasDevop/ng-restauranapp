import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurantModelObj:RestaurantData = new RestaurantData;;
  allRestaurantData:RestaurantData[]=[];

  constructor(private formBuilder: FormBuilder,
        private api:ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getAllData();
  }
  //Noew Subcribing our data with is maped via services..

  addRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res =>{
      console.log(res);
      alert("Restaurant records Added successfull");
      this.formValue.reset();
    },
    err =>{
      alert("An error ocurred..");
    })
  }

  getAllData(){
    this.api.getRestaurant().subscribe(res =>{
        this.allRestaurantData = res;
    })
  }

  deleteRestaurant(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res =>{
      alert("Restaurant records deleted");
      this.getAllData();
    })
  }

  onEditRestaurant(data:any){
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res =>{
      alert("Restaurant Records Updated ")
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData();
    })
  }
}
