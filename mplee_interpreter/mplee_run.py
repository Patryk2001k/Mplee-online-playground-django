from mplee_interpreter import interpreter


def interpret_code(code):
    program_output, errors = interpreter.run("example.mplee", code)
    return {"output": program_output, "errors": errors}
