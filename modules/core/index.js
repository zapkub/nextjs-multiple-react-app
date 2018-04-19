import ReactDOM from 'react-dom'
import Main from './components'
import Router from 'next/router'
ReactDOM.hydrate(<Main url={Router} />, document.getElementById('core-root'))
