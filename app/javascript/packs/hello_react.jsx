import React from 'react'
import ReactDOM from 'react-dom'
import { observable, action, computed } from 'mobx';
import { Provider, inject, observer } from 'mobx-react';


class UserStore {
  @observable user = "default";

  constructor() {
    this.user = "first";
  }

  @action setUser(val) {
    this.user = val;
  }
}

const userStore = new UserStore();
const stores = {
  userStore
};

@inject('userStore')
@observer
class Hello extends React.Component {

  change = e => {
    e.preventDefault();
    this.props.userStore.user = "second";
  }
  render() {
    const {user} = this.props.userStore
    return (
      <div>
        hi {user}
        <button onClick={this.change}>faew</button>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider {...stores}><Hello /></Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
