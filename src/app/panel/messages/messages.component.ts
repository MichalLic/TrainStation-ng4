import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../../data-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {Message} from '../../message';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

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
  canAdd: boolean = false;
  messages: Message[];
  messageObject: Message;
  newMessage: string;
  newId: number;
  isUsedId: boolean = false;
  @ViewChild('f') f;

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.messagesGetSubscription = this.dataStorageService.getMessages()
      .subscribe(data => {
        this.messages = data;
        console.log(this.messages);
      });

  }

  ngOnDestroy() {
    this.messagesGetSubscription.unsubscribe();
    this.messagesAddSubscription.unsubscribe();
  }

  addInit() {
    this.canAdd = !this.canAdd;
  }

  onAdd() {
    this.isUsedId = false;
    this.getFieldsValues();
    this.checkId(this.newId);
    if (this.f.valid && !this.isUsedId) {
      this.messages.push(this.messageObject);
      this.messagesAddSubscription = this.dataStorageService.addMessage(this.messages)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error),
        );
      this.addInit();
      this.resetForm();
    }
  }

  getFieldsValues() {
    this.messageObject = {
      message: this.newMessage,
      id: this.newId,
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
}
