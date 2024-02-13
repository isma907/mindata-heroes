import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../_interfaces/hero.interface';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'mindata-hero-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  @Output() deleteHero = new EventEmitter<Hero>();

  delete(hero: Hero) {
    this.deleteHero.emit(hero);
  }
}
