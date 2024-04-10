# Sketch sketch-e

Communicate with frontend via REST, front- and backend use json, backend uses pydantic dataclasses to define protocol.

## Establish prerequisites

```bash
pip install pipx
pipx ensurepath
pipx install poetry
```

## Run

In the Terminal, do

``` bash
cd sketch-e
poetry update
```

and then

```bash
poetry run uvicorn sketch_e.backend.main:app --reload
```

## Investigate

### Experience the Functionality

- Open http://127.0.0.1:8000 in browser and have a look
- Open http://127.0.0.1:8000/docs and play with the UI
- Open http://127.0.0.1:8000/redoc and play with the UI

### Work through the Implementation

The response is defined

- with python language
- as structured data
- including types

FastAPI, with the help of pydentic, does 

- type checking at runtime and then 
- transforms the response from the dataclass into json format before it 
- sends it over HTTP to the frontend.

json representation of the response:

``` python
response =
{
    "stdin" "some input data as bytes",
    "result":
        {
            "args":
            [
                "/workspaces/experiments-backends-in-python/sketch-e/sketch_e/backend/some_program.sh",
                "arg1",
                "--arg2=value2"
            ],
            "returncode":42,
            "stdout":"/workspaces/experiments-backends-in-python/sketch-e/sketch_e/backend/some_program.sh\narg1 --arg2=value2\nReading from stdin because a pipe exists:\nstdout\n",
            "stderr":"stderr\nThe time is: Wed Apr 10 04:24:42 UTC 2024\n"
}
```

Specifying the `response_model` in the route-decorator of the handler-function causes that the datamodel is reflected in the OpenAPI (the routes `*/docs` and `*/redoc`).

Remove the argument `response_model` and play with the example. You'll see it still works, would also detects type errors issueing exceptions production ready code would catch and handle gracefully. But the datatypes are not reflected in the OpenAPI interface.

### References

- FastAPI User Guide on using Dataclasses: https://fastapi.tiangolo.com/uk/advanced/dataclasses/

### Additional Observations

### By-catches

### Additional Comments
