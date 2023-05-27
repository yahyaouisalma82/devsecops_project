import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @Post('')
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.createArticle(createArticleDto);
  }
  @Public()
  @Get('articleList')
  findAll() {
    return this.articleService.findAllarticles();
  }
  @Public()
  @Get('article/:id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOnearticle(+id);
  }

}
