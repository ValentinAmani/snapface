import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { host } from './host.service';

@Injectable({ providedIn: 'root' })
export class FaceSnapsService {
  constructor(private http: HttpClient) {}

  getAllFaceSnaps(): Observable<any> {
    return this.http.get<any>(`${host}/facesnaps`);
  }

  getFaceSnapById(faceSnapId: number): Observable<any> {
    return this.http.get<any>(`${host}/facesnaps/${faceSnapId}`);
  }

  snapFaceSnap(
    faceSnapId: number,
    snapType: 'snap' | 'unsnap'
  ): Observable<any> {
    return this.http.put<any>(`${host}/facesnaps/${faceSnapId}`, {
      snapType: snapType,
    });
  }

  addFaceSnap(formValue: {
    title: string;
    description: string;
    imageUrl: string;
    location?: string;
  }): Observable<any> {
    return this.http.post<any>(`${host}/facesnaps`, formValue);
  }
}
