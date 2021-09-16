import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: '[text] informative-banner',
  templateUrl: './informative-banner.component.html',
  styleUrls: ['./informative-banner.component.scss']
})
export class InformativeBannerComponent {

  @Input() text: string = "";
  @Output() showBanner = new EventEmitter<boolean>();

  closeBanner() {
    this.showBanner.emit(false);
  }
}
