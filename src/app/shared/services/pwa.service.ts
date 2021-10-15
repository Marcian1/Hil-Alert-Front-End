import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PromptComponent } from 'src/app/prompt-component/prompt-component.component';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})


export class PwaService {
  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform
  ) { }

  public initPwaPrompt() {
    
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        console.log('install service');
        
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(2000)
      .pipe(take(1))
      .subscribe(() => this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }
}