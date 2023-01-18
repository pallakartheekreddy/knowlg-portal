import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash-es';
import { ContentService } from '../../home/services/content.service';

@Component({
  selector: 'app-v2-player',
  templateUrl: './v2-player.component.html',
  styleUrls: ['./v2-player.component.css']
})
export class V2PlayerComponent implements OnInit {
  playerConfig = {};
  mimeType: any;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public contentService: ContentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.contentService.getContent(params['id'], params['mimeType']).subscribe(content => {
        this.contentService.preparePlayerConfig(content).subscribe((data) => {
          this.playerConfig =  data;
        });
      }, (err) => {
        console.log(err);
      });
      this.mimeType = params.mimeType;

    });
  }

  playerEvent(event) {
    const eventType = _.get(event, 'detail.edata.type');
    switch (eventType) {
      case 'EXIT':
        this.router.navigate(['/home/contentList/' + this.mimeType]);
        break;
    }
  }

}