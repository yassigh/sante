<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoryController extends AbstractController
{
    #[Route('/api/google-login', name: 'api_google_login', methods: ['POST'])]
    public function googleLogin(): Response
    {
        // Logique de traitement pour Google Login
        return new Response('Connexion Google réussie');
    }
    #[Route('/categories', name: 'categories_index', methods: ['GET'])]
public function index(): Response
{
    // Logic to fetch categories
    return $this->render('category/index.html.twig');
}

}
