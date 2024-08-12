import { Injectable } from '@angular/core';
import { Message, StatusMsg } from '../../financial-products/models/messages';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<Message | null>(null)
  message$ = this.messageSubject.asObservable();

  constructor() { }

  show(text: string, status: StatusMsg, keepAlive: number = 3000) {
    const m: Message = { text, status, active: true};
    this.messageSubject.next(m);
    if (keepAlive) {
      setTimeout(() => this.hide(), keepAlive)
    }
  }

  hide() {
    const m = this.messageSubject.value;
    if (m) {
      this.messageSubject.next({...m, active: false });
    }
  }
}
