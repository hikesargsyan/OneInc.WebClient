import {Injectable, NgZone} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {UrlConstant} from "../../core/constants/url.constant";


@Injectable({
  providedIn: 'root'
})
export class EventSourceService {
  private eventSource!: EventSource;

  constructor(private zone: NgZone) {
  }

  getEventSource(url: string, options: EventSourceInit): EventSource {
    return new EventSource(url, options);
  }


  processServerSentEvents(url: string): Observable<Event> {
    this.eventSource = this.getEventSource(url, {withCredentials: true});

    return new Observable((subscriber: Subscriber<Event>) => {
      this.eventSource.onerror = error => {
        this.zone.run(() => subscriber.error(error));
      };

      this.eventSource.onmessage = message => {
        this.zone.run(() => subscriber.next(message.data));
      }

    });
  }

  closeServerSentEvents(): void {
    if (!this.eventSource) {
      return;
    }
    this.eventSource.close();
  }
}
