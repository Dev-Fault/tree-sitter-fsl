; Code block delimiters
("{" @punctuation.bracket)
("}" @punctuation.bracket)

; Comments
(comment) @comment

; Standalone calls - command name
(call
  command: (identifier) @function.builtin)

; Dot-style calls - command name after the dot
(dot_call
  command: (identifier) @function.builtin)

; The object before the dot is a variable
(dot_call
  object: (identifier) @variable)

; Strings
(string) @string

; escape sequences
(escape_sequence) @constant.character.escape

; Numbers  
(number) @constant.numeric

; Booleans
(boolean) @constant.builtin

; Punctuation
("[" @punctuation.bracket)
("]" @punctuation.bracket)
("(" @punctuation.bracket)
(")" @punctuation.bracket)
("," @punctuation.delimiter)
