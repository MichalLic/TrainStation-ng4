import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../../data-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {Message} from '../../message';
import {Station} from '../../station';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('idAdd') idAdd: ElementRef;
  @ViewChild('messageAdd') messageAdd: ElementRef;
  messagesGetSubscription: Subscription;
  messagesAddSubscription: Subscription;
  stationsGetSubscription: Subscription;
  stationsAddSubscription: Subscription;
  messages: Message[];
  messageObject: Message;
  stations: Station[];
  stationObject: Station;
  newMessage: string;
  newId: number;
  isUsedId: boolean = false;
  canAddMessage: boolean = false;
  canAddStation: boolean = false;
  successMessage: boolean = false;
  @ViewChild('f') f;
  createdMessageTime;

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.messagesGetSubscription = this.dataStorageService.getMessages()
      .subscribe(data => {
        this.messages = data;
        console.log(this.messages);
      });

    this.stationsGetSubscription = this.dataStorageService.getStations()
      .subscribe(data => {
        this.stations = data;
        console.log(this.stations);
      });
  }

  ngOnDestroy() {
    this.messagesGetSubscription.unsubscribe();
    this.messagesAddSubscription.unsubscribe();
    this.stationsGetSubscription.unsubscribe();
    this.stationsAddSubscription.unsubscribe();
  }

  addInitMessage() {
    this.canAddStation = false;
    this.canAddMessage = !this.canAddMessage;
  }

  addInitStation() {
    this.canAddMessage = false;
    this.canAddStation = !this.canAddStation;
  }

  onAddMessage() {
    this.isUsedId = false;
    this.getMessageFormValue();
    this.checkId(this.newId);
    if (this.f.valid && !this.isUsedId) {
      this.messages.push(this.messageObject);
      this.messagesAddSubscription = this.dataStorageService.addMessage(this.messages, 'hello')
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error),
        );
      this.addInitMessage();
      this.resetForm();
      this.showSuccessMessage();
    }
  }

  onAddStation() {
    this.isUsedId = false;
    this.getStationFormValue();
    this.checkId(this.newId);
    if (this.f.valid && !this.isUsedId) {
      this.stations.push(this.stationObject);
      this.stationsAddSubscription = this.dataStorageService.addMessage(this.stations, 'stations')
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error),
        );
      this.addInitStation();
      this.resetForm();
      this.showSuccessMessage();
    }
  }

  getMessageFormValue() {
    this.onCreatedTime();
    this.messageObject = {
      message: this.newMessage,
      id: this.newId,
      created:  this.onCreatedTime(),
      updated:  this.onCreatedTime()
    };
  }

  getStationFormValue() {
    this.onCreatedTime();
    this.stationObject = {
      station: this.newMessage,
      id: this.newId,
      created: this.onCreatedTime(),
      updated: this.onCreatedTime()
    };
  }

  resetForm() {
    this.f.reset();
  }

  checkId(id) {
    const value1$ = Observable.from(this.messages);
    const value2$ = Observable.from(this.stations);

    Observable
      .merge(value1$, value2$)
      .map(val => val.id)
      .filter(val => val === id)
      .subscribe(checkedId => {
        this.isUsedId = true;
      });
  }

  showSuccessMessage() {
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
    }, 3000);
  }

  onCreatedTime() {
    return this.createdMessageTime = new Date().toString();
  }
}
