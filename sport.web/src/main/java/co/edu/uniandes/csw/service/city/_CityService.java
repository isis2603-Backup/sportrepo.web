package co.edu.uniandes.csw.service.city;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.inject.Inject;

import co.edu.uniandes.csw.city.logic.api.ICityLogicService;
import co.edu.uniandes.csw.city.logic.dto.CityDTO;


public abstract class _CityService {

	@Inject
	protected ICityLogicService cityLogicService;
	
	@POST
	public CityDTO createCity(CityDTO city){
		return cityLogicService.createCity(city);
	}
	
	@DELETE
	@Path("{id}")
	public void deleteCity(@PathParam("id") Long id){
		cityLogicService.deleteCity(id);
	}
	
	@GET
	public List<CityDTO> getCitys(){
		return cityLogicService.getCitys();
	}
	
	@GET
	@Path("{id}")
	public CityDTO getCity(@PathParam("id") Long id){
		return cityLogicService.getCity(id);
	}
	
	@PUT
    @Path("{id}")
	public void updateCity(@PathParam("id") Long id, CityDTO city){
		cityLogicService.updateCity(city);
	}
	
}