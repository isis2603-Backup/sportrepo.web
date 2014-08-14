package co.edu.uniandes.csw.service.user.master.test;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author DAVID
 */
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import co.edu.uniandes.csw.address.logic.api.IAddressLogicService;
import co.edu.uniandes.csw.address.logic.dto.AddressDTO;
import co.edu.uniandes.csw.address.logic.mock.AddressMockLogicService;
import co.edu.uniandes.csw.country.logic.api.ICountryLogicService;
import co.edu.uniandes.csw.country.logic.dto.CountryDTO;
import co.edu.uniandes.csw.country.logic.mock.CountryMockLogicService;
import co.edu.uniandes.csw.documenttype.logic.api.IDocumentTypeLogicService;
import co.edu.uniandes.csw.documenttype.logic.dto.DocumentTypeDTO;
import co.edu.uniandes.csw.documenttype.logic.mock.DocumentTypeMockLogicService;
import co.edu.uniandes.csw.role.logic.api.IRoleLogicService;
import co.edu.uniandes.csw.role.logic.dto.RoleDTO;
import co.edu.uniandes.csw.role.logic.mock.RoleMockLogicService;
import co.edu.uniandes.csw.service.address.AddressService;
import co.edu.uniandes.csw.service.config.WebApp;
import co.edu.uniandes.csw.service.country.CountryService;
import co.edu.uniandes.csw.service.documenttype.DocumentTypeService;
import co.edu.uniandes.csw.service.role.RoleService;
import co.edu.uniandes.csw.service.sport.SportService;
import co.edu.uniandes.csw.service.user.UserService;
import co.edu.uniandes.csw.sport.logic.api.ISportLogicService;
import co.edu.uniandes.csw.sport.logic.dto.SportDTO;
import co.edu.uniandes.csw.sport.logic.mock.SportMockLogicService;
import co.edu.uniandes.csw.user.logic.api.IUserLogicService;
import co.edu.uniandes.csw.user.logic.dto.UserDTO;
import co.edu.uniandes.csw.user.logic.mock.UserMockLogicService;
import co.edu.uniandes.csw.user.master.logic.api.IUserMasterLogicService;
import co.edu.uniandes.csw.user.master.logic.dto.UserMasterDTO;
import co.edu.uniandes.csw.user.master.logic.mock.UserMasterLogicService;
import co.edu.uniandes.csw.user.master.service.UserMasterService;


import org.codehaus.jackson.map.ObjectMapper;
import org.glassfish.jersey.client.ClientResponse;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.GenericArchive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.importer.ExplodedImporter;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(Arquillian.class)
public class UserMasterServiceTest {

    @Deployment
    public static WebArchive createDeployment() {
        /*File[] libsDomain = Maven.resolver().loadPomFromFile("pom.xml").resolve("de.ab23.bear:ab23BearDomain").withTransitivity().asFile();
         EnterpriseArchive ear = ShrinkWrap.create(EnterpriseArchive.class, "test.ear").addAsLibraries(libsDomain);
         return ear; */
        WebArchive war = ShrinkWrap.create(WebArchive.class, "prueba.war");
        war.merge(ShrinkWrap.create(WebArchive.class, "prueba.war")
                .addPackage(UserMasterService.class.getPackage())
                .addPackage(ISportLogicService.class.getPackage())
                .addPackage(IAddressLogicService.class.getPackage())
                .addPackage(ICountryLogicService.class.getPackage())
                .addPackage(IDocumentTypeLogicService.class.getPackage())
                .addPackage(IRoleLogicService.class.getPackage())
                .addPackage(ISportLogicService.class.getPackage())
                .addPackage(IUserLogicService.class.getPackage())
                .addPackage(IUserMasterLogicService.class.getPackage())
                .addPackage(AddressMockLogicService.class.getPackage())
                .addPackage(CountryMockLogicService.class.getPackage())
                .addPackage(DocumentTypeMockLogicService.class.getPackage())
                .addPackage(RoleMockLogicService.class.getPackage())
                .addPackage(SportMockLogicService.class.getPackage())
                .addPackage(UserMockLogicService.class.getPackage())
                .addPackage(UserMasterLogicService.class.getPackage())
                .addPackage(AddressDTO.class.getPackage())
                .addPackage(CountryDTO.class.getPackage())
                .addPackage(DocumentTypeDTO.class.getPackage())
                .addPackage(RoleDTO.class.getPackage())
                .addPackage(SportDTO.class.getPackage())
                .addPackage(UserDTO.class.getPackage())
                .addPackage(UserMasterDTO.class.getPackage())
                .addPackage(AddressService.class.getPackage())
                .addPackage(CountryService.class.getPackage())
                .addPackage(DocumentTypeService.class.getPackage())
                .addPackage(RoleService.class.getPackage())
                .addPackage(SportService.class.getPackage())
                .addPackage(UserService.class.getPackage())
                .addPackage(UserMasterService.class.getPackage())
                .addPackage(WebApp.class.getPackage())
                .as(ExplodedImporter.class).importDirectory("src/main/webapp").as(GenericArchive.class));
        return war;
    }

    @Test
    public void createuserTest() {
         
    }

    @Test
    public void updateUserTest() {

    }

    @Test
    public void deleteUserTest() {

    }

    @Test
    public void getUserTest() {

    }

    @Test
    public void getAllUserTest() {

    }
}