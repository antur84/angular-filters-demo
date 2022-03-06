import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, switchMap, switchMapTo, tap } from 'rxjs';
import {
  BlogPostsFilterModel,
  BlogPostsFiltersService,
} from '../blog-posts-filters/blog-posts-filters.service';
import { BlogPostsQuery } from './blog-posts.query';
import { BlogPostsStore } from './blog-posts.store';

@Injectable()
export class BlogPostsService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  private allCachedPosts$ = this.httpClient.get<BlogModel[]>(this.url).pipe(shareReplay(1));
  filteredBlogPosts$ = this.blogPostsFiltersService.filtersChanged$.pipe(
    switchMap(filter => this.getBlogPosts(filter))
  );
  constructor(
    private blogPostsFiltersService: BlogPostsFiltersService,
    private blogPostsStore: BlogPostsStore,
    private blogPostsQuery: BlogPostsQuery,
    private httpClient: HttpClient
  ) {}
  private getBlogPosts = (filter: BlogPostsFilterModel) =>
    this.allCachedPosts$.pipe(
      tap(all => this.blogPostsStore.set(all)),
      switchMapTo(this.blogPostsQuery.selectAll()),
      map(all => {
        return all.filter(applyQueryFilter(filter)).filter(applyIdFilter(filter));
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
