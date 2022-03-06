import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { BlogModel } from './blog-posts.service';

export interface BlogPostsState extends EntityState<BlogModel, number> {
  store: {
    isPopulated: boolean;
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'blog-posts' })
export class BlogPostsStore extends EntityStore<BlogPostsState> {
  constructor() {
    super({
      store: {
        isPopulated: false,
      },
    });
  }

  updateIsPopulated(isPopulated: boolean) {
    this.update({ store: { isPopulated } });
  }
}
