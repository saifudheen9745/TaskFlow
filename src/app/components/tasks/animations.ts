import { animate, style, transition, trigger } from '@angular/animations';

export const listAnimation = trigger('move', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(1000, style({ opacity: 1 })),
  ]),
  transition(':leave', [animate(300, style({ opacity: 0, height: 0 }))]),
]);
