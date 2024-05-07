<?php

namespace App\Controller;

use App\Repository\MovieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MoviesController extends AbstractController
{
    public function __construct(
        private MovieRepository $movieRepository,
        private SerializerInterface $serializer
    ) {
    }

    #[Route('/movies', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $orderBy = $request->query->get('order_by', null); // ordine order by null if order parameter is not provided
        $validOrders = ['id', 'releaseDate', 'rating']; // Assuming these are some of the fields you can order by

        $orderType = $request->query->get('order', 'DESC'); // ordine order by DESC if order parameter is not provided
        $validOrder = ['ASC', 'DESC',]; // Assuming these are some of the fields you can order by

        if (!in_array($orderType, $validOrder)) {
            $orderType = 'DESC';
        }
        if (!in_array($orderBy, $validOrders)) {
            $movies = $this->movieRepository->findAll();
        } else {
            $movies = $this->movieRepository->findByOrder($orderBy, $orderType);
        }

        $data = $this->serializer->serialize($movies, "json", ["groups" => "default"]);

        return new JsonResponse($data, json: true);
    }

}
