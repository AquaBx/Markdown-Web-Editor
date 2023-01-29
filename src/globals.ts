import {writeTextFile, createDir, exists, readTextFile} from '@tauri-apps/api/fs'
import { appConfigDir } from '@tauri-apps/api/path'

class datas {
    public static contents = {
        directory:"",
        deeplkey:""
    }

    public static async save() {
        let dir = await appConfigDir()
        if ( ! await exists(dir) ) {
            createDir(dir)
        }
        await writeTextFile(`${dir}/settings.json`, JSON.stringify(datas.contents));

        if ( ! await exists(datas.contents["directory"])){
            createDir(datas.contents["directory"])
        }
    } 
}



(async function() {
    try{
        let dir = await appConfigDir()
        let text = await readTextFile(`${dir}settings.json`)
        console.log(text)
        datas.contents = JSON.parse(text)
    }
    catch(e){
        datas.save()
    }
})()

export default datas 