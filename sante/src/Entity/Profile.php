<?php

namespace App\Entity;

use App\Repository\ProfileRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProfileRepository::class)]
class Profile
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: "profile", targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private User $user;

    #[ORM\Column(type: "integer", nullable: true)]
    private ?int $age = null;

    #[ORM\Column(type: "float", nullable: true)]
    private ?float $taille = null;

    #[ORM\Column(type: "string", length: 10, nullable: true)]
    private ?string $sexe = null;

    #[ORM\Column(type: "float", nullable: true)]
    private ?float $poids_initial = null;

    #[ORM\Column(type: "float", nullable: true)]
    private ?float $objectif_poids = null;

    #[ORM\Column(type: "string", length: 50, nullable: true)]
    private ?string $niveau_activité = null;

    #[ORM\Column(type: "datetime")]
    private \DateTimeInterface $date_inscription;

    // Getters and setters...

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(?int $age): self
    {
        $this->age = $age;
        return $this;
    }

    public function getTaille(): ?float
    {
        return $this->taille;
    }

    public function setTaille(?float $taille): self
    {
        $this->taille = $taille;
        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(?string $sexe): self
    {
        $this->sexe = $sexe;
        return $this;
    }

    public function getPoidsInitial(): ?float
    {
        return $this->poids_initial;
    }

    public function setPoidsInitial(?float $poids_initial): self
    {
        $this->poids_initial = $poids_initial;
        return $this;
    }

    public function getObjectifPoids(): ?float
    {
        return $this->objectif_poids;
    }

    public function setObjectifPoids(?float $objectif_poids): self
    {
        $this->objectif_poids = $objectif_poids;
        return $this;
    }

    public function getNiveauActivite(): ?string
    {
        return $this->niveau_activité;
    }

    public function setNiveauActivite(?string $niveau_activité): self
    {
        $this->niveau_activité = $niveau_activité;
        return $this;
    }

    public function getDateInscription(): \DateTimeInterface
    {
        return $this->date_inscription;
    }

    public function setDateInscription(\DateTimeInterface $date_inscription): self
    {
        $this->date_inscription = $date_inscription;
        return $this;
    }
}
