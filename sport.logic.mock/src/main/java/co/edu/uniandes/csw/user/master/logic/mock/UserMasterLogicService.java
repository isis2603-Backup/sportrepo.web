package co.edu.uniandes.csw.user.master.logic.mock;

import co.edu.uniandes.csw.user.master.logic.api.IUserMasterLogicService;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.enterprise.inject.Default;

@Default
@Stateless
@LocalBean
public class UserMasterLogicService extends _UserMasterLogicService implements IUserMasterLogicService {

}