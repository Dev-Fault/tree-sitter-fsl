; path segments
(chain_expression (identifier) @property)

; function calls
(chain_expression command_identifier: (identifier) @function.call)
(expression (identifier) @function.call)

; the head identifier
(arg (identifier) @variable)

; strings
(string) @string

; escape sequences
(escape_sequence) @constant.character.escape

; numbers  
(number) @constant.numeric

; booleans
(boolean) @constant.builtin

; comments
(comment) @comment.builtin

; all caps constant identifiers
((identifier) @constant
  (#match? @constant "^[A-Z][A-Z0-9_]*$"))

; list brackets
(list "[" @punctuation.bracket)
(list "]" @punctuation.bracket)

; map brackets  
(map "[" @punctuation.bracket)
(map "]" @punctuation.bracket)

; map entry colon
(map_entry ":" @punctuation.delimiter)("(" @punctuation.bracket)

(map_entry (identifier) @variable.other.member)

(")" @punctuation.bracket)
("," @punctuation.delimiter)

; the def command identifier
(chain_expression
  command_identifier: (identifier) @keyword
  (#match? @keyword "^def$"))

; name of the function being defined (the chain head)
(chain_expression
  (arg (identifier) @function.definition)
  command_identifier: (identifier) @keyword
  (#match? @keyword "^def$"))

; parameters - identifiers directly in the arg_list of a def
(chain_expression
  command_identifier: (identifier) @keyword
  (#match? @keyword "^def$")
  (arg_list
    (arg (identifier) @variable.parameter)))
