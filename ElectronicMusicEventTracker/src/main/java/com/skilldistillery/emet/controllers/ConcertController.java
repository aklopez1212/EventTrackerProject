package com.skilldistillery.emet.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.emet.entities.Concert;
import com.skilldistillery.emet.services.ConcertService;

@CrossOrigin({"*", "http://localhost:4201"})
@RequestMapping("api")
@RestController
public class ConcertController {

	@Autowired
	ConcertService concertSvc;

	@GetMapping("concerts")
	public List<Concert> listConcerts() {
		return concertSvc.findAll();
	}

	@GetMapping("concerts/{concertId}")
	public Concert showConcert(
			@PathVariable Integer concertId,
			HttpServletResponse res
	) {
		Concert concert = concertSvc.find(concertId);
		if (concert == null) {
			res.setStatus(404);
		}
		return concert;
	}
	
	@PostMapping("concerts")
	public Concert createConcert(
			@RequestBody Concert concert,
			HttpServletRequest req,
			HttpServletResponse res
	) {
		try {
			concert = concertSvc.create(concert);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(concert.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			res.setStatus(400);
		}
		return concert;
	}
	
	@PutMapping("concerts/{concertId}")
	public Concert updateConcert(
			@PathVariable Integer concertId,
			@RequestBody Concert concert,
			HttpServletResponse res
	) {
		try {
			concert = concertSvc.update(concertId, concert);
			if (concert == null) {
				res.setStatus(404);
			}
			else {
				res.setStatus(200);
			}
		} catch (Exception e) {
			res.setStatus(400);
			concert = null;
		}
		return concert;
	}
	
	@DeleteMapping("concerts/{concertId}")
	public void deleteConcert(
			@PathVariable Integer concertId,
			HttpServletResponse res
	) {
		try {
			boolean deleted = concertSvc.delete(concertId);
			if (deleted) {
				res.setStatus(204);
			}
			else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
		}
	}


}
