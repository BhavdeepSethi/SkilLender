import java.util.List;

import edu.columbia.cloud.dao.UserDao;
import edu.columbia.cloud.dao.impl.UserDaoImpl;
import edu.columbia.cloud.models.Skill;
import edu.columbia.cloud.models.User;


public class Test {
public static void main(String[] args) {
	UserDao dao = new UserDaoImpl();
	User user = new User("123", "XYZ");
	user.setEmail("@");
	user.setGender("female");
	
	User user2 = new User("456", "ABC");
	user2.setEmail("@");
	user2.setGender("female");
	
	User user3 = new User("789", "HJK");
	user3.setEmail("@");
	user3.setGender("female");
	
	User user4 = new User("0", "LLL");
	user4.setEmail("@");
	user4.setGender("female");
	
	Skill skill = new Skill();
	skill.setCategory("s");
	skill.setId("s1");
	skill.setName("java");
	
	Skill skill2 = new Skill();
	skill2.setCategory("s");
	skill2.setId("s2");
	skill2.setName("py");
	
	Skill skill3 = new Skill();
	skill3.setCategory("s");
	skill3.setId("s3");
	skill3.setName("scala");
	
	
	user.addConnection(user2);
	user.addConnection(user4);
	
	user2.addConnection(user4);
	
	//user3.addConnection(user4);
	skill.setLevel(10);
	user.addSkillToList(skill);
	skill2.setLevel(5);
	user.addSkillToList(skill2);
	
	
	skill3.setLevel(10);
	user2.addSkillToList(skill3);
	skill2.setLevel(10);
	user2.addSkillToList(skill2);
	
	
	skill3.setLevel(10);
	user4.addSkillToList(skill3);
	skill2.setLevel(5);
	user4.addSkillToList(skill2);
	skill.setLevel(2);
	user4.addSkillToList(skill);
	
	
	
	
	//dao.createUser(user);
	//dao.addSkill(user.getId(), skill3, 10);
	/*List<User> fetchUsersWithSkill = dao.fetchUsersWithSkill("s2");
	for (User user5 : fetchUsersWithSkill) {
		System.out.println(user5.getName());
	}*/
	//dao.removeSkill(user.getId(), skill3.getId());
	//dao.removeUser("0");
	//dao.updateSkill(user.getId(), skill.getId(), 1);
	List<User> fetchUsersWithSkill = dao.fetchUsersWithSkill(skill.getId());
	System.out.println();
	User fetchUser = dao.fetchUser("123");
	System.out.println();
	
}
}