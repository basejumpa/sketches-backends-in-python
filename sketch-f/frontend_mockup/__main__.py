""" Entry point when being called via python -m backend.frontend_mockup """

import os

from dotenv import load_dotenv
load_dotenv()

import grpc
from protocols import some_protocol_pb2
from protocols import some_protocol_pb2_grpc

def run():
    """ Make just one rpc to the server """
    port = os.getenv("PORT")
    with grpc.insecure_channel(f"localhost:{port}") as channel:

        stub = some_protocol_pb2_grpc.SomeServiceStub(channel)

        some_text = "some_text"

        print(f"CLIENT SEND: Client --some_rpc({some_text})-> Server")

        some_rpc__args = some_protocol_pb2.some_rpc__args(some_text=some_text)
        some_rpc__return = stub.some_rpc(some_rpc__args)

        print(f"CLIENT RECV: Client <- return  {some_rpc__return.some_text} -- Server")

        return some_rpc__return.some_text      # Make return value available while unit-testing

if __name__ == "__main__":
    print("frontend_mockup")
    run()
