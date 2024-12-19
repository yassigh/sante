<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Music;

class MusicFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $sampleMusicData = [
            ['title' => 'Relaxing Ocean Waves', 'genre' => 'sleep', 'artist' => 'Nature Sounds', 'link' => 'https://open.spotify.com/track/3xKlmZ7PzLpnzfx9H7leAi'],
            ['title' => 'Calm Piano', 'genre' => 'relaxation', 'artist' => 'Soothing Melodies', 'link' => 'https://open.spotify.com/track/2WaHj5bxeQHpYXh4yZn7Bv'],
            ['title' => 'Gentle Rain', 'genre' => 'sleep', 'artist' => 'Nature Ambience', 'link' => 'https://open.spotify.com/track/5zYz1hgdj8mAVPbuFNoRLs'],
            ['title' => 'Focus Beats', 'genre' => 'focus', 'artist' => 'Deep Work', 'link' => 'https://open.spotify.com/track/2uP5hfIHgfVfYyaG8y2fPU'],
            ['title' => 'Morning Energy', 'genre' => 'energy', 'artist' => 'Wake Up Tunes', 'link' => 'https://open.spotify.com/track/2hZtfZqaYxtfdkl1IRHXr3']
        ];

        foreach ($sampleMusicData as $data) {
            $music = new Music();
            $music->setTitle($data['title']);
            $music->setGenre($data['genre']);
            $music->setArtist($data['artist']);
            $music->setLink($data['link']);
            $manager->persist($music);
        }

        $manager->flush();
    }
 }

