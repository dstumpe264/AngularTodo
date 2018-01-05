package data;

import java.util.Set;

import entities.Todo;

public interface UserDAO {
	public Set<Todo> index(int uid);
	
	public Todo show(int uid, int tid);
	
	public Todo create(int uid,String todoJson);
	
	public Todo update(int uid, int tid, String todoJson);
	
	public boolean destroy(int uid, int tid);
}