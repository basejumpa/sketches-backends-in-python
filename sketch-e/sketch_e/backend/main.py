import os
import subprocess
from dataclasses import dataclass
from typing import List
from fastapi import FastAPI

# BEGIN Definition of communication protocol
@dataclass
class Result:
    args: List[str] | None
    returncode: int
    stdout: str | None
    stderr: str | None

@dataclass
class Response:
    stdin: str | None
    result: Result
# END Definition of communication protocol

program = "some_program.sh"
arguments = ["arg1", "--arg2=value2"]
stdin = b"some input data as bytes"

this_file_directory_full_path = os.path.dirname(os.path.realpath(__file__))
program_with_path = os.path.join(this_file_directory_full_path, program)
command = [program_with_path] + arguments

app = FastAPI()

@app.get("/", response_model=Response)
async def root():
    result = subprocess.run(
        command,
        input=stdin,
        text=False, # this corresponds with the "b" of the assignment of variable stdin
        capture_output=True
    )

    response = Response(stdin, result)
    # Using result directly here works only because Python is a duck typing language

    return response

