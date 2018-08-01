import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { } from '@types/googlemaps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  miPosicion: google.maps.LatLng;
  miMarcador: google.maps.Marker;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  ngOnInit() {
    this.startGoogleMap();
    this.escucharGPS();
  }

  startGoogleMap() {
    const mapProp = {
        center: new google.maps.LatLng(-0.224710, -78.516763),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.iniciarMarcadores();
  }

  obtenerMiPosicion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.miPosicion = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.actualizarMarcadorMio();
     }).catch((error) => {
       console.log(error);
     });
  }

  escucharGPS() {
    this.escuchando();
    setTimeout(() => {
      this.escucharGPS();
      }, 15000);
  }

  escuchando() {
    this.obtenerMiPosicion();
  }

  actualizarMarcadorMio() {
    this.miMarcador.setPosition(this.miPosicion);
  }

  iniciarMarcadores() {
    this.miMarcador = new google.maps.Marker({
      position: new google.maps.LatLng(-0.224710, -78.516763),
      map: this.map,
      draggable: false
    });
    this.obtenerMiPosicion();
  }
}
