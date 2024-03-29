import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {    
   /*  const serverId = +this.route.snapshot.params['id']
    this.server = this.serversService.getServer(serverId);
    this.route.params
    .subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    ) */

    //Resolver
    this.route.data
      .subscribe(
        (data: Data) => {
          this.server = data['server']
        }
      )
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

}
