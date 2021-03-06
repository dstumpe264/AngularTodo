package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Todo;
import entities.User;
@Repository
@Transactional
public class TodoDAOImpl implements TodoDAO {
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Todo> index(int uid) {
		String query = "SELECT DISTINCT t FROM Todo t WHERE t.user.id = :uid";
		return em.createQuery(query, Todo.class)
				.setParameter("uid", uid)
				.getResultList();
	}

	@Override
	public Todo show(int uid, int tid) {
		Todo todo = em.find(Todo.class, tid);
		if( todo == null || todo.getUser().getId() != uid) {
			return null;
		}
		return todo;
	}

	@Override
	public Todo create(int uid, String todoJson) {
		ObjectMapper mapper = new ObjectMapper();
		Todo newTodo = null;
		try {
			newTodo = mapper.readValue(todoJson, Todo.class);
			User u = em.find(User.class, uid);
			newTodo.setUser(u);
			em.persist(newTodo);
			em.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return newTodo;
	}

	@Override
	public Todo update(int uid, int tid, String todoJson) {
		ObjectMapper mapper = new ObjectMapper();
		Todo updateTodo = null;
		Todo ogTodo = null;
		try {
			updateTodo = mapper.readValue(todoJson, Todo.class);
			ogTodo = em.find(Todo.class, tid);
			ogTodo.setTask(updateTodo.getTask());
			ogTodo.setCompleted(updateTodo.isCompleted());
			ogTodo.setCompleteDate(updateTodo.getCompleteDate());
			ogTodo.setDueDate(updateTodo.getDueDate());
			ogTodo.setDescription(updateTodo.getDescription());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ogTodo;
	}

	@Override
	public Boolean destroy(int uid, int tid) {
		
		try {
			em.remove(em.find(Todo.class, tid));
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

}
