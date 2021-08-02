package com.skilldistillery.emet.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.emet.entities.Concert;

public interface ConcertRepository extends JpaRepository<Concert, Integer>{

	Concert findByName(String name);
	
	List<Concert> findByGenre(String genre);
	
	List<Concert> findByVenue(String venue);

	List<Concert> findByPerformer(String performer);
}
