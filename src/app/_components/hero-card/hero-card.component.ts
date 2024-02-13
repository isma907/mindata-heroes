import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../_interfaces/hero.interface';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { APP_ROUTES_ENUM } from '../../app.routes';

@Component({
  selector: 'mindata-hero-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  @Output() deleteHero = new EventEmitter<Hero>();
  appRoute = APP_ROUTES_ENUM;
  delete(hero: Hero) {
    this.deleteHero.emit(hero);
  }
}
