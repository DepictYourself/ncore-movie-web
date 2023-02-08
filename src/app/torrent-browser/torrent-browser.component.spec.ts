import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentBrowserComponent } from './torrent-browser.component';

describe('TorrentBrowserComponent', () => {
  let component: TorrentBrowserComponent;
  let fixture: ComponentFixture<TorrentBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorrentBrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorrentBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
