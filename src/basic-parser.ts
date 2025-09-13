import * as fs from "fs";
import * as readline from "readline";
import { z } from 'zod';

// represents a single row that failed validation
export type RowError = {
  row: number;
  raw: string[];
  issues: z.ZodError["issues"];
};

// error type thrown when validation fails for one or more csv rows
export class CSVValidationError extends Error {
  constructor(public readonly rows: RowError[]) {
    super(`CSV validation failed for ${rows.length} row(s).`);
    this.name = "CSVValidationError";
  }
}

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
export async function parseCSV<T>(path: string, schema?: z.ZodType<T>): Promise<string[][] | T[]> {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });

  const rawRows: string[][] = [];
  
  // Create an empty array to hold the results
  // let result = []
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!
  for await (const line of rl) {
    const values = line.split(",").map((v) => v.trim());
    rawRows.push(values)
  }

  // if schema is undefined, just return original rows
  if (!schema) {
    return rawRows;
  }

  const data: T[] = [];
  const errors: RowError[] = [];

  // parse and transform each row
  rawRows.forEach((row, i) => {
    const res = schema.safeParse(row);
    if (res.success) data.push(res.data);
    else errors.push({ row: i + 1, raw: row, issues: res.error.issues });
  });

  // if errors exist, return the errors
  if (errors.length) {
    throw new CSVValidationError(errors);
  }

  // return parsed & transformed data
  return data;
}