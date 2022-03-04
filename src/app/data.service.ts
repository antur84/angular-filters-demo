import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private httpClient: HttpClient) {}

  getBlogPosts = () => this.httpClient.get<BlogModel[]>(this.url);
}

export interface BlogModel {
  id: number;
  title: string;
  body: string;
  userId: number;
}
