
import {TestBed, async, ComponentFixture} from '@angular/core/testing'
import { SessionListComponent } from './session-list.component'
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { VoterService } from './voter.service'
import { AuthService } from 'src/app/user/auth.service'
import { UpvoteComponent } from './upvote.component'
import { DurationPipe } from '..'
import { CollapsibleWellComponent } from 'src/app/common'
import { By } from '@angular/platform-browser'

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element: HTMLElement,
    debugEl: DebugElement

    beforeEach(async(() => {
        let mockAuthService = {
            isAuthenticated: () => true,
            currentUser: { userName: 'Moi'}
        }
        let mockVoterService = {
            hasVoted: () => true
        }

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                // UpvoteComponent,
                DurationPipe,
                // CollapsibleWellComponent
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService},
                { provide: VoterService, useValue: mockVoterService}
            ],
            schemas: [ NO_ERRORS_SCHEMA]
        })
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent)
        component = fixture.componentInstance
        debugEl = fixture.debugElement
        element = fixture.nativeElement
    })

    describe('initial display', () => {
        it('should have the correct session title', () => {
            component.sessions = [
                {id: 3, name: 'Session 1', presenter: 'Moi',
            duration: 1, level: 'beginner', abstract: 'abstract', voters: ['sally', 'wilma']}]
            component.filterBy = 'all'
            component.sortBy = 'name'
            component.eventId = 4
            
            component.ngOnChanges()
            fixture.detectChanges()

            expect(element.querySelector('[well-title]').textContent).toContain('Session 1')
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1')
        })
    })
})