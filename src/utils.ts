// https://gist.github.com/penguinboy/762197
export class Utils{
    public static flatten(obj): any{
        let toReturn = {};

        for (let i in obj) {
            if (!obj.hasOwnProperty(i)) continue;

            if ((typeof obj[i]) == 'object') {
                let flatObject = Utils.flatten(obj[i]);
                for (let x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue;

                    toReturn[i + '.' + x] = flatObject[x];
                }
            } else {
                toReturn[i] = obj[i];
            }
        }
        return toReturn;
    }

    public static flattenToString(obj): string{
        let flat = Utils.flatten(obj);
        let values =  Object.keys(flat).map(key =>{
            return `${key}: ${flat[key]}`
        });
        return values.join(', ');
    }

    // https://stackoverflow.com/a/45322101
    public static getObjectByKey(obj, key){
        if(key.indexOf('.') !== 1){
            return key.split('.').reduce(function(prev, curr) {
                return prev ? prev[curr] : null
            }, obj)
        }else{
            return obj[key];
        }
    }

    public static stringRandom(chars: number): string{
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i = 0; i < chars; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}