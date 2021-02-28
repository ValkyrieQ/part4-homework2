import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  currencyList: string[];
  sourceCurrency: number;
  targetCurrency: number;
  sourceNumber: string;
  targetNumber: string;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      sourceAmount: 0,
      targetAmount: 0,
      sourceCurrencyRate: 0,
      targetCurrencyRate: 0,
    });
  }

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
    this.form.patchValue({ targetAmount: 0 });
  }

  calculate() {
    let calculateAmount: number =
      (this.form.get('sourceAmount').value *
        this.form.get('targetCurrencyRate').value) /
      this.form.get('sourceCurrencyRate').value;
    this.form.patchValue({ targetAmount: calculateAmount.toFixed(2) });
  }
}
