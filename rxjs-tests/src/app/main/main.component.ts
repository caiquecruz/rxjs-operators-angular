import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { find, filter, merge, delay, reduce, map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  myArray: Array<any> = [1, 2, 3, 4, 'Teste 1', 40, 20, 'Teste 2', 8, 9, 'Teste 3'];
  myExtraArray: Array<any> = [10, 30, 50, 70, 10, 20, 'Teste 4', 'Teste 5'];

  constructor() { }

  ngOnInit() {
  }

  getIndex() {
    from(this.myArray).pipe(
      find((i) => i > 10)
    )
    .subscribe((index) => {
      alert(index);
    });
  }

  doFilter() {
    from(this.myArray).pipe(
      filter((i) => typeof i === 'string')
    )
    .subscribe((index) => {
      alert(index);
    });
  }

  doMerge() {
    from(this.myArray).pipe(
      delay(1000),
      merge(this.myExtraArray)
    )
    .subscribe((newArray) => {
      console.log(newArray);
    });
  }

  doFilterAndReduce() {
    from(this.myArray).pipe(
      merge(this.myExtraArray),
      filter((i) => typeof i === 'number'),
      reduce((acc, i) => acc + i)
    )
    .subscribe((reduced) => {
      alert(reduced);
    });
  }

  doTupleMap() {
    from(this.myArray).pipe(
      filter((i) => typeof i === 'number'),
      map(items => {
        return [items * 2, items / 2] as [Number, Number];
      })
    )
    .subscribe((itens) => {
      console.log(itens);
    });
  }

}
