import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'blog-posts-filters',
    templateUrl: 'blog-posts-filters.component.html',
    styleUrls: ['blog-posts-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostsFiltersComponent {

}
