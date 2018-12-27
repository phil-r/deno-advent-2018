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

function findRepeating(arr: Array<number>): number {
  let done = false;

  let acc = 0;
  let i = 0;
  const seen = new Set([0]);

  while (true) {
    if (i >= arr.length) i = 0;
    const currentValue = arr[i];
    acc += currentValue;
    if (seen.has(acc)) break;
    seen.add(acc);
    i++;
  }
  return acc;
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
  testRun(function repeatingTest() {
    assertEqual(findRepeating([1, -1]), 0);
    assertEqual(findRepeating([3, 3, 4, -2, -4]), 10);
    assertEqual(findRepeating([-6, 3, 8, 5, -6]), 5);
    assertEqual(findRepeating([7, 7, -2, -7, -4]), 14);
  });
} else if (inputFile) {
  (async () => {
    const inputText = await readInputFile(inputFile);

    const values = parseInputText(inputText);

    console.log(findRepeating(values));
  })();
} else {
  console.error("No input file");
  exit(1);
}
