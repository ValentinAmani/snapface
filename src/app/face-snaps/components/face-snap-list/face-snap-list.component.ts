import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss',
})
export class FaceSnapListComponent implements OnInit {
  faceSnaps$!: Observable<Array<FaceSnap>>;
  isLoading!: boolean;

  constructor(private faceSnapsService: FaceSnapsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps().pipe(
      tap(() => (this.isLoading = false)),
      map((res) => res.faceSnaps)
    );
  }
}
