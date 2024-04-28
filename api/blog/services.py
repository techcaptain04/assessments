
import nh3
from .models import Article


def get_articles():
    return Article.objects.all()


def get_article(pk):
    try:
        article = Article.objects.get(id=pk)
        article.content = nh3.clean(article.content)
        return article
    except Article.DoesNotExist:
        return None


def create_article(data: Article):
    data.content = nh3.clean(data.content)
    return Article.objects.create(**data)


def update_article(article, data):
    article.title = data.get('title', article.title)
    article.content = data.get('content', article.content)
    article.save()
    return article


def delete_article(article):
    article.delete()
