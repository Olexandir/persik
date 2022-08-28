import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

export class BackService {

  public backEvent: Subject<any> = new Subject<any>();

  pathStatuses: PathStatus[] = [
    {
      path: 'tv-review',
      status: 0
    }
  ];

  constructor(private router: Router) {}

  goToMain(): void {
    this.router.navigate(['tv-review']);
  }
}

interface PathStatus {
  path: string;
  status: number;
}
