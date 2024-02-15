import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingSignal = signal<boolean>(false);
  setLoading(enable: boolean) {
    this.loadingSignal.set(enable);
  }

  get loading() {
    return this.loadingSignal();
  }
}
