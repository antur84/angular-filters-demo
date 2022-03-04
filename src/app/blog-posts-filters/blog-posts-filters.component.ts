import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FiltersService } from '../filters/filters.service';

@Component({
    selector: 'app-blog-posts-filters',
    templateUrl: 'blog-posts-filters.component.html',
    styleUrls: ['blog-posts-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FiltersService]
})
export class BlogPostsFiltersComponent {

}
