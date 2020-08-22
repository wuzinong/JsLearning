import { range,Observable,fromEvent  } from 'rxjs';
import { map, filter,throttleTime,scan } from 'rxjs/operators';

// range(1, 200).pipe(
//   filter(x => x % 2 === 1),
//   map(x => x + x)
// ).subscribe(x => console.log(x));

var button = document.querySelector('button');
fromEvent(button, 'click')
  .subscribe(() => console.log('Clicked!'));

// let count = 0;
// let rate = 1000;
// let lastClick = Date.now() - 1000;
// document.addEventListener('click',()=>{
//     if(Date.now()-lastClick>=rate){
//         console.log(`CLICKED: ${++count} times`);
//         lastClick = Date.now();
//     }
// })

// fromEvent(document,'click')
//     .pipe(
//         throttleTime(1000),
//         map(event => event.clientX),
//         scan((count,clientX)=> count + clientX,0)
//     )
//     .subscribe(count => console.log(count));

// const observable = new Observable(subscriber => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   setTimeout(() => {
//     subscriber.next(4);
//     subscriber.complete();
//   }, 1000);
// });
// console.log('just before subscribe');
// observable.subscribe({
//   next(x) { console.log('got value ' + x); },
//   error(err) { console.error('something wrong occurred: ' + err); },
//   complete() { console.log('done'); }
// });
// console.log('just after subscribe');

const foo = new Observable(subscriber =>{
    console.log('Hello');
    subscriber.next(42);
});

foo.subscriber(x=>{
    console.log(x);
});
foo.subscriber(y=>{
    console.log(y);
});