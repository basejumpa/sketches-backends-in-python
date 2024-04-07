from fastapi import FastAPI
import os
import sys
import time
import subprocess

# Interface:
# y = m*x + b where
#    m, x, b : parameters provided via command line arguments, in that order,
program = "linear_function.sh"
arguments = ["2", "3", "5"]

this_file_directory_full_path = os.path.dirname(os.path.realpath(__file__))
program_with_path = os.path.join(this_file_directory_full_path, program)
command = [program_with_path] + arguments

app = FastAPI()

@app.get("/")
async def root():
    process = subprocess.Popen(
        command,
        stdout=subprocess.PIPE
    )

    # Do something in parallel
    for _ in range(10):
        print("app is doing something ...", file=sys.stderr)
        time.sleep(0.2)

    print("app is done, waiting for completion of external program.")

    # Wait for the subprocess to finish and capture only stdout
    stdout_data, _ = process.communicate()

    stdout_data = stdout_data.decode('utf-8')

    exit_code = process.returncode

    return {
        "program": program,
        "arguments": arguments,
        "stdout": stdout_data,
        "exit_code": exit_code
    }
