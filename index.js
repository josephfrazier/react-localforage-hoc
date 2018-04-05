

/*
    A higher order function that wraps a component with functionality
    that save's it's state to local storage. This means the components state
    will persist across page refreshes under the same domain and rules of https://github.com/localForage/localForage.

*/


const localforage = require('localforage')


/*
    Check if localStorage is available on the system
*/

let hasLocalStorage = require('global').localStorage

if (hasLocalStorage) {
    let testKey = 'react-localstorage.hoc.test-key';
    try {
        // Access to global `localStorage` property must be guarded as it
        // fails under iOS private session mode.
        localStorage.setItem( testKey, 'foo' )
        localStorage.removeItem(testKey)
    } catch (e) {
        hasLocalStorage = false;
    }
}


/*
    A HOC function that accepts a component and wraps it in another Component
    that saves it's state to local storage
*/

let WrapWithLocalStorate = Component => {

    // Return Component if no localStorage is available
    if( !hasLocalStorage ) return Component

    let name = Component.displayName || Component.constructor.displayName || Component.constructor.name

    class LocalForageComponent extends Component {

        componentWillMount(){
            localforage.getItem(name).then(state => this.setState(state))
        }

        componentWillUpdate( nextProps, nextState ){
            localforage.setItem( name, nextState )
        }

    }

    LocalForageComponent.displayName = name

    return LocalForageComponent

}


export default  WrapWithLocalStorate
