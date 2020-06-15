import { ISession } from '../shared'
import { Input, Component, OnChanges } from '@angular/core'
import { AuthService } from 'src/app/user/auth.service'
import { VoterService } from './voter.service'

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[]
    @Input() filterBy: string
    @Input() sortBy: string
    @Input() eventId: number
    visibleSessions: ISession[] = []

    constructor(private authService: AuthService, private voterService: VoterService) {

    }

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy)
            this.sort(this.sortBy)
        }
    }

    toggleVote(session: ISession) {
        const username = this.authService.currentUser.userName

        if (this.userHasVoted(session)) {
            this.voterService.deleteVoter(this.eventId, session, username)
        } else {
            this.voterService.addVoter(this.eventId, session, username)
        }

        if (this.sortBy === 'votes') {
            this.visibleSessions.sort(sortByVoteAsc)
        }
    }

    userHasVoted(session: ISession) {
        return this.voterService.hasVoted(session, this.authService.currentUser.userName)
    }


    sort(sort) {
        if (sort === 'name') {
            this.visibleSessions.sort(sortByNameAsc)
        } else {
            this.visibleSessions.sort(sortByVoteAsc)
        }
    }

    filterSessions(filter) {
        if (filter === 'all') {
            this.visibleSessions = this.sessions.slice(0)
        } else {
            this.visibleSessions = this.sessions.filter(session => session.level.toLocaleLowerCase() === filter)
        }
    }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) {
        return 1
    } else if (s1.name === s2.name) { return 0 } else { return -1 }
}
function sortByVoteAsc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length
}
