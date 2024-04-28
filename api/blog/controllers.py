from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleSerializer
from . import services


class BlogController(APIView):
    serializer_class = ArticleSerializer

    def get(self, request, pk=None):
        if pk:
            article = services.get_article(pk)

            if article is None:
                return Response(
                    {'message': 'Article not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            serializer = self.serializer_class(article)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        articles = services.get_articles()
        serializer = self.serializer_class(articles, many=True)
        return Response(
            {'data': serializer.data},
            status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=400)

    def put(self, request, pk):
        article = services.get_article(pk)
        if article is None:
            return Response(
                {'message': 'Article not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.serializer_class(article, data=request.data)
        if serializer.is_valid():
            services.update_article(article, request.data)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        article = services.get_article(pk)
        if article is None:
            return Response(
                {'message': 'Article not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        services.delete_article(article)
        return Response(
            {
                'message': 'Article deleted',
                'data': {'id': str(pk)}
            },
            status=status.HTTP_204_NO_CONTENT)
