import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface Concept {
  id: number,
  title: string,
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class ConceptsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/concepts'
  }

  getAll(): Promise<Concept[]> {
    return this.httpClient.get<Concept[]>(this.baseUrl).toPromise();
  }

  getConceptsByPage(pPagina): Promise<Concept[]> {
    return this.httpClient.get<Concept[]>(`${this.baseUrl}/page/${pPagina}`).toPromise();
  }

  insertFavorite(pId): Promise<any> {
    /*   const httpOptions = {
        "headers": new HttpHeaders({
          'Content-Type': 'application/json'
        })
      } */
    console.log(pId);
    const favoriteConcept = { "conceptId": pId }


    return this.httpClient.post<any>(`${this.baseUrl}/favorite`, favoriteConcept).toPromise();
  }

}


