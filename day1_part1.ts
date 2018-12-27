import { readFile, args, exit } from "deno";
import { parse } from "https://deno.land/x/flags/index.ts";
import {
  assertEqual,
  test as testRun
} from "https://deno.land/x/testing/testing.ts";

function sum(arr: Array<number>): number {
  return arr.reduce((x: number, y: number) => x + y, 0);
}

async function readInputFile(name): Promise<string> {
  const decoder = new TextDecoder("utf-8");
  const data = await readFile(inputFile);
  return decoder.decode(data);
}

function parseInputText(inputText: string): Array<number> {
  return inputText
    .split("\n")
    .map(x => parseInt(x))
    .filter(x => x);
}

const { test, inputFile } = parse(args, {
  alias: { inputFile: ["i", "input"], test: ["t"] }
});

if (test) {
  testRun(function sumTest() {
    assertEqual(sum([1, 2, 3]), 6);
    assertEqual(sum([1, 2, -3]), 0);
  });
  testRun(function parseTest() {
    assertEqual(parseInputText("-1\n-2\n+3\n"), [-1, -2, 3]);
  });
} else if (inputFile) {
  (async () => {
    const inputText = await readInputFile(inputFile);

    const result = parseInputText(inputText);

    console.log(sum(result));
  })();
} else {
  console.error("No input file");
  exit(1);
}
