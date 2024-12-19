<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\WaterIntakeRepository;

#[ORM\Entity(repositoryClass: WaterIntakeRepository::class)]
#[ORM\Table(name: "water_intakes")]
class WaterIntake
{
    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $user;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private $id;

    #[ORM\Column(type: "date")]  // Use 'date' type to store just the date
    private $date;

    #[ORM\Column(type: "time")]  // Use 'time' type to store just the time
    private $time;

    #[ORM\Column(type: "integer")]
    private $amount;

    // Getters and Setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;
        return $this;
    }

    public function getTime(): ?\DateTimeInterface
    {
        return $this->time;
    }

    public function setTime(\DateTimeInterface $time): self
    {
        $this->time = $time;
        return $this;
    }

    public function getAmount(): int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }
}