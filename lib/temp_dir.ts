import * as rimraf from "rimraf";
import * as rsvp from "rsvp";
import { readSync, writeSync  } from "./fixturify";
import * as t from "./interfaces";
import ReadableDir from "./readable_dir";

export default class TempDir extends ReadableDir implements t.TempDir {
  constructor(dir: string) {
    super(dir);
  }

  public write(content: t.Tree, to?: string): void {
    writeSync(this.path(to), content);
  }

  public copy(from: string, to?: string): void {
    writeSync(this.path(to), readSync(from));
  }

  public dispose(): rsvp.Promise<void> {
    return new rsvp.Promise<void>((resolve, reject) => {
      rimraf(this.path(), (err) => {
        err ? reject(err) : resolve();
      });
    });
  }
}
