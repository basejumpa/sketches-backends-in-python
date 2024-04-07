from fastapi import FastAPI
import os
import subprocess

program = "some_program.sh"
arguments = ["arg1", "--arg2=value2"]
stdin_data = b"some input data as bytes"

this_file_directory_full_path = os.path.dirname(os.path.realpath(__file__))
program_with_path = os.path.join(this_file_directory_full_path, program)
command = [program_with_path] + arguments

app = FastAPI()

@app.get("/")
async def root():
    process = subprocess.Popen(
        command,
        stdin=subprocess.PIPE
    )

    process.stdin.write(stdin_data)
    process.stdin.close()

    return {
        "program": program,
        "arguments": arguments,
        "stdin": stdin_data
    }
