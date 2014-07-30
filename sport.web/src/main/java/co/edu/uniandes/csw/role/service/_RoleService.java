package co.edu.uniandes.csw.role.service;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.inject.Inject;

import co.edu.uniandes.csw.role.logic.api.IRoleLogicService;
import co.edu.uniandes.csw.role.logic.dto.RoleDTO;


public abstract class _RoleService {

	@Inject
	protected IRoleLogicService roleLogicService;
	
	@POST
	public RoleDTO createRole(RoleDTO role){
		return roleLogicService.createRole(role);
	}
	
	@DELETE
	@Path("{id}")
	public void deleteRole(@PathParam("id") Long id){
		roleLogicService.deleteRole(id);
	}
	
	@GET
	public List<RoleDTO> getRoles(){
		return roleLogicService.getRoles();
	}
	
	@GET
	@Path("{id}")
	public RoleDTO getRole(@PathParam("id") Long id){
		return roleLogicService.getRole(id);
	}
	
	@PUT
    @Path("{id}")
	public void updateRole(@PathParam("id") Long id, RoleDTO role){
		roleLogicService.updateRole(role);
	}
	
}