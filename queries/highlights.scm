; path segments
(property (identifier) @property)

; function calls
; (property (expression command_identifier: (identifier) @function.call))
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
((property_segment
  (expression
    command_identifier: (identifier) @keyword))
  (#match? @keyword "^def$"))

; name of the function being defined (the chain head)
((property
  (identifier) @function.definition
  (property_segment (expression
    command_identifier: (identifier) @keyword))
  (#match? @keyword "^def$")))
 
; parameters - identifiers directly in the arg_list of a def
((property_segment
  (expression
    command_identifier: (identifier) @keyword
    (arg_list
      (arg (identifier) @variable.parameter))))
  (#match? @keyword "^def$"))
