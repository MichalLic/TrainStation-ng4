import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../../data-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {Message} from '../../message';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
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
  messages: Message[];
  stations;
  messageObject: Message;
  newMessage: string;
  newId: number;
  isUsedId: boolean = false;
  canAdd: boolean = false;
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
  }

  addInit() {
    this.canAdd = !this.canAdd;
  }

  onAdd(point) {
    this.isUsedId = false;
    this.getFieldsValues();
    this.checkId(this.newId);
    if (this.f.valid && !this.isUsedId) {
      this.messages.push(this.messageObject);
      this.messagesAddSubscription = this.dataStorageService.addMessage(this.messages, point)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error),
        );
      this.addInit();
      this.resetForm();
      this.showSuccessMessage();
    }
  }

  getFieldsValues() {
    this.onCreatedTime();
    this.messageObject = {
      message: this.newMessage,
      id: this.newId,
      created: this.createdMessageTime,
      updated: this.createdMessageTime,
    };
  }

  resetForm() {
    this.f.reset();
  }

  checkId(id) {
    const value = Observable.from(this.messages);
    value
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
    this.createdMessageTime = new Date();
  }
}
