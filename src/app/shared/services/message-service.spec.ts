import { TestBed } from '@angular/core/testing';
import { Message } from '../../financial-products/models/messages';
import { MessageService } from './message-service';

describe('MessageServiceService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show message and hide after the specified time', () => {
    const m: Message = { text: 'example message', status: 'success', active: true };
    service.show(m.text, m.status, 3000);
    service.message$.subscribe((message) => {
      expect(message).toEqual(m);
    });
    jest.advanceTimersByTime(3000);
    service.message$.subscribe((m) => expect(m?.active).toBe(false));
  });

  it('should keep alive if timer 0', () => {
    const m: Message = { text: 'example keep alive', status: 'error', active: true };
    service.show(m.text, m.status, 0);
    jest.advanceTimersByTime(3000);
    service.message$.subscribe((m) => expect(m?.active).toBe(true));
  });

  it('should active false when call hide()', () => {
    const m: Message = { text: 'example keep alive', status: 'error', active: true };
    service.hide();
    service.message$.subscribe((m) => expect(m?.active).toBe(false));
  })
});
