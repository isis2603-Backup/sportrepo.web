package co.edu.uniandes.csw.address.service;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.inject.Inject;

import co.edu.uniandes.csw.address.logic.api.IAddressLogicService;
import co.edu.uniandes.csw.address.logic.dto.AddressDTO;


public abstract class _AddressService {

	@Inject
	protected IAddressLogicService addressLogicService;
	
	@POST
	public AddressDTO createAddress(AddressDTO address){
		return addressLogicService.createAddress(address);
	}
	
	@DELETE
	@Path("{id}")
	public void deleteAddress(@PathParam("id") Long id){
		addressLogicService.deleteAddress(id);
	}
	
	@GET
	public List<AddressDTO> getAddresss(){
		return addressLogicService.getAddresss();
	}
	
	@GET
	@Path("{id}")
	public AddressDTO getAddress(@PathParam("id") Long id){
		return addressLogicService.getAddress(id);
	}
	
	@PUT
    @Path("{id}")
	public void updateAddress(@PathParam("id") Long id, AddressDTO address){
		addressLogicService.updateAddress(address);
	}
	
}