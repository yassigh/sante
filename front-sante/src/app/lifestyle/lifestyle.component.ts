import { MusicService } from '../services/music.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

interface Music {
  id: number;
  title: string;
  artist: string;
  genre: string;
  link: string;
}

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.css']
})
export class LifestyleComponent implements OnInit {
  musicList: Music[] = [];
  articleList: any[] = [];
  selectedGenre: string = '';

  @ViewChild('musicList', { static: false }) musicListElement!: ElementRef;

  constructor(
    private musicService: MusicService,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    // Load initial data
    this.fetchAllMusic();
    this.fetchArticles();
  }

  fetchAllMusic(): void {
    this.musicService.getAllMusic().subscribe(
      (music: Music[]) => {
        this.musicList = music;
      },
      (error) => {
        console.error('Error fetching music:', error);
      }
    );
  }

  fetchArticles(): void {
    this.articleService.getArticles().subscribe(
      (data) => {
        this.articleList = data; // Assign fetched articles to articleList
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }

  fetchMusicByGenre(): void {
    if (this.selectedGenre) {
      this.musicService.getMusicByGenre(this.selectedGenre).subscribe(
        (music: Music[]) => {
          this.musicList = music;
        },
        (error) => {
          console.error('Error fetching music by genre:', error);
        }
      );
    } else {
      // If no genre is selected, fetch all music
      this.fetchAllMusic();
    }
  }

  playMusic(song: Music): void {
    console.log(`Playing: ${song.title} by ${song.artist}`);
    // Optionally open the music link in a new tab
    if (song.link) {
      window.open(song.link, '_blank');
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  logout(): void {
    this.router.navigate(['/login']);
    console.log('User logged out');
  }

  navigateToTest(): void {
    this.router.navigate(['/test']);
  }

  navigateToArticle(article: any): void {
    if (article?.id) {
      this.router.navigate(['/article', article.id]); // Navigate to the article detail page
    } else {
      console.error('Invalid article data:', article);
    }
  }
}
