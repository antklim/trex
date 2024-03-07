import { type Diff } from "../diff/mod.ts";
import { streams } from "deps";

class DepsVersionTransformStream extends TransformStream<string, string> {
  #currentLine = 0;
  #diffs: Diff[] = [];
  #diffIdx = 0;

  constructor(diffs: Diff[]) {
    super({
      transform: (chunk, controller) => {
        ++this.#currentLine;

        if (this.#diffIdx < 0) {
          controller.enqueue(chunk);
          return;
        }

        let c = chunk;
        const diff = this.#diffs[this.#diffIdx];

        if (this.#currentLine === diff.referenceLine) {
          c = chunk.replace(`@${diff.oldVersion}`, `@${diff.newVersion}`);

          if (++this.#diffIdx >= this.#diffs.length) {
            this.#diffIdx = -1;
          }
        }

        controller.enqueue(c);
      },
    });

    this.#diffs = diffs;
  }
}

export interface UpdateFileProps {
  file: string;
  diffs: Diff[];
}

export async function updateFile({ file, diffs }: UpdateFileProps) {
  console.log("\n🦕 Updating dependencies file:", file);

  using fr = await Deno.open(file, { read: true });
  using fw = await Deno.open(file, { write: true });

  await fr.readable
    .pipeThrough(
      new streams.DelimiterStream(new TextEncoder().encode("\n"), {
        disposition: "suffix",
      }),
    )
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new DepsVersionTransformStream(diffs))
    .pipeThrough(new TextEncoderStream())
    .pipeTo(fw.writable);
}
