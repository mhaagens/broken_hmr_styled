import React from "react";
import styled from "styled-components";

interface Props {
  title?: string;
}

const initialState = {
  counter: 0
};

type State = Readonly<typeof initialState>;

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  private handleDecrement = () => this.setState(decrementCounter);
  private handleIncrement = () => this.setState(incrementCounter);

  render() {
    return (
      <>
        <button onClick={this.handleDecrement}>-</button>
        <span>Counter: {this.state.counter}</span>
        <button onClick={this.handleIncrement}>+</button>
      </>
    );
  }
}

const decrementCounter = (prevState: State) => ({
  counter: prevState.counter - 1
});
const incrementCounter = (prevState: State) => ({
  counter: prevState.counter + 1
});

export default Home;
