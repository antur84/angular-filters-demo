import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { BlogPostsFiltersModule } from './blog-posts-filters/blog-posts-filters.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BlogPostsModule,
    BlogPostsFiltersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
