import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const Input = styled.input``;

class SuperAwesomeComp extends React.Component {
  state = {
    email: "",
  };
  updateEmail = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  };
  render() {
    return (
      <Container>
        <Input
          type="text"
          placeholder="Gimme your email!"
          onChange={this.updateEmail}
          value={this.state.email}
        />
      </Container>
    );
  }
}
