<?php
namespace App\Controller;

use App\Entity\Profile;
use App\Entity\User;
use App\Repository\ProfileRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

#[Route('/api/profile', name: 'profile_')]
class ProfileController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private TokenStorageInterface $tokenStorage;
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(EntityManagerInterface $entityManager, TokenStorageInterface $tokenStorage, JWTTokenManagerInterface $jwtManager)
    {
        $this->entityManager = $entityManager;
        $this->tokenStorage = $tokenStorage;
        $this->jwtManager = $jwtManager;
    }

    private function getUserFromToken(): ?User
    {
        $token = $this->tokenStorage->getToken();
        if (!$token) {
            throw new AccessDeniedException('No token provided');
        }

        $user = $token->getUser();
        return $user instanceof User ? $user : null;
    }

    #[Route('/get', name: 'get', methods: ['GET'])]
    public function getProfile(ProfileRepository $profileRepository): JsonResponse
    {
        try {
            $user = $this->getUserFromToken(); // Récupérer l'utilisateur à partir du token JWT

            if (!$user) {
                return $this->json(['message' => 'User not found'], 404);
            }

            $profile = $profileRepository->findOneBy(['user' => $user]);

            if (!$profile) {
                return $this->json(['message' => 'Profile not found'], 404);
            }

            return $this->json($profile);
        } catch (AccessDeniedException $e) {
            return $this->json(['message' => 'Unauthorized'], 401);
        }
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function createProfile(Request $request): JsonResponse
    {
        try {
            $user = $this->getUserFromToken(); // Récupérer l'utilisateur à partir du token JWT

            if (!$user) {
                return $this->json(['message' => 'User not found'], 404);
            }

            $data = json_decode($request->getContent(), true);
            $profile = new Profile();
            $profile->setUser($user);
            $profile->setAge($data['age'] ?? null);
            $profile->setTaille($data['taille'] ?? null);
            $profile->setSexe($data['sexe'] ?? null);
            $profile->setPoidsInitial($data['poids_initial'] ?? null);
            $profile->setObjectifPoids($data['objectif_poids'] ?? null);
            $profile->setNiveauActivite($data['niveau_activité'] ?? null);
            $profile->setDateInscription(new \DateTime());

            $this->entityManager->persist($profile);
            $this->entityManager->flush();

            return $this->json(['message' => 'Profile created successfully'], 201);
        } catch (AccessDeniedException $e) {
            return $this->json(['message' => 'Unauthorized'], 401);
        }
    }

    #[Route('/update', name: 'update', methods: ['PUT'])]
    public function updateProfile(Request $request, ProfileRepository $profileRepository): JsonResponse
    {
        try {
            $user = $this->getUserFromToken(); // Récupérer l'utilisateur à partir du token JWT

            if (!$user) {
                return $this->json(['message' => 'User not found'], 404);
            }

            $data = json_decode($request->getContent(), true);
            $profile = $profileRepository->findOneBy(['user' => $user]);

            if (!$profile) {
                return $this->json(['message' => 'Profile not found'], 404);
            }

            $profile->setAge($data['age'] ?? $profile->getAge());
            $profile->setTaille($data['taille'] ?? $profile->getTaille());
            $profile->setSexe($data['sexe'] ?? $profile->getSexe());
            $profile->setPoidsInitial($data['poids_initial'] ?? $profile->getPoidsInitial());
            $profile->setObjectifPoids($data['objectif_poids'] ?? $profile->getObjectifPoids());
            $profile->setNiveauActivite($data['niveau_activité'] ?? $profile->getNiveauActivite());

            $this->entityManager->flush();

            return $this->json(['message' => 'Profile updated successfully'], 200);
        } catch (AccessDeniedException $e) {
            return $this->json(['message' => 'Unauthorized'], 401);
        }
    }
}
