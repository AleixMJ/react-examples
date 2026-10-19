import { Component } from 'react';

class Count extends Component {
  render() {
    return <p>Total Count: {this.props.todoCount}</p>;
  }
}

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      Count: 2,
      editIndex: null,
      editVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditStart = this.handleEditStart.bind(this);
    this.handleEditSave = this.handleEditSave.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleDelete(task) {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo !== task),
    }));
  }

  handleEditStart(index, todo) {
    this.setState({
      editIndex: index,
      editVal: todo,
    });
  }

  handleEditSave(index) {
    this.setState((state) => {
      const updatedTodos = [...state.todos];
      updatedTodos[index] = state.editVal;
      return {
        todos: updatedTodos,
        editIndex: null,
        editVal: '',
      };
    });
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <Count todoCount={this.state.todos.length} />
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={index}>
              {this.state.editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={this.state.editVal}
                    onChange={(e) => this.setState({ editVal: e.target.value })}
                  />
                  <button type="button" onClick={() => this.handleEditSave(index)}>
                    Resubmit
                  </button>
                </>
              ) : (
                <>
                  {todo}
                  <button type="button" onClick={() => this.handleEditStart(index, todo)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => this.handleDelete(todo)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;