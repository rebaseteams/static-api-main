// TO check if file/folder exists or not, if not create file/folder.
import * as fs from 'fs';

function fileCheck(fspath: string, file : boolean = true) {
  if (file) {
    if (!fs.existsSync(fspath)) fs.appendFileSync(fspath, ''); // Create file if not exists
  } else if (!fs.existsSync(fspath)) fs.mkdirSync(fspath); // Create folder if not exists
}

export default fileCheck;
