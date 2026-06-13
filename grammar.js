module.exports = grammar({
    name: 'fsl',

    extras: $ => [
        /\s/,
        /\{/,
        /\}/,
    ],

    rules: {

        source_file: $ => repeat(
            choice(
                $.chain_expression,
                $.expression,
                $.comment,
            )
        ),

        comment: $ => token(choice(
            seq("#", /.*/),
            seq('*', /[^*]*/, '*'),
        )),

        expression: $ => prec(10, seq(
            optional(field('command_identifier', $.identifier, )),
            '(',
            optional($.arg_list),
            ')'
        )),

        chain_expression: $ => prec(1, seq(
            $.arg,
            repeat(seq('.', $.identifier)),
            '.',
            $.expression,
        )),

        arg: $ => choice(
            $.expression,
            $.chain_expression,
            $.boolean,
            $.number,
            $.string,
            $.identifier,
            $.list,
            $.map,
            $.comment,
        ),

        arg_list: $ => seq(
            $.arg,
            repeat(
                choice(
                    seq(',', $.arg),
                    // no comma needed if next arg is a command
                    $.expression,
                    $.chain_expression,
                    $.map,
                    $.list,
                    $.comment,
                )
            ),
            optional(','),
        ),

        identifier: $ => token(prec(-1, /[a-zA-Z_][a-zA-Z0-9_]*/)),
        boolean: $ => token(choice('true', 'false')),
        number: $ => /\-?[0-9]+(\.[0-9]+)?/,
        string: $ => seq(
            '"',
            repeat(choice(
                $.escape_sequence,
                /[^"\\]+/,
            )),
            '"',
        ),
        escape_sequence: $ => /\\./,

        list: $ => seq(
            '[',
            optional($.arg_list),
            ']'
        ),

        map: $ => seq(
            '[',
            $.map_entry,
            repeat(seq(',', $.map_entry)),
            optional(','),
            ']',
        ),

        map_entry: $ => seq(
            $.identifier,
            ':',
            $.arg,
        ),
    },
});