import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../data-storage.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit, OnDestroy {
  messagesSubscription: Subscription;
  messages: any;
  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.messagesSubscription = this.dataStorageService.getMessages()
      .subscribe(data => {
        console.log(data);
        this.messages = data;
      });
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }
}
