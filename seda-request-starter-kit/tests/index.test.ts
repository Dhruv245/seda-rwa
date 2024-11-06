import { describe, it } from "bun:test";
import { file } from "bun";
import { testOracleProgramExecution } from "@seda-protocol/dev-tools"

describe("data request execution", () => {
  it("should run MyDataRequest", async () => {
    const wasmBinary = await file("build/debug.wasm").arrayBuffer();

    // Locally executes the Data Request
    const vmResult = await testOracleProgramExecution(
      Buffer.from(wasmBinary),
      // This program doesn't have any inputs
      Buffer.from(""),
    );

    console.log(vmResult.stdout);
  });
});