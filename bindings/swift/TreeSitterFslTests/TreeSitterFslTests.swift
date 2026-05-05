import XCTest
import SwiftTreeSitter
import TreeSitterFsl

final class TreeSitterFslTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_fsl())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading FSL grammar")
    }
}
