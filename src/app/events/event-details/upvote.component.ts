import { Input, Component, Output, EventEmitter } from '@angular/core'
import { ISession } from '..'
import { AuthService } from 'src/app/user/auth.service'

@Component({
    selector: 'upvote',
    styleUrls: ['./upvote.component.css'],
    template: `
        <div class="votingWidgetContainer pointable" (click)="onClick()">
            <div class="well votingWidget">
                <div class="votingButton">
                    <i class="glyphicon glyphicon-heart" [style.color]="iconColor" ></i>
                </div>
                <div class="badge badge-inverse votingCount">
                    <div>{{count}}</div>
                </div>
            </div>
        </div>
    `
})

export class UpvoteComponent {
    @Input() count: number
    @Input() set voted(val) {
        this.iconColor = val ? 'red' : 'white'
    }
    @Output() vote = new EventEmitter()
    iconColor: string

    constructor(private authService: AuthService) {

    }

    onClick() {
        this.vote.emit({})
    }
}
