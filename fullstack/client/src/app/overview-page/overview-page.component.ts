import {
  Component,
  OnInit,
} from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs/index';
import { OverviewPage } from '../shared/interfaces';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html'
})
export class OverviewPageComponent implements OnInit {
  data$: Observable<OverviewPage>;

  yesterday = new Date();

  constructor(private service: AnalyticsService) {}

  ngOnInit() {
    this.data$ = this.service.getOverview();

    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }
}
