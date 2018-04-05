# react-localforage-hoc
A higher order function that wraps [React](https://facebook.github.io/react/) components saving their state in persistent https://github.com/localForage/localForage. Similar to [react-localstorage](https://github.com/STRML/react-localstorage) but implemented as a [higher order component](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775)

## Usage

```sh
npm install react-localforage-hoc
```

```js
import persist from 'react-localforage-hoc'

class Counter extends React.Component {
  render() {
    let { counter } = this.state
    return (
      <div onClick={e => this.setState({ counter: counter + 1 })}>
        {'Clicked ' + counter + ' times'}
      </div>
    )
  }
}

export default persist(Counter)
```
