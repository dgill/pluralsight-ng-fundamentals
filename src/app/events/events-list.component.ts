import {Component, OnInit, Inject } from '@angular/core'
import {EventService} from './shared/event.service'
import { Router, ActivatedRoute } from '@angular/router'
import { IEvent } from './shared'
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service'
import { increaseElementDepthCount } from '@angular/core/src/render3/state'


@Component({
    templateUrl: './events-list.component.html',
})


export class EventsListComponent implements OnInit {
    events: IEvent[]

    constructor(private eventService: EventService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.events = this.route.snapshot.data['events']
    }

}
