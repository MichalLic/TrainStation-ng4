import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../../data-storage.service';
import {Subscription} from 'rxjs/Subscription';
import {Message} from '../../message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('idAdd') idAdd;
  @ViewChild('messageAdd') messageAdd;
  messagesGetSubscription: Subscription;
  messagesAddSubscription: Subscription;
  canAdd: boolean = false;
  messages: Message[];
  messageObject: Message;
  newMessage: string;
  newId: number;
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
    if (this.f.valid) {
      this.getFieldsValues();
      this.messages.push(this.messageObject);
      this.messagesAddSubscription = this.dataStorageService.addMessage(this.messages)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error),
        );
      this.addInit();
    }
  }

  getFieldsValues() {
    this.messageObject = {
      message: this.newMessage,
      id: this.newId,
    };
  }
}
