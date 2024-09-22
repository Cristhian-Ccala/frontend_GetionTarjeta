import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tarjeta } from '../models/tarjeta.interface';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private http = inject(HttpClient);

  list() {
    return this.http.get<Tarjeta[]>('http://localhost:8080/api/tarjetas');
  }

  findById(id: number) {
    return this.http.get<Tarjeta>(`http://localhost:8080/api/tarjetas/${id}`);
  }

  create(tarjeta: Tarjeta) {
    return this.http.post<Tarjeta>('http://localhost:8080/api/tarjetas', tarjeta);
  }

  update(tarjeta: Tarjeta) {
    return this.http.put<Tarjeta>('http://localhost:8080/api/tarjetas', tarjeta);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8080/api/tarjetas/${id}`);
  }
}
