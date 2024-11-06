import { Bytes, Console, httpFetch, OracleProgram, Process } from "@seda-protocol/as-sdk/assembly";


class MyDataRequest extends OracleProgram {
  execution(): void {
    // Call the API swapi.dev and return an HttpResponse object
    const response = httpFetch("https://swapi.dev/api/vehicles/?format=json");

    // Ensure the fetch call has succeeded
    if (!response.ok) {
      Process.error(Bytes.fromUtf8String("Could not fetch API endpoint"));
    }

    Console.log(response.bytes.toUtf8String());

  }

  tally(): void {
    throw new Error("Not implemented");
  }
}

new MyDataRequest().run()





