import {readTextFile, BaseDirectory, writeTextFile, createDir, exists} from '@tauri-apps/api/fs'
import { appConfigDir } from '@tauri-apps/api/path'

class datas {
    public static contents = {
        directory:"",
        deeplkey:""
    }

    public static async save() {
        let dir = await appConfigDir()
        await writeTextFile(`${dir}/settings.json`, JSON.stringify(datas.contents));
        if ( ! await exists(datas.contents["directory"])){
            createDir(datas.contents["directory"])
        }
    } 
}

(async function() {
    try{
        datas.contents = JSON.parse(await readTextFile('settings.json', { dir: BaseDirectory.Resource }))
    }
    catch(e){
        datas.save()
    }
})()

export default datas 