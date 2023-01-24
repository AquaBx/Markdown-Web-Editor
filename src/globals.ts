import {readTextFile, BaseDirectory, writeTextFile} from '@tauri-apps/api/fs'

class datas {
    public static contents = {
        directory:""
    }
}


(async function() {
    try{
        datas.contents = JSON.parse(await readTextFile('settings.json', { dir: BaseDirectory.Resource }))
    }
    catch(e){
        await writeTextFile('settings.json', JSON.stringify(datas.contents), { dir: BaseDirectory.Resource });
    }
})()

export default datas 