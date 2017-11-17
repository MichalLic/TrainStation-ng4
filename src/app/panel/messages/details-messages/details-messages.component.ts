import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../message';
import {MessageService} from './message.service';

@Component({
  selector: 'app-details-messages',
  templateUrl: './details-messages.component.html',
  styleUrls: ['./details-messages.component.scss']
})
export class DetailsMessagesComponent implements OnInit {
  @Input() detail: Message;
  @Input() index;
  @Input() messages: Message[];
  isEdited: boolean = false;
  canSave: boolean = false;
  createdMessageTime;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  onNameChange(value) {
    this.detail.message = value;
  }

  onEdit() {
    this.isEdited = !this.isEdited;
    if (this.isEdited === true) {
      this.canSave = !this.canSave;
    } else {
      this.canSave = false;
    }
  }

  onSave() {
    this.detail.updated = this.onCreatedTime();
    this.messageService.editMessages(this.index, this.detail)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    this.isEdited = !this.isEdited;
    this.canSave = !this.canSave;
  }

  onRemove() {
    this.messages.splice(this.index, 1);
    console.log(this.messages);
    this.messageService.removeMessage(this.messages)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  onCreatedTime() {
    return this.createdMessageTime = new Date().toString();
  }
}
