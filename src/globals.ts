import {readTextFile, BaseDirectory, writeTextFile, createDir, exists} from '@tauri-apps/api/fs'

class datas {
    public static contents = {
        directory:"",
        deeplkey:""
    }

    public static async save() {
        await writeTextFile('settings.json', JSON.stringify(datas.contents), { dir: BaseDirectory.AppConfig });
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