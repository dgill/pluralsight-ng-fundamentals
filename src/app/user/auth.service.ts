import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tap, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}
    currentUser: IUser
    logout() {
        this.currentUser = undefined
        const options = { headers: new HttpHeaders({'content-Type': 'application/json'})}
        return this.http.post('/api/logout', {}, options)
    }

    loginUser(userName: string, password: string) {

        const loginInfo = { username: userName, password: password }
        const options = { headers: new HttpHeaders({'content-Type': 'application/json'})}

        return this.http.post('/api/login', loginInfo, options)
            .pipe(tap(data => {
                this.currentUser = <IUser>data['user']
            }))
            .pipe(catchError(err => {
                return of(false)
            }))

        // this.currentUser = {
        //     id: 1,
        //     userName: username,
        //     firstName: 'John',
        //     lastName: 'Roach'
        // }
    }

    isAuthenticated() {
        return !!this.currentUser
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

        const options = { headers: new HttpHeaders({'content-Type': 'application/json'})}
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options)
    }

    checkAuthenticationStatus() {
        this.http.get('/api/currentIdentity')
        .pipe(tap(data => {
            if (data instanceof Object) {
                this.currentUser = <IUser>data
            }}))
        .subscribe()
      }
}
