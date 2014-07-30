package co.edu.uniandes.csw.service.user;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.inject.Inject;

import co.edu.uniandes.csw.user.logic.api.IUserLogicService;
import co.edu.uniandes.csw.user.logic.dto.UserDTO;


public abstract class _UserService {

	@Inject
	protected IUserLogicService userLogicService;
	
	@POST
	public UserDTO createUser(UserDTO user){
		return userLogicService.createUser(user);
	}
	
	@DELETE
	@Path("{id}")
	public void deleteUser(@PathParam("id") Long id){
		userLogicService.deleteUser(id);
	}
	
	@GET
	public List<UserDTO> getUsers(){
		return userLogicService.getUsers();
	}
	
	@GET
	@Path("{id}")
	public UserDTO getUser(@PathParam("id") Long id){
		return userLogicService.getUser(id);
	}
	
	@PUT
    @Path("{id}")
	public void updateUser(@PathParam("id") Long id, UserDTO user){
		userLogicService.updateUser(user);
	}
	
}