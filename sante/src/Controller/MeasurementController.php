<?php
namespace App\Controller;

use App\Entity\Measurement;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use App\Repository\UserRepository;

class MeasurementController extends AbstractController
{
    private JWTTokenManagerInterface $jwtManager;

    // Injection de l'interface JWTTokenManagerInterface
    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    #[Route('/api/measurement/add', name: 'measurement_add', methods: ['POST'])]
    public function add(Request $request, EntityManagerInterface $em, UserRepository $userRepository): Response
    {
        try {
            // Récupérer et valider les données de la requête
            $data = json_decode($request->getContent(), true);

            // Vérifier que les champs nécessaires sont présents
            if (empty($data['weight']) || empty($data['height']) || empty($data['user_id'])) {
                return $this->json(['error' => 'Missing required fields: weight, height or user_id'], Response::HTTP_BAD_REQUEST);
            }

            // Trouver l'utilisateur en fonction de l'ID
            $user = $userRepository->find($data['user_id']);
            if (!$user) {
                return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
            }

            // Créer la mesure et associer l'utilisateur
            $measurement = new Measurement();
            $measurement->setWeight((float)$data['weight']);
            $measurement->setHeight((float)$data['height']);
            $measurement->setUser($user);

            // Sauvegarder la mesure
            $em->persist($measurement);
            $em->flush();

            return $this->json(['message' => 'Measurement saved successfully'], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            return $this->json(['error' => 'Internal server error', 'details' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
