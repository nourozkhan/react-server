import React from 'react';
import { connect } from 'react-redux'
import TodoMiddleware from '../middlewares/todo_middlewares';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
// import axios from 'axios';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import Dialog from 'material-ui/Dialog';


function mapDispatchToProps(dispatch) {
  return {
    create: (todo) => dispatch(TodoMiddleware.create(todo)),
    getAllTodos: () => dispatch(TodoMiddleware.getAllTodos()),
    delete: (todo) => dispatch(TodoMiddleware.deleteTodo(todo)),
    edit: (newData) => dispatch(TodoMiddleware.editTodo(newData)),
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}



class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      todo: '',
      id: ''
    };
  }
  componentWillMount() {
    this.props.getAllTodos();
  }

  handleOpen = (todo) => {
    console.log(todo)
    this.setState({ open: true , todo: todo, id: todo._id});
  };

  handleClose = () => {
    this.setState({ open: false });
  };
   edit = () => {
      var editedTodo = this.refs.editTodo.getValue();
       if(editedTodo !== null && editedTodo !== ''){
         let newData = {
           _id: this.state.id,
           todo: editedTodo
         }
      this.props.edit(newData);
      this.setState({ open: false });
       }  
    };


  onSubmit(e) {
    e.preventDefault();
    console.log(this.refs.todo.getValue());
    var todo = this.refs.todo.getValue();
    this.props.create({ todo })
    console.log(this.props.todos);
    this.refs.todo.value = '';
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.edit}
      />,
    ];


    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)} style={{ textAlign: 'center' }}>
          <TextField hintText="Hint Text" ref="todo" />
        </form>
          {this.props.todos.map(todo => {
            return (

              <Card  key={todo._id}>
                <CardHeader
                  title={todo.todo}
                  //subtitle={date}
                  //actAsExpander={false}
                  //showExpandableButton={false}
                />
                <CardActions>
                  <FlatButton label="Edit" primary={true} onTouchTap={() => this.handleOpen(todo)} />
                  <FlatButton label="Delete" secondary={true} onTouchTap={() => this.props.delete(todo)} />
                </CardActions>
              </Card>
           


            )

          })}
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField hintText="Edit" ref="editTodo"/>
        </Dialog>
      </div>
    )
  }
}





export default connect(mapStateToProps, mapDispatchToProps)(Input);
