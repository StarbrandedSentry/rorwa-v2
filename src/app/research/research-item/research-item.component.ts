import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Research } from '../../models/research.model';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-research-item',
  templateUrl: './research-item.component.html',
  styleUrls: ['./research-item.component.scss']
})
export class ResearchItemComponent implements OnInit {
  research$;
  research: Research;
  pdfUrl: string;

  page = 1;

  constructor(
    private afFirestore: AngularFirestore,
    private ar: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.research$ = this.ar.paramMap.pipe(
      switchMap(params => {
        return this.afFirestore
          .doc('researches/' + params.get('id'))
          .snapshotChanges()
          .pipe(
            map(a => {
              const data = a.payload.data() as Research;
              data.id = a.payload.id;
              return data;
            })
          );
      })
    );
    this.research$.subscribe(research => {
      this.research = research;
      this.pdfUrl = this.research.downloadURL;
    });
  }

  changePage(direction: string) {
    if (direction === 'right') {
      this.page++;
    } else if (direction === 'left') {
      if (this.page === 0) {
        return;
      }
      this.page--;
    }
  }

  onDownloadClick() {
    window.open(this.pdfUrl, '_blank');
  }
}
