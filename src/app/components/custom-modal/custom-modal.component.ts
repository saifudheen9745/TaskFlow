import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
})
export class CustomModalComponent {
  @Input() showModal: boolean = false
  @Input() modalName: string
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter()

  modalClose(){
    this.closeModal.emit(!this.showModal)
  }
}
