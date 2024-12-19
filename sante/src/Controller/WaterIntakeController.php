<?php
// src/Controller/WaterIntakeController.php
namespace App\Controller;

use App\Entity\User;
use App\Entity\WaterIntake;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

#[Route('/api')]
class WaterIntakeController extends AbstractController
{
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    #[Route('/water-intake', name: 'api_water_intake_add', methods: ['POST'])]
    public function addWaterIntake(
        Request $request,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Check if the request contains valid JSON data
        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON or no data received'], 400);
        }

        // Validate if required fields are present
        if (!isset($data['date'], $data['time'], $data['amount'])) {
            return new JsonResponse(['error' => 'Missing required fields'], 400);
        }

        // Get the user from the JWT token
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'User not authenticated'], 401);
        }

        try {
            // Create a new WaterIntake entity
            $waterIntake = new WaterIntake();
            $waterIntake->setUser($user);

            // Set the date (ensure the date format is valid)
            $date = new \DateTime($data['date']);
            $waterIntake->setDate($date);

            // Set the time (ensure time is in a valid format like "HH:MM")
            $time = new \DateTime($data['time']);
            $waterIntake->setTime($time);

            // Set the amount of water intake
            $waterIntake->setAmount((int)$data['amount']);

            // Persist the new WaterIntake entity
            $entityManager->persist($waterIntake);
            $entityManager->flush();

            return new JsonResponse(['message' => 'Water intake added successfully'], 201);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/stats/{userId}/{date}', name: 'api_water_intake_stats', methods: ['GET'])]
    public function getWaterIntakeStats(
        int $userId,
        string $date,  // Accept date as string (in Y-m-d format)
        EntityManagerInterface $entityManager
    ): JsonResponse {
        // Convert the string date to a DateTime object
        try {
            $specificDate = new \DateTime($date); // Expecting 'Y-m-d' format
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Invalid date format. Use Y-m-d.'], 400);
        }

        // Get the last water intake for the user on the specific date
        $lastWaterIntake = $entityManager->getRepository(WaterIntake::class)
            ->findOneBy(
                [
                    'user' => $userId,
                    'date' => $specificDate // Add the specific date filter here
                ],
            ['time' => 'DESC']
            );

        // If no water intake found for the user on the specific date
        if (!$lastWaterIntake) {
            return new JsonResponse(['error' => 'No water intake found for this user on the specified date'], 404);
        }

        // Get the total amount of water drunk and the total number of times the user drank on the specific date
        $qb = $entityManager->createQueryBuilder();
        $qb->select('SUM(w.amount) as total_amount, COUNT(w.id) as total_times')
           ->from(WaterIntake::class, 'w')
           ->where('w.user = :userId')
           ->andWhere('w.date = :specificDate') // Filter by the specific date
           ->setParameter('userId', $userId)
           ->setParameter('specificDate', $specificDate->format('Y-m-d')); // Ensure the date is in 'Y-m-d' format

        $result = $qb->getQuery()->getSingleResult();

        // Prepare response data
        $response = [
            'last_amount' => $lastWaterIntake->getAmount(),
            'last_date' => $lastWaterIntake->getDate()->format('Y-m-d H:i:s'),
            'total_amount' => $result['total_amount'],
            'total_times' => $result['total_times']
        ];

        return new JsonResponse($response);
    }

    #[Route('/historique/{userId}', name: 'api_water_intake_historique', methods: ['GET'])]
    public function getWaterIntakeHistorique(
        int $userId,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        // Retrieve the user by userId
        $user = $entityManager->getRepository(User::class)->find($userId);
        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        // Retrieve all water intake records for this user, ordered by date and time (most recent first)
        $waterIntakes = $entityManager->getRepository(WaterIntake::class)->findBy(
            ['user' => $user],
            ['date' => 'DESC', 'time' => 'DESC']
        );

        // If no water intake records are found for this user
        if (empty($waterIntakes)) {
            return new JsonResponse(['message' => 'No water intake history found for this user'], 404);
        }

        // Prepare the list of water intake history records
        $historique = [];
        foreach ($waterIntakes as $waterIntake) {
            $historique[] = [
                'date' => $waterIntake->getDate()->format('Y-m-d'),
                'time' => $waterIntake->getTime()->format('H:i'),
                'amount' => $waterIntake->getAmount(),
            ];
        }

        // Return the water intake history as a JSON response
        return new JsonResponse([
            'user_id' => $user->getId(),
            'historique' => $historique
        ]);
    }
}
