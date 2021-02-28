import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currencyList: string[];
  sourceCurrency: number;
  targetCurrency: number;
  sourceNumber: string;
  targetNumber: string;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.currencyList = [];
    this.httpClient
      .get('https://api.exchangeratesapi.io/latest')
      .subscribe((res) => {
        this.currencyList = res['rates'];
      });
  }

  currentChanged() {
    this.reset();
  }

  reset() {
    this.targetNumber = '';
  }

  calculate() {
    this.reset();
    this.targetNumber = (
      (parseFloat(this.sourceNumber) * this.targetCurrency) /
      this.sourceCurrency
    ).toFixed(2);
    // console.log(JSON.stringify(this.sourceCurrency));
  }
}
