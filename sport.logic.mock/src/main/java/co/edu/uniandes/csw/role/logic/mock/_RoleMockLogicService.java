
package co.edu.uniandes.csw.role.logic.mock;
import java.util.ArrayList;
import java.util.List;

import co.edu.uniandes.csw.role.logic.dto.RoleDTO;
import co.edu.uniandes.csw.role.logic.api._IRoleLogicService;

public abstract class _RoleMockLogicService implements _IRoleLogicService {

	private static Long id= new Long(1);
	protected static List<RoleDTO> data=new ArrayList<RoleDTO>();

	public RoleDTO createRole(RoleDTO role){
		id++;
		role.setId(id);
                data.add(role);
		return role;
    }

	public List<RoleDTO> getRoles(){
		return data; 
	}

	public RoleDTO getRole(Long id){
		for(RoleDTO data1:data){
			if(data1.getId().equals(id)){
				return data1;
			}
		}
		return null;
	}

	public void deleteRole(Long id){
	    RoleDTO delete=null;
		for(RoleDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
		} 
	}

	public void updateRole(RoleDTO role){
	    RoleDTO delete=null;
		for(RoleDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
			data.add(role);
		} 
	}	
}