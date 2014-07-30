package co.edu.uniandes.csw.service.country;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.inject.Inject;

import co.edu.uniandes.csw.country.logic.api.ICountryLogicService;
import co.edu.uniandes.csw.country.logic.dto.CountryDTO;


public abstract class _CountryService {

	@Inject
	protected ICountryLogicService countryLogicService;
	
	@POST
	public CountryDTO createCountry(CountryDTO country){
		return countryLogicService.createCountry(country);
	}
	
	@DELETE
	@Path("{id}")
	public void deleteCountry(@PathParam("id") Long id){
		countryLogicService.deleteCountry(id);
	}
	
	@GET
	public List<CountryDTO> getCountrys(){
		return countryLogicService.getCountrys();
	}
	
	@GET
	@Path("{id}")
	public CountryDTO getCountry(@PathParam("id") Long id){
		return countryLogicService.getCountry(id);
	}
	
	@PUT
    @Path("{id}")
	public void updateCountry(@PathParam("id") Long id, CountryDTO country){
		countryLogicService.updateCountry(country);
	}
	
}