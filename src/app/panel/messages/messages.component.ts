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
  addddd = {
    message: 'bbbb'
  };


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
    this.messages.push(this.addddd);
    this.dataStorageService.addMessages(4, this.addddd)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error),
      );
  };
}
