import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';

class Pages extends React.Component {

  state = {
    activePageIndex: 0
  };

  _nextPage = () => {
    this.setState(({activePageIndex})=>({ activePageIndex: activePageIndex+1 }));
  }

  _prevPage = () => {
    this.setState(({activePageIndex})=>({ activePageIndex: activePageIndex-1 }));
  }

  render() {
    const { activePageIndex } = this.state;
    const { onSubmit } = this.props;
    const children = React.Children.toArray(this.props.children);
    
    return children.map((child,i)=> {
          switch(child.type.name){
            case "Page":
              return React.cloneElement(child, { isActive: activePageIndex === i });
            break;
            case "Previous":
              return React.cloneElement(child, { onClick: this._prevPage, isEnabled: activePageIndex > 0 });
            break;
            case "Submit":
              return React.cloneElement(child, { onClick: onSubmit });
            break;
            case "Next":
              return React.cloneElement(child, { onClick: this._nextPage, isEnabled: activePageIndex < children.length });
            break;
          }
      })
  }
};

const Page = ({ isActive, children }) => isActive ? children : null;

const Next = ({ isEnabled, onClick }) => isEnabled ? (
  <button className={ styles.arrow } onClick={ onClick }>
    →
  </button>
) : null;

const Previous = ({ isEnabled, onClick }) => isEnabled ? (
  <button className={ styles.arrow } onClick={ onClick }>
    ←
  </button>
) : null;

const Submit = ({ onClick }) => (
  <button onClick={ onClick }>
    ↑
  </button>
);

class Form extends React.Component {

  state = {
    name: "",
    age: 0,
    color: "#ffffff"
  }

  _onChange = ({ target }) => this.setState({ [target.name]: target.value });

  _onSubmit = () => {
    console.log("Form Submitted");
    console.log("refs: ");
    console.log(this.state);
  }
  
  render() {
    const { name, age, color } = this.state;
    return (
      <Pages onSubmit={ this._onSubmit }>
        <Page>
          <input type="text" onChange={ this._onChange } name="name" value={ name } />
        </Page>
        <Page>
          <input type="number" onChange={ this._onChange } name="age" value={ age } />
        </Page>
        <Page>
          <input type="color" onChange={ this._onChange } name="color" value={ color } />
        </Page>
        <Previous/>
        <Submit/>
        <Next/>
      </Pages>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('app')
);
