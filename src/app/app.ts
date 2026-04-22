import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as model from "./model";
import { ThesesPage } from './theses-page/theses-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThesesPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
