import {Component, Input, OnInit} from '@angular/core';
import {DataStorageService} from '../../../data-storage.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {
  @Input() detail;
  @Input() index;
  @Input() stations;
  isEdited: boolean = false;
  canSave: boolean = false;
  createdMessageTime;

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
  }

  onNameChange(value) {
    this.detail.station = value;
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
    this.dataStorageService.editMessages(this.index, this.detail, 'stations')
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    this.isEdited = !this.isEdited;
    this.canSave = !this.canSave;
  }

  onRemove() {
    this.stations.splice(this.index, 1);
    console.log(this.stations);
    this.dataStorageService.removeMessage(this.stations, 'stations')
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  onCreatedTime() {
    return this.createdMessageTime = new Date().toString();
  }

}
