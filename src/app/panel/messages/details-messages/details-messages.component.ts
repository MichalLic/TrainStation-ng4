import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../../data-storage.service';
import {Message} from '../../../message';

@Component({
  selector: 'app-details-messages',
  templateUrl: './details-messages.component.html',
  styleUrls: ['./details-messages.component.scss']
})
export class DetailsMessagesComponent implements OnInit, OnDestroy {
  @Input() detail: Message;
  @Input() index;
  @Input() messages: Message[];
  isEdited: boolean = false;
  canSave: boolean = false;

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
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
  this.dataStorageService.editMessages(this.detail.id, this.detail)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    this.isEdited = !this.isEdited;
    this.canSave = !this.canSave;
  }

  onRemove() {
    this.messages.splice(this.index, 1);
    this.dataStorageService.removeMessage(this.detail.id)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}

