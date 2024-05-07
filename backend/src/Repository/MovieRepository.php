<?php

namespace App\Repository;

use App\Entity\Movie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Movie>
 *
 * @method Movie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Movie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Movie[]    findAll()
 * @method Movie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MovieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Movie::class);
    }

    //    /**
    //     * @return Movie[] Returns an array of Movie objects
    //     */
    public function findCustom($genres, $orderBy, $orderType)
    {
        $qb = $this->createQueryBuilder('m');
        if ($genres) {
            $this->findByGenre($genres, $qb);
        }
        if ($orderBy) {
            $this->findByOrder($orderBy, $orderType, $qb);
        }
        return $qb->getQuery()->getResult();

    }
    public function findByOrder($orderBy, $orderType, $queryModifier)
    {
        $query = 'm.' . $orderBy;
        $queryModifier->orderBy($query, $orderType);
    }
    public function findByGenre($genres, $queryModifier)
    {
        $genres_arr = preg_split("/\,/", $genres);
        $queryModifier->join('m.movieGenres', 'mg')->where('mg.genre IN (:genres)')->setParameter('genres', $genres_arr);
    }

    //    public function findOneBySomeField($value): ?Movie
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
