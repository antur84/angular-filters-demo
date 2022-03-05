import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { BlogPostsFilterModel } from './blog-posts-filters/blog-posts-filters.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  private posts$ = this.httpClient.get<BlogModel[]>(this.url).pipe(shareReplay(1));
  constructor(private httpClient: HttpClient) {}

  getBlogPosts = (filter: BlogPostsFilterModel) =>
    this.posts$.pipe(
      map(posts => {
        return posts.filter(applyQueryFilter(filter)).filter(applyIdFilter(filter));
      })
    );
}

export interface BlogModel {
  id: number;
  title: string;
  body: string;
  userId: number;
}
function applyIdFilter(
  filter: BlogPostsFilterModel
): (value: BlogModel, index: number, array: BlogModel[]) => boolean {
  return post => (filter.id ? post.id === filter.id : true);
}

function applyQueryFilter(
  filter: BlogPostsFilterModel
): (value: BlogModel, index: number, array: BlogModel[]) => boolean {
  return post =>
    filter.query ? post.body.toLocaleLowerCase().includes(filter.query.toLocaleLowerCase()) : true;
}
