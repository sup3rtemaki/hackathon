import { Component } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ngOnInit(): void {
    // Inicializando o Firebase
    
    var config = {
      apiKey: "AIzaSyDy1utwuvToLJSCmAYuMDCfXeOJ687qsJI",
      authDomain: "tremdeideias-13596.firebaseapp.com",
      databaseURL: "https://tremdeideias-13596.firebaseio.com",
      projectId: "tremdeideias-13596",
      storageBucket: "tremdeideias-13596.appspot.com",
      messagingSenderId: "736314172578"
    };
    firebase.initializeApp(config);
  }
}

