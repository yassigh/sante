<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;




use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
/**
 * @extends ServiceEntityRepository<User>
 */


 class UserRepository extends ServiceEntityRepository
 {
     private UserPasswordHasherInterface $passwordHasher;
 
     public function __construct(ManagerRegistry $registry, UserPasswordHasherInterface $passwordHasher)
     {
         parent::__construct($registry, User::class);
         
     }
 
     // Ajoutez vos méthodes ici...
 }
    //    /**
    //     * @return User[] Returns an array of User objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?User
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }

