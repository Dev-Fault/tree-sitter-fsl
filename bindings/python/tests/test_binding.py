from unittest import TestCase

from tree_sitter import Language, Parser
import tree_sitter_fsl


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            Parser(Language(tree_sitter_fsl.language()))
        except Exception:
            self.fail("Error loading FSL grammar")
