import { Component, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'custom-components';
  showBanner = true;

  constructor (private platform: Platform) {}

  ngOnInit() {
    // Detect if the user uses IE as browser
    if (this.platform.EDGE || this.platform.TRIDENT) {
      this.showBanner = true;
    }
    else this.showBanner = false;

    console.log('platform firefox', this.platform.FIREFOX)
    //* Detect IE
    console.log('platform trident', this.platform.TRIDENT)
    //* Note! Since version 79 EDGE uses Blink browser engine, so this option works only for old EDGE versions.
    console.log('platform edge', this.platform.EDGE)
    //* Detect Chrome (and Edge v79+)
    console.log('platform chrome', this.platform.BLINK)
  }

  isHidden(event: boolean) {
    this.showBanner = event;
  }

}
