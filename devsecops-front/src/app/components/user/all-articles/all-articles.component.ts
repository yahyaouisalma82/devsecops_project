import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { articleModel } from '../Models/articleModel';
import { ArticleService } from './article.service'; 
@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit {
  articles:  articleModel[] =[]
  constructor(private router:Router,private articleService: ArticleService ) { }

  ngOnInit(): void {  
    this.articles=this.articleService.getArticles()
    console.log("oo",this.articles);
  }
  readMe(){
    this.router.navigateByUrl('/re');
  }
}
