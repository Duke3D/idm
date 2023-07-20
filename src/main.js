import './styles.css'
import App from './App.svelte'
import { updateTitle } from './util/window'

updateTitle()

const app = new App({
  target: document.getElementById('app')
})

export default app
