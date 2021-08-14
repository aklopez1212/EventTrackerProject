import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert';
import { ConcertService } from 'src/app/services/concert.service';

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.css']
})
export class ConcertListComponent implements OnInit {

  concerts: Concert[] = [];

  constructor(private concertService: ConcertService) { }

  ngOnInit(): void {
    this.loadConcerts();
  }

  loadConcerts(){
    this.concertService.index().subscribe(
      concerts => {
        this.concerts = concerts;
      },
      noConcerts => {
        console.error('Error loading concert list.')
      }
    )
  }
}
