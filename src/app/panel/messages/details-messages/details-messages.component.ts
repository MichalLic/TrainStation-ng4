import {Component, Input, OnInit} from '@angular/core';
import {DataStorageService} from '../../../data-storage.service';
import {Message} from '../../../message';

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

  constructor(private dataStorageService: DataStorageService) {
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
    this.dataStorageService.editMessages(this.index, this.detail, 'hello')
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
    this.dataStorageService.removeMessage(this.messages, 'hello')
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  onCreatedTime() {
    return this.createdMessageTime = new Date().toString();
  }
}
