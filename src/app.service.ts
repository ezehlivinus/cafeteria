import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class AppService {
  ping(): string {
    return 'Server is up and running!';
  }

  async getErrorLogs() {
    const logFilePath = path.join(__dirname, '../logs/error.log');

    if (!fs.existsSync(logFilePath)) {
      return [];
    }

    const logFileContent = fs.readFileSync(logFilePath, 'utf-8');
    let logs = logFileContent.split('\n').reverse();

    if (!logs?.length) {
      return [];
    }

    logs = logs.map((log) => {
      if (log?.trim()) {
        return JSON.parse(log);
      }
    });

    logs = logs.filter((error) => ![undefined, null].includes(error));

    return { logs };
  }
}
