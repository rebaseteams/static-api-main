// TO check if file/folder exists or not, if not create file/folder.
import * as fs from 'fs';

function fileCheck(path: string, fileName: string) {
  // Create folder if not exists
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  // Create file if not exists
  if (!fs.existsSync(`${path}/${fileName}`)) {
    fs.createWriteStream(`${path}/${fileName}`, { flags: 'wx' });
  }
}

export default fileCheck;
