import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';

import {Station} from '../../station';
import {Message} from '../../message';
import {StationService} from './stations/station.service';
import {MessageService} from './details-messages/message.service';

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
  isUsedId: boolean = false;
  canAddMessage: boolean = false;
  canAddStation: boolean = false;
  successMessage: boolean = false;
  @ViewChild('f') f;
  createdMessageTime;
  myForm: FormGroup;

  constructor(private stationsService: StationService, private messageService: MessageService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.messagesGetSubscription = this.messageService.getMessages()
      .subscribe(data => {
        this.messages = data;
        console.log(this.messages);
      });

    this.stationsGetSubscription = this.stationsService.getStations()
      .subscribe(data => {
        this.stations = data;
        console.log(this.stations);
      });

    this.myForm = this.fb.group({
      idAdd: ['', Validators.required],
      messageAdd: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form);
    console.log('valid?', form.valid);
    console.log('ID', form.value.idAdd);
    console.log('mess', form.value.messageAdd);
    if (this.canAddMessage) {
      this.onAddMessage();
    }
    if (this.canAddStation) {
      this.onAddStation();
    }
  }

  ngOnDestroy() {
    if (this.messagesGetSubscription) {
      this.messagesGetSubscription.unsubscribe();
    }
    if (this.messagesGetSubscription) {
      this.messagesGetSubscription.unsubscribe();
    }
    if (this.messagesAddSubscription) {
      this.messagesAddSubscription.unsubscribe();
    }
    if (this.stationsAddSubscription) {
      this.stationsAddSubscription.unsubscribe();
    }
  }

  addInitMessage() {
    this.canAddStation = false;
    this.canAddMessage = !this.canAddMessage;
    this.resetForm();
  }

  addInitStation() {
    this.canAddMessage = false;
    this.canAddStation = !this.canAddStation;
    this.resetForm();
  }

  onAddMessage() {
    this.isUsedId = false;
    this.getMessageFormValue();
    this.checkId(this.myForm.value.idAdd);
    if (this.myForm.valid && !this.isUsedId) {
      this.messages.push(this.messageObject);
      this.messagesAddSubscription = this.messageService.addMessage(this.messages)
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
    this.checkId(this.myForm.value.idAdd);
    if (this.myForm.valid && !this.isUsedId) {
      this.stations.push(this.stationObject);
      this.stationsAddSubscription = this.stationsService.addMessage(this.stations)
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
      message: this.myForm.value.messageAdd,
      id: this.myForm.value.idAdd,
      created: this.onCreatedTime(),
      updated: this.onCreatedTime()
    };
  }

  getStationFormValue() {
    this.onCreatedTime();
    this.stationObject = {
      station: this.myForm.value.messageAdd,
      id: this.myForm.value.idAdd,
      created: this.onCreatedTime(),
      updated: this.onCreatedTime()
    };
  }

  resetForm() {
    this.myForm.reset();
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
