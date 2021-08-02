package com.skilldistillery.emet.services;

import java.util.List;

import com.skilldistillery.emet.entities.Concert;

public interface ConcertService {

	List<Concert> findAll();
	
	Concert find(int concertId);
	
	Concert create(Concert concert);
	
	Concert update(int concertId, Concert concert);
	
	boolean delete(int concertId);
}
