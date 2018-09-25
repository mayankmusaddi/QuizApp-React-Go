import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ViewUsers.css';

class PlayQuiz extends Component {
  constructor() {
    super();
    this.state = {
      checka:false,
      checkb:false,
      checkc:false,
      checkd:false,
      data: [],
      index:0,
      score:0,
      formData: {
      vala:0,
      valb:0,
      valc:0,
      vald:0,
      },
      submitted: false,
    }
    this.handleVAChange = this.handleVAChange.bind(this);
    this.handleVBChange = this.handleVBChange.bind(this);
    this.handleVCChange = this.handleVCChange.bind(this);
    this.handleVDChange = this.handleVDChange.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  } 
  static contextTypes={
    router: PropTypes.object,
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var qid = this.props.match.params.id;
    const request = new Request('http://127.0.0.1:8080/question/'+qid);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  submitQuestion(event,question){
    event.preventDefault();
    this.setState({index:this.state.index+1});
    if(this.state.formData.vala == question.vala && this.state.formData.valb == question.valb && this.state.formData.valc == question.valc && this.state.formData.vald == question.vald){
      this.setState({score:this.state.score+1});
      console.log("CORRECT");
    }
    else{ console.log("INCORRECT");}
    this.setState({checka:false,checkb:false,cheackc:false,cheackd:false});
    this.setState({formData: {vala:0,valb:0,valc:0,vald:0}});
  }

  handleVAChange() {
    this.state.formData.vala = (this.state.formData.vala+1)%2;
    this.setState({checka: !this.state.checka });
  }
  handleVBChange() {
    this.state.formData.valb = (this.state.formData.valb+1)%2;
    this.setState({checkb: !this.state.checkb});
  }
  handleVCChange() {
    this.state.formData.valc = (this.state.formData.valc+1)%2;
    this.setState({checkc: !this.state.checkc});
  }
  handleVDChange() {
    this.state.formData.vald = (this.state.formData.vald+1)%2;
    this.setState({checkd: !this.state.checkd});
  }
  
  render() {
    console.log("Test");
    console.log(this.state);
    let question = this.state.data[this.state.index]
    return (
      <div className="App">
      {this.state.length==0 && 
      <div>
        <h1>Quiz Empty! Add questions!</h1>
      </div>
      }
      {this.state.data.length && (this.state.index < this.state.data.length) &&
      <div>
        <header className="App-header">
          <h1 className="App-title">Question {this.state.index+1}</h1>
        </header>
      
        <div>
          {question.type == 1?<h2>Multiple Correct</h2>:<h2>Single Correct</h2>}
          <h1>{question.name}</h1>
          <div>
            <label>{question.opta}</label>
            <input type="checkbox" className="form-control" onClick={this.handleVAChange} checked={this.state.checka}/>
          </div>
          <div>
            <label>{question.optb}</label>
            <input type="checkbox" className="form-control" onClick={this.handleVBChange} checked={this.state.checkb}/>
          </div>
          <div>
            <label>{question.optc}</label>
            <input type="checkbox" className="form-control" onClick={this.handleVCChange} checked={this.state.checkc}/>
          </div>
          <div>
            <label>{question.optd}</label>
            <input type="checkbox" className="form-control" onClick={this.handleVDChange} checked={this.state.checkd}/>
          </div>
        </div>
        <input type="button" value='Submit' onClick={ (e)=>{this.submitQuestion(e,question) } } />
      </div>
      }
      {this.state.index >= this.state.data.length &&
      <div>
        <h1>Quiz Completed</h1>
        <h3>Score is {this.state.score} out of {this.state.data.length}</h3>
      </div>
      }
      </div>
    );
  }
}

export default PlayQuiz;