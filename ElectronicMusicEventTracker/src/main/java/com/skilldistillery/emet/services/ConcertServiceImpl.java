package com.skilldistillery.emet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.emet.entities.Concert;
import com.skilldistillery.emet.repositories.ConcertRepository;

@Service
public class ConcertServiceImpl implements ConcertService{

	@Autowired
	private ConcertRepository concertRepo;

	@Override
	public List<Concert> findAll() {
		return concertRepo.findAll();
	}

	@Override
	public Concert find(int concertId) {
		Concert concert = null;
		Optional<Concert> concertOpt = concertRepo.findById(concertId);
		if(concertOpt.isPresent()) {
			concert = concertOpt.get();
		}
		return concert;
	}

	@Override
	public Concert create(Concert concert) {
		return concertRepo.saveAndFlush(concert);
	}

	@Override
	public Concert update(int concertId, Concert concert) {
		Optional<Concert> concertOpt = concertRepo.findById(concertId);
		Concert mConcert = concertOpt.get();
		mConcert.setName(concert.getName());
		mConcert.setVenue(concert.getVenue());
		mConcert.setPerformer(concert.getPerformer());
		mConcert.setGenre(concert.getGenre());
		concertRepo.saveAndFlush(mConcert);
		return mConcert;
	}

	@Override
	public boolean delete(int concertId) {
		boolean deleted = false;
		if(concertRepo.existsById(concertId)) {
			concertRepo.deleteById(concertId);
			deleted = true;
		}
		return deleted;
	}
	
	
}
