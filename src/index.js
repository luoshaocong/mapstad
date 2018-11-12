import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Table from './components/table';
const APIAnalytics ='http://interview.mapsted.com/RnD/test-analytics.json';
const APIBuilding= 'http://interview.mapsted.com/RnD/test-buildings.json';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data1:[],
      data2:[],
      error:null,
      isLoading:false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });


    fetch(APIAnalytics)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ data1: data, isLoading: false}))
      .catch(error => this.setState({ error, isLoading: false }));


      fetch(APIBuilding)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(data => this.setState({ data2: data,isLoading: false}))
        .catch(error => this.setState({ error,isLoading: false}));
      ;
  }

  render() {
    const {data1,data2, error,isLoading} = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
      <Table
        data1={this.state.data1}
        data2={this.state.data2} />
      </div>
    );
  }

}
ReactDOM.render(<App />, document.querySelector('.container'));
