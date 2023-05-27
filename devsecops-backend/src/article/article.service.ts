import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository:Repository<Article> ,
  ) {}

  async createArticle(article: CreateArticleDto) {
    const newAricle= new Article();
    
    const {title , author , text} = article
    newAricle.title = title;
    newAricle.author = author ;
    newAricle.text = text ;

    return await this.articleRepository.save(newAricle);

  }

  async findAllarticles() {
    return await this.articleRepository.find() ;
  }

  async findOnearticle(id: number): Promise<Article> {
    return await this.articleRepository.findOne({where: {id}});
  }


}
