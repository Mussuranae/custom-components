import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'custom-components';
  showBanner = true;

  ngOnInit() {
    // Detect if the user uses IE as browser
    if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("rv:") > -1
    /*|| document['documentMode'] <= this isn't recongnized by typescript*/) {
      this.showBanner = true;
    }
    else this.showBanner = false;
  }

  isHidden(event: boolean) {
    this.showBanner = event;
  }
}
