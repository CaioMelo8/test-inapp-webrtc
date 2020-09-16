import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected url: string;

  constructor(
    private androidPermissions: AndroidPermissions,
    private inAppBrowser: InAppBrowser,
    private domSanitizer: DomSanitizer,
    private platform: Platform
  ) {}

  openVideocall(url: string) {
    if (!url) {
      return;
    }

    this.androidPermissions
      .requestPermissions([
        this.androidPermissions.PERMISSION.CAMERA,
        this.androidPermissions.PERMISSION.CAPTURE_AUDIO_OUTPUT,
        this.androidPermissions.PERMISSION.RECORD_AUDIO,
        this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
      ])
      .then(() => {
        const options: InAppBrowserOptions = {
          zoom: 'no',
          toolbar: 'yes',
          toolbarcolor: '#e7ebed',
          hideurlbar: 'yes',
          hidenavigationbuttons: 'yes',
          location: 'yes',
          usewkwebview: 'yes',
          allowInlineMediaPlayback: 'yes',
        };
        const target = this.platform.is('cordova') ? '_self' : '_system';

        this.inAppBrowser.create(url, target, options).show();
      });
  }

  sanitizeURL(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
