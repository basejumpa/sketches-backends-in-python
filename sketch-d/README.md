# Sketch sketch-d

Trigger external program in own process, do something in parallel, then wait for completion and capture output.

## Run

In the Terminal, do

``` bash
cd sketch-d
poetry update
```

and then

```bash
poetry run uvicorn sketch_d.backend.main:app --reload
```

## Investigate

### Experience the Functionality

- Open http://127.0.0.1:8000 in browser. You see to_be_continued

### Work through the Implementation

### References

### Additional Observations

### By-catches

### Additional Comments

It's possible to process the output of an external process before it has ended by using `subprocess.Popen` and reading from the process's `stdout` or `stderr` streams in a non-blocking manner. This method allows you to handle output as it's generated, which can be particularly useful for long-running processes or for processes that generate output incrementally.

Here’s a basic approach using `subprocess.Popen` and reading from `stdout` incrementally:

```python
import subprocess

# Define your command and arguments
command = ["your_command", "arg1", "arg2"]

# Start the subprocess with stdout redirected
process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, bufsize=1, universal_newlines=True)

# Use a loop to read the output line by line as it's being generated
while True:
    output_line = process.stdout.readline()
    if output_line == '' and process.poll() is not None:
        break  # The process has finished, and there's no more output
    if output_line:
        print(f"Process output: {output_line.strip()}")
        # Here you can process each line of output as it comes

# After the loop, you can also handle the rest of the stderr if needed
stderr_output = process.stderr.read()
if stderr_output:
    print(f"Process error output: {stderr_output.strip()}")

# Get the exit code of the subprocess
exit_code = process.returncode
print(f"Exit Code: {exit_code}")

```

Key Aspects of This Approach:

- This example assumes that the subprocess generates its output line by line. The readline() method is used to read each line of output as it's produced.
- The loop continues until readline() returns an empty string (''), which indicates that the process has closed its stdout pipe, and process.poll() is not None, which means the process has finished.
- The text=True parameter (equivalent to universal_newlines=True in Python versions prior to 3.7) is specified so that the output is treated as text (decoded string) instead of bytes, and bufsize=1 sets line-buffered mode which is necessary for readline() to work properly line by line.
- After processing the stdout, you may also want to handle stderr in a similar fashion or after the subprocess completes as shown.

This method is beneficial for real-time processing of output, such as displaying progress, parsing output incrementally, or logging. However, it's essential to handle both `stdout` and `stderr` carefully to avoid deadlocks, especially if the external process writes significant amounts of data to both. For complex cases, consider using threads or the `selectors` module to read from both outputs simultaneously in a non-blocking way.

Using the `selectors` module or threads are advanced techniques for handling subprocess output in real-time, especially useful when you need to process both `stdout` and `stderr` concurrently without causing deadlocks. Below are examples of both approaches.

Using the selectors Module

This method uses non-blocking I/O with `selectors` to read from multiple file objects (in this case, `stdout` and `stderr` of a subprocess) without blocking. This approach is available in Python 3.4 and later.

```python
import subprocess
import selectors
import sys

# Start the subprocess with stdout and stderr redirected
command = ["your_command", "arg1", "arg2"]
process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, bufsize=1, text=True)

# Set up the selector
sel = selectors.DefaultSelector()

# Register stdout and stderr to the selector
sel.register(process.stdout, selectors.EVENT_READ)
sel.register(process.stderr, selectors.EVENT_READ)

while True:
    for key, _ in sel.select():
        data = key.fileobj.readline()
        if not data:
            exit_code = process.poll()
            if exit_code is not None:
                print(f"Process exited with code {exit_code}")
                sys.exit(0)
        elif key.fileobj is process.stdout:
            print(f"STDOUT: {data.strip()}")
        else:
            print(f"STDERR: {data.strip()}")

```

Using Threads

This approach uses Python's threading to handle `stdout` and `stderr` in separate threads, allowing your main program to continue running while also processing output in real-time.

```python
import subprocess
import threading

def handle_stream(stream, display_prefix):
    """Read from stream line by line until it's empty."""
    for line in iter(stream.readline, ''):
        print(f"{display_prefix}: {line.strip()}")

# Start the subprocess with stdout and stderr redirected
command = ["your_command", "arg1", "arg2"]
process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, bufsize=1)

# Start a thread for reading stdout
stdout_thread = threading.Thread(target=handle_stream, args=(process.stdout, "STDOUT"))
stdout_thread.start()

# Start a thread for reading stderr
stderr_thread = threading.Thread(target=handle_stream, args=(process.stderr, "STDERR"))
stderr_thread.start()

# Wait for the threads to finish
stdout_thread.join()
stderr_thread.join()

# Wait for the subprocess to exit and get the exit code
process.wait()
print(f"Process exited with code {process.returncode}")

```

Key Points

- Selectors: This method is efficient and non-blocking, suitable for I/O multiplexing. It's particularly useful when you have to monitor multiple input sources simultaneously. Note that selectors is available only in Python 3.4 and above.
- Threads: This method uses multiple threads to handle I/O operations, allowing for concurrent execution. It's a more straightforward approach for many use cases but involves threading complexities such as synchronization and potential race conditions.

Both methods enable processing the output of a subprocess in real-time, allowing for sophisticated handling of subprocess interactions in Python applications. Choose the one that best fits your application's architecture and complexity.
