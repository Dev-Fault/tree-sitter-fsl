module.exports = grammar({
    name: 'fsl',

    extras: $ => [
        /\s/,
        $.comment,
    ],

    rules: {
        source_file: $ => repeat(
            choice(
                $.code_block,
                $.plain_text,
            )
        ),

        code_block: $ => seq(
            '{',
            repeat($._statement),
            '}',
        ),

        plain_text: $ => /[^{]+/,

        _statement: $ => choice(
            $.call,
            $.dot_call,
        ),

        comment: $ => choice(
            seq("#", /.*/),
            seq('*', /[^*]*/, '*'),
        ),

        call: $ => prec(1, seq(
            field('command', $.identifier),
            '(',
            optional($.argument_list),
            ')',
        )),

        // Dot-style: a.push(b) — a is first arg, push is command
        dot_call: $ => seq(
            field('object', $.identifier),
            repeat1(seq(
                '.',
                field('command', $.identifier),
                '(',
                optional($.argument_list),
                ')',
            )),
        ),

        argument_list: $ => repeat1(
            choice(
                // Value arguments require a trailing comma (optional on last)
                seq($._value_expression, optional(',')),
                // Command arguments never need a comma
                $._command_expression,
            )
        ),


        _value_expression: $ => choice(
            $.array,
            $.string,
            $.number,
            $.boolean,
            $.identifier,
        ),

        _command_expression: $ => choice(
            $.call,
            $.dot_call,
            $.block,
        ),

        _expression: $ => choice(
            $._command_expression,
            $._value_expression,
        ),

        block: $ => seq(
            '(',
            repeat(seq($._statement, optional(','))),
            ')',
        ),

        array: $ => seq(
            '[',
            optional(seq(
                $._expression,
                repeat(seq(',', $._expression)),
            )),
            ']',
        ),

        boolean: $ => choice('true', 'false'),

        string: $ => seq(
            '"',
            repeat(choice(
                $.escape_sequence,
                /[^"\\]+/,
            )),
            '"',
        ),

        escape_sequence: $ => /\\./,
        number: $ => /[0-9]+(\.[0-9]+)?/,

        identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    },
});