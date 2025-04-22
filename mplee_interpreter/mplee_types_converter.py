from mplee_interpreter.definitions.values import List, Number, String

"""
Mplee types to python types:
List -> list
Number -> int
String -> str
"""


def convert_mplee_types_to_python(mplee_output):
    # print(mplee_input["output"].elements[2].elemnts)
    # print(type(mplee_input["output"].elements[2].elements))
    mplee_input = mplee_output["output"].elements[2]
    if isinstance(mplee_input, List):
        return convert_List_to_list(mplee_input)
    elif isinstance(mplee_input, Number):
        return convert_Number_to_int(mplee_input)
    elif isinstance(mplee_input, String):
        return convert_String_to_str(mplee_input)


def convert_List_to_list(mplee_list: List) -> list:
    python_list = mplee_list.elements
    new_list = list()
    for x in python_list:
        if isinstance(x, List):
            new_list.append(convert_List_to_list(x))
        elif isinstance(x, Number):
            new_list.append(convert_Number_to_int(x))
        elif isinstance(x, String):
            new_list.append(convert_String_to_str(x))
    return new_list


def convert_Number_to_int(mplee_number: Number) -> int:
    return int(mplee_number.value)


def convert_String_to_str(mplee_string: String) -> str:
    return str(mplee_string.value)
