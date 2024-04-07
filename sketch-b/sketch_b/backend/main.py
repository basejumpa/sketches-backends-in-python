from fastapi import FastAPI
import os
import subprocess

program = "some_program.sh"
arguments = ["arg1", "--arg2=value2"]
stdin = b"some input data as bytes"

this_file_directory_full_path = os.path.dirname(os.path.realpath(__file__))
program_with_path = os.path.join(this_file_directory_full_path, program)
command = [program_with_path] + arguments

app = FastAPI()

@app.get("/")
async def root():
    result = subprocess.run(
        command,
        input=stdin,
        text=False, # this corresponds with the "b" of the assignment of variable stdin
        capture_output=True
    )
    return {
        "stdin": stdin,
        "result": result
    }
