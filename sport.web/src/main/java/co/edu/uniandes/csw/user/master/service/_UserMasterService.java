package co.edu.uniandes.csw.user.master.service;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.inject.Inject;

import co.edu.uniandes.csw.user.master.logic.api.IUserMasterLogicService;
import co.edu.uniandes.csw.user.master.logic.dto.UserMasterDTO;

public abstract class _UserMasterService {

    @Inject
    protected IUserMasterLogicService userLogicService;

    @POST
    public UserMasterDTO createUser(UserMasterDTO user) {
        return userLogicService.createMasterUser(user);
    }

    @DELETE
    @Path("{id}")
    public void deleteUser(@PathParam("id") Long id) {
        userLogicService.deleteMasterUser(id);
    }
    
    @GET
    @Path("{id}")
    public UserMasterDTO getUser(@PathParam("id") Long id) {
        return userLogicService.getMasterUser(id);
    }

    @PUT
    @Path("{id}")
    public void updateUser(@PathParam("id") Long id, UserMasterDTO user) {
        userLogicService.updateMasterUser(user);
    }

}
