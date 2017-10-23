import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DataStorageService} from '../../../data-storage.service';

@Component({
  selector: 'app-details-messages',
  templateUrl: './details-messages.component.html',
  styleUrls: ['./details-messages.component.scss']
})
export class DetailsMessagesComponent implements OnInit, OnChanges {
  @Input() detail;
  @Input() index;
  isEdited: boolean = false;
  canSave: boolean = false;

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    console.log(this.detail);
  }

  ngOnChanges(changes) {
  }

  onNameChange(value) {
    this.detail.message = value;
    console.log(this.detail);
  }

  onEdit() {
    this.isEdited = !this.isEdited;
    console.log(this.isEdited);


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
    this.canSave = !this.canSave
    console.log(this.detail);
    console.log(this.index);
  }
}
