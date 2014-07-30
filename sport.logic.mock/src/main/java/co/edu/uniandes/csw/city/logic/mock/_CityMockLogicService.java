
package co.edu.uniandes.csw.city.logic.mock;
import java.util.ArrayList;
import java.util.List;

import co.edu.uniandes.csw.city.logic.dto.CityDTO;
import co.edu.uniandes.csw.city.logic.api._ICityLogicService;

public abstract class _CityMockLogicService implements _ICityLogicService {

	private static Long id= new Long(1);
	protected static List<CityDTO> data=new ArrayList<CityDTO>();

	public CityDTO createCity(CityDTO city){
		id++;
		city.setId(id);
                data.add(city);
		return city;
    }

	public List<CityDTO> getCitys(){
		return data; 
	}

	public CityDTO getCity(Long id){
		for(CityDTO data1:data){
			if(data1.getId().equals(id)){
				return data1;
			}
		}
		return null;
	}

	public void deleteCity(Long id){
	    CityDTO delete=null;
		for(CityDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
		} 
	}

	public void updateCity(CityDTO city){
	    CityDTO delete=null;
		for(CityDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
			data.add(city);
		} 
	}	
}