import { useState } from 'react';

const FunctionalInput = ({ name }) => {
  const [todos, setTodos] = useState(['Just some demo tasks', 'As an example']);
  const [inputVal, setInputVal] = useState('');

  const [editIndex, setEditIndex] = useState(null);
  const [editVal, setEditVal] = useState('');

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, inputVal]);
    setInputVal('');
  };

  const handleDelete = (todoToDelete) => {
    setTodos(todos.filter((todo) => todo !== todoToDelete));
  };

  const handleEditStart = (index, todo) => {
    setEditIndex(index);
    setEditVal(todo);
  };

  const handleEditSave = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editVal;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditVal('');
  };

  return (
    <section>
      <h3>{name}</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editVal}
                  onChange={(e) => setEditVal(e.target.value)}
                />
                <button type="button" onClick={() => handleEditSave(index)}>
                  Resubmit
                </button>
              </>
            ) : (
              <>
                {todo}
                <button type="button" onClick={() => handleEditStart(index, todo)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(todo)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;