import {writeTextFile, createDir, exists, readTextFile} from '@tauri-apps/api/fs'
import { appConfigDir } from '@tauri-apps/api/path'

class datas {
    public static contents = {
        directory:"",
        deeplkey:"",
        katexmacros:"{}",
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
    public static async load():Promise<boolean>{
        try{
            let dir = await appConfigDir()
            let text = await readTextFile(`${dir}settings.json`)
            let json:{[key: string]: string} = JSON.parse(text)
            for (let key in json){
                if (key in this.contents) this.contents[key] = json[key]
            }
        }
        catch(e){
            datas.save()
        }
        return true
    }
}

export default datas 