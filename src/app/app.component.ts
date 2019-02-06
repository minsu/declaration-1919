import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  classList = document.getElementsByTagName('body')[0].classList;
  langs = [
    ["kr", "원문"],
    ["ko", "현대문"],
    ["en", "English"],
    ["jp", "日本語"]
  ];

  // returns # of langs in class list
  private langCount(): number {
    let count = 0;
    this.langs.forEach( lang => {
      if (this.classList.contains(lang[0])) {
        count ++;
      }
    });
    return count;
  }

  // returns the foremost lang from class list
  // (caution) must make sure it has one or more langs
  private firstLang(): string {
    let found = false;

    for (const cls of this.classList as any) {
      for (const lang of this.langs) {
        if (lang[0] == cls) {
          return cls;
        }
      }
    }
    console.error("critical: no active lang(s)");
    return "";
  }

  isActive(cls: string): boolean {
    return this.classList.contains(cls);
  }

  toggle(cls: string): void {
    if (this.classList.contains(cls)) {

      // case  : currently one language active &&
      //         the toggle on that language
      // action: ignore
      if (this.langCount() == 1) {
        return;
      }

      // case  : currently more than one languages active &&
      //         the toggle on one of those
      // action: deactivate the language
      this.classList.remove(cls);
    } else {
      // case  : two languages are active &&
      //         another language is being turned on
      // action: deactivate the oldest language
      if (this.langCount() == 2) {
        let first = this.firstLang();
        this.classList.remove(first);
      }

      // case  : one language is active &&
      //         another language is being turned on
      // action: activate the language
      this.classList.add(cls);
    }
  }

  ngOnInit(): void {
    // default active languages (KR, KO)
    this.toggle('kr');
    this.toggle('ko');
    document.getElementsByTagName('body')[0].removeAttribute('style');
  }
}
