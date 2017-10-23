import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataStorageService} from '../../data-storage.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('idAdd') idAdd;
  @ViewChild('messageAdd') messageAdd;
  messagesSubscription: Subscription;
  messages: any;
  messageObject;
  newMessage: string;
  newId: number;


  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.messagesSubscription = this.dataStorageService.getMessages()
      .subscribe(data => {
        console.log(data);
        this.messages = data;
        console.log(this.messages);
      });
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }

  onAdd() {
    this.getFieldsValues();
    this.messages.push(this.messageObject);
    this.dataStorageService.addMessages(this.newId, this.messageObject)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error),
      );
  };


  getFieldsValues() {
    this.newId = this.messages.length;
    this.newMessage = this.messageAdd.nativeElement.value;
    this.messageObject = {
      message: this.newMessage,
      id: this.newId,
    };
  }

}
