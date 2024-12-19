<?php

namespace App\Controller;
use App\Entity\Music;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;


class MusicController extends AbstractController
{
    #[Route('/api/music', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $musicRepository = $em->getRepository(Music::class);
        $allMusic = $musicRepository->findAll();

        return $this->json($allMusic);
    }

    #[Route('/api/music/genre/{genre}', methods: ['GET'])]
    public function getByGenre($genre, EntityManagerInterface $em): JsonResponse
    {
        $musicRepository = $em->getRepository(Music::class);
        $musicByGenre = $musicRepository->findBy(['genre' => $genre]);

        return $this->json($musicByGenre);
    }
}
