package tree_sitter_fsl_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_fsl "github.com/tree-sitter/tree-sitter-fsl/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_fsl.Language())
	if language == nil {
		t.Errorf("Error loading FSL grammar")
	}
}
