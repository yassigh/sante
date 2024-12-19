import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent {
  article: any;  // Will hold the article details
  articleId: number = 0;

  constructor(private route: ActivatedRoute,private router: Router, private articleService: ArticleService) {}


  ngOnInit(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id')!;  // Get the article ID from the URL
    this.fetchArticleDetail();
  }

  fetchArticleDetail(): void {
    this.articleService.getArticle(this.articleId).subscribe(
      (data) => {
        this.article = data;  // Assign the article data to article
      },
      (error) => {
        console.error('Error fetching article detail:', error);
      }
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
  
  logout() {
    
    this.router.navigate(['/login']);
    console.log('User logged out');
  }
}
