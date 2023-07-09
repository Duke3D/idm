<script>
  import { invoke } from '@tauri-apps/api/tauri'
  import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs'
import { open } from '@tauri-apps/api/dialog'

  let name = ''
  const greetMsg = ''

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // greetMsg = await invoke("greet", { name })
    // Write a text file to the `$APPCONFIG/app.conf` path
    // greetMsg = await writeTextFile('app.conf', 'file contents', { dir: BaseDirectory.AppConfig });

    // Open a selection dialog for image files
    const selected = await open({
      multiple: true,
      filters : [{
        name      : 'Image',
        extensions: ['png', 'jpeg']
      }]
    })
    if (Array.isArray(selected)) {
      // user selected multiple files
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      // user selected a single file
    }
  }
</script>

<div>
  <form class="row" on:submit|preventDefault={greet}>
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <button type="submit">Greet</button>
  </form>
  <p>{greetMsg} +1</p>
</div>

