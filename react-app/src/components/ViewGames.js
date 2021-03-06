import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ViewUsers.css';

class ViewGames extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      submitted: false,
      loggedin : localStorage.getItem("username")
    }
  }
  static contextTypes={
    router: PropTypes.object,
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var uname = localStorage.getItem("username");
    const request = new Request('http://127.0.0.1:8080/games/'+uname);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
      {this.state.loggedin!=null &&
      <div>
        <header className="App-header">
          <h1 className="App-title">All Scores</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quiz Id</th>
              <th>Quiz Name</th>
              <th>Quiz Genre</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key)=> {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.quizid}</td>
                      <td>{item.quizname}</td>
                      <td>{item.quizgenre}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       </div>
      }
      { this.state.loggedin==null &&
      <div>
        <h1>You must be logged in!</h1>
      </div>
      }
      </div>
    );
  }
}

export default ViewGames;
