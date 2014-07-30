
package co.edu.uniandes.csw.city.logic.mock;
import javax.enterprise.inject.Alternative;
import javax.inject.Singleton;

import co.edu.uniandes.csw.city.logic.api.ICityLogicService;
import javax.enterprise.inject.Default;

@Default
@Singleton
public class CityMockLogicService extends _CityMockLogicService implements ICityLogicService {
	
}