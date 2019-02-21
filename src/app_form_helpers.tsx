import SourceInputs from "./form/source/SourceInputs";
import FormState from "./form/state/FormState";
import { QlParserPipeline, QlParserResult } from "./parsing/QlParserPipeline";
import { QlsParserPipeline, QlsParserResult } from "./modules/styling/parsing/QlsParserPipeline";
import StatefulForm from "./form/StatefulForm";
import QlForm from "./form/QlForm";
import QlsForm from "./modules/styling/form/QlsForm";
import { FormWarning } from "./form/form_warnings";

export const runParserPipeline = (inputs: SourceInputs): QlParserResult | QlsParserResult => {
  if (inputs.qlsIsFilledAndEnabled()) {
    return (new QlsParserPipeline(inputs.getQlSource(), inputs.getQlsSource())).run();
  }

  return (new QlParserPipeline(inputs.getQlSource())).runFirst();
};

export interface FormParseResult {
  form: StatefulForm;
  warnings: FormWarning[];
}

export const parseForm = (inputs: SourceInputs, existingState: FormState): FormParseResult => {
  const parseResult: QlParserResult | QlsParserResult | any = runParserPipeline(inputs);

  let form: StatefulForm = new QlForm(parseResult.node, existingState);

  if (inputs.qlsIsFilledAndEnabled()) {
    form = new QlsForm(form, parseResult.styleSheetNode);
  }

  return {
    form: form,
    warnings: parseResult.warnings
  };
};