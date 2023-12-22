import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss',
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>;
  buttonText!: 'Snap !' | 'Unsnap !';
  isLoading!: boolean;

  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.buttonText = 'Snap !';
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId).pipe(
      tap(() => (this.isLoading = false)),
      map((res) => res.faceSnap)
    );
  }

  onSnap(faceSnapId: number) {
    this.isLoading = true;

    if (this.buttonText === 'Snap !') {
      this.faceSnap$ = this.faceSnapsService
        .snapFaceSnap(faceSnapId, 'snap')
        .pipe(
          map((res) => res.faceSnap),
          tap(() => {
            this.isLoading = false;
            this.buttonText = 'Unsnap !';
          })
        );
    } else {
      this.faceSnap$ = this.faceSnapsService
        .snapFaceSnap(faceSnapId, 'unsnap')
        .pipe(
          map((res) => res.faceSnap),
          tap(() => {
            this.isLoading = false;
            this.buttonText = 'Snap !';
          })
        );
    }
  }
}
