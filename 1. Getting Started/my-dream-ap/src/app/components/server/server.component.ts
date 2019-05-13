import { Component } from '@angular/core';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        .online{
            color: white;
        }
    `]
})
export class ServerComponent {
    serverId: number = 10;
    serverState: string = 'offline';

    constructor(){
        this.serverState = Math.random() > 0.5 ? 'online' : 'offline'
    }
    
    getServerStatus() {
        return this.serverState;
    }

    gerColor(){
        return this.serverState === 'online' ? 'green' : 'red'
    }
}