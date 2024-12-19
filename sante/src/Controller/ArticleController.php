<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/api/article')]
class ArticleController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function getAllArticles(ArticleRepository $repository): JsonResponse
    {
        $articles = $repository->findAll();

        $response = array_map(fn(Article $article) => [
            'id' => $article->getId(),
            'title' => $article->getTitle(),
            'content' => $article->getContent(),
            'subject' => $article->getSubject(),
            'image'=> $article->getImage(),
        ], $articles);

        return new JsonResponse($response);
    }





    #[Route('/{id}', methods: ['GET'])]
    public function getArticle(int $id, ArticleRepository $repository): JsonResponse
    {
        $article = $repository->find($id);

        if (!$article) {
            return new JsonResponse(['message' => 'Article not found'], 404);
        }

        return new JsonResponse([
            'id' => $article->getId(),
            'title' => $article->getTitle(),
            'content' => $article->getContent(),
            'subject' => $article->getSubject(),
            'image'=> $article->getImage(),
            
        ]);
    }   
}
