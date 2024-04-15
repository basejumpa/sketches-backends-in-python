""" Entry point when being called via python -m backend """

import os

from dotenv import load_dotenv
load_dotenv()

from concurrent import futures
import grpc
from protocols import some_protocol_pb2
from protocols import some_protocol_pb2_grpc

class SomeService(some_protocol_pb2_grpc.SomeServiceServicer):
    """ Service implementation """

    def some_rpc(self, some_rpc__args, _):
        """ The Remote Procedure (the RP of the RPC) """

        print(f"SERVER RECV: Client --some_rpc({some_rpc__args.some_text})-> Server")

        # Just send back w/on modification
        some_text =  some_rpc__args.some_text

        print(f"SERVER SEND: Client <- return  {some_text} -- Server")

        return some_protocol_pb2.some_rpc__return(some_text=some_text)

def serve():
    """ Creation of gRPC server and adding above service """
    port = os.getenv("PORT")
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    some_protocol_pb2_grpc.add_SomeServiceServicer_to_server(SomeService(), server)
    server.add_insecure_port(f"[::]:{port}")

    try:
        server.start()
        print(f"SERVER: Listening on port {port}")
        server.wait_for_termination()
    except KeyboardInterrupt:  # Handle Ctrl-C for stopping the server gracefully
        pass


if __name__ == "__main__":
    serve()
