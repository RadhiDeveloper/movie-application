import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  @Output()
  openMoviePopup: EventEmitter<any> = new EventEmitter(true);
  constructor() {}
}
