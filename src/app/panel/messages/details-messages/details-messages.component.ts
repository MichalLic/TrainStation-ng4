import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../../data-storage.service';

@Component({
  selector: 'app-details-messages',
  templateUrl: './details-messages.component.html',
  styleUrls: ['./details-messages.component.scss']
})
export class DetailsMessagesComponent implements OnInit, OnDestroy {
  @Input() detail;
  @Input() index;
  @Input() messages;
  isEdited: boolean = false;
  canSave: boolean = false;

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    console.log(this.detail);
  }

  ngOnDestroy() {
  }

  onNameChange(value) {
    this.detail.message = value;
    console.log(this.detail);
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
  this.dataStorageService.editMessages(this.index, this.detail)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    this.isEdited = !this.isEdited;
    this.canSave = !this.canSave;
    console.log(this.detail);
    console.log(this.index);
  }

  onRemove() {
    console.log(this.index);
    this.messages.splice(this.index, 1);
    this.dataStorageService.removeMessage(this.detail.id)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}

