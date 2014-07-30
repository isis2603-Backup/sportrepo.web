
package co.edu.uniandes.csw.sport.logic.mock;
import java.util.ArrayList;
import java.util.List;

import co.edu.uniandes.csw.sport.logic.dto.SportDTO;
import co.edu.uniandes.csw.sport.logic.api._ISportLogicService;

public abstract class _SportMockLogicService implements _ISportLogicService {

	private static Long id= new Long(1);
	protected static List<SportDTO> data=new ArrayList<SportDTO>();

	public SportDTO createSport(SportDTO sport){
		id++;
		sport.setId(id);
                data.add(sport);
		return sport;
    }

	public List<SportDTO> getSports(){
		return data; 
	}

	public SportDTO getSport(Long id){
		for(SportDTO data1:data){
			if(data1.getId().equals(id)){
				return data1;
			}
		}
		return null;
	}

	public void deleteSport(Long id){
	    SportDTO delete=null;
		for(SportDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
		} 
	}

	public void updateSport(SportDTO sport){
	    SportDTO delete=null;
		for(SportDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
			data.add(sport);
		} 
	}	
}