import { getQlsParser } from "./parsing_helpers";
import StyleSheetNode from "../form/nodes/StyleSheetNode";
import SetParentsVisitor from "../form/visitors/SetParentsVisitor";
import { QlParserPipeline, QlParserResult } from "../../../parsing/QlParserPipeline";
import TypeCheckVisitor from "../form/visitors/TypeCheckVisitor";
import { VariablesMap } from "../../../form/type_checking/VariableScopeVisitor";
import SourceText from "../../../form/source/SourceText";
import { findUnplacedFields } from "../helpers/unplaced_fields_helper";
import { FormStyleWarning, UnplacedQuestionWarning } from "../form/style_warnings";

export interface QlsParserResult extends QlParserResult {
  styleSheetNode: StyleSheetNode;
}

export class QlsParserPipeline {
  private readonly qlsInput: SourceText;
  private readonly qlInput: SourceText;
  private warnings: FormStyleWarning[] = [];

  constructor(qlInput: SourceText, qlsInput: SourceText) {
    this.qlInput = qlInput;
    this.qlsInput = qlsInput;
  }

  run(): QlsParserResult {
    this.warnings = [];
    const qlParserResult = this.parseQl(this.qlInput);
    const styleSheetNode: StyleSheetNode = this.parseQls(this.qlsInput);

    const variablesMap: VariablesMap = qlParserResult.variables;

    this.checkTypes(styleSheetNode, variablesMap);
    this.setNodeParents(styleSheetNode);
    this.addUnplacedFieldWarnings(styleSheetNode, variablesMap);

    return {
      node: qlParserResult.node,
      variables: qlParserResult.variables,
      styleSheetNode: styleSheetNode,
      warnings: this.warnings.concat(qlParserResult.warnings)
    };
  }

  private setNodeParents(node: StyleSheetNode): void {
    const parentsVisitor: SetParentsVisitor = new SetParentsVisitor();
    node.accept(parentsVisitor);
  }

  private checkTypes(node: StyleSheetNode, qlVariables: VariablesMap): void {
    const typeCheckQlsVisitor: TypeCheckVisitor = new TypeCheckVisitor(qlVariables);
    node.accept(typeCheckQlsVisitor);
  }

  private parseQl(qlInput: SourceText): QlParserResult {
    const qlPipeline = new QlParserPipeline(qlInput);
    return qlPipeline.runFirst();
  }

  private parseQls(qlsInput: SourceText): StyleSheetNode {
    return getQlsParser().parse(qlsInput.toString());
  }

  private addUnplacedFieldWarnings(styleSheetNode: StyleSheetNode, variables: VariablesMap) {
    const unplacedFields: VariablesMap = findUnplacedFields(styleSheetNode, variables);

    unplacedFields.forEach((variable) => {
      this.warnings.push(new UnplacedQuestionWarning(variable));
    });
  }
}