import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogPostsComponent } from './blog-posts.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BlogPostsComponent],
  exports: [BlogPostsComponent],
})
export class BlogPostsModule {}
