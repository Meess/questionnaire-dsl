import ExpressionVisitor from "./ExpressionVisitor";
import FieldVisitor from "./FieldVisitor";

/**
 * Visitor that visits every child of a form node.
 */
interface NodeVisitor extends ExpressionVisitor, FieldVisitor {

}

export default NodeVisitor;