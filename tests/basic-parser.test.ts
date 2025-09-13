import { CSVValidationError, parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

export const PersonRowSchema = z
  .tuple([z.string(), z.coerce.number()])
  .transform((tup) => ({ name: tup[0], age: tup[1] }));

export type Person = z.infer<typeof PersonRowSchema>;

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV ignores headers", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);
  const [, ...rows] = results;

  expect(results).toHaveLength(4);
  expect(results[0]).toEqual(["Alice", "23"]);
  expect(results[1]).toEqual(["Bob", "thirty"]);
  expect(results[2]).toEqual(["Charlie", "25"]);
  expect(results[3]).toEqual(["Nim", "22"]);
});

test("parseCSV should parse into a string[][] record", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH) as string[][];
  
  expect(Array.isArray(results)).toBe(true);
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
    for (const element of row) {
      expect(typeof element).toBe("number");
    }
  }
});

test("parseCSV does not parse lexical representations of numbers", async () => {
  await expect(parseCSV(PEOPLE_CSV_PATH, PersonRowSchema)).rejects.toBeInstanceOf(
    CSVValidationError
  );
});

test("parseCSV ensures the name field only contains first names", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH) as string[][];

  const firstNameRegex = /^[A-Za-z]+$/;
  
  for (const person of results) {
    expect(person[0]).toMatch(firstNameRegex)
  }
});

