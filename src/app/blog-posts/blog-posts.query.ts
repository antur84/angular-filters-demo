import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BlogPostsState, BlogPostsStore } from './blog-posts.store';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsQuery extends QueryEntity<BlogPostsState> {
  constructor(store: BlogPostsStore) {
    super(store);
  }
}
