import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  constructor() {}

  @Input() message: string;
  @Output() acknowledge = new EventEmitter<void>();

  ngOnInit(): void {}

  onClose() {
    this.acknowledge.emit();
  }
}
